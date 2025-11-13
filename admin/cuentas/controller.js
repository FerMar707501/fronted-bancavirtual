let cuentas = [];
let clientes = [];
let tiposCuenta = [];
let agencias = [];

document.addEventListener('DOMContentLoaded', async () => {
    cargarComponentes();
    await cargarDatosIniciales();
    configurarEventos();
});

async function cargarDatosIniciales() {
    try {
        showLoading();
        
        // Cargar clientes activos
        const responseClientes = await getClientes();
        clientes = responseClientes.filter(c => c.estado_cliente === 'activo');
        
        // Cargar tipos de cuenta
        const responseTipos = await getTiposCuenta();
        tiposCuenta = responseTipos;
        
        // Cargar agencias
        const responseAgencias = await getAgencias();
        agencias = responseAgencias.filter(a => a.estado === 'activo');
        
        // Cargar cuentas
        await cargarCuentas();
        
        // Llenar selects
        llenarSelectClientes();
        llenarSelectTiposCuenta();
        llenarSelectAgencias();
        
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('Error al cargar datos iniciales:', error);
        showAlert('Error al cargar datos iniciales', 'danger');
    }
}

async function cargarCuentas() {
    try {
        const busqueda = document.getElementById('busquedaCuenta').value;
        const estado = document.getElementById('filtroEstado').value;
        
        let params = {};
        if (busqueda) params.busqueda = busqueda;
        if (estado) params.estado = estado;
        
        const response = await getCuentas(params);
        cuentas = response;
        
        mostrarCuentas(cuentas);
        actualizarEstadisticas(cuentas);
    } catch (error) {
        console.error('Error al cargar cuentas:', error);
        document.getElementById('tablaCuentas').innerHTML = `
            <tr><td colspan="7" class="text-center text-danger">Error al cargar cuentas</td></tr>
        `;
    }
}

function mostrarCuentas(listaCuentas) {
    const tbody = document.getElementById('tablaCuentas');
    
    if (!listaCuentas || listaCuentas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay cuentas registradas</td></tr>';
        return;
    }
    
    tbody.innerHTML = listaCuentas.map(cuenta => {
        const estadoClass = {
            'activa': 'success',
            'bloqueada': 'warning',
            'cerrada': 'danger'
        }[cuenta.estado] || 'secondary';
        
        const cliente = cuenta.cliente ? 
            `${cuenta.cliente.primer_nombre} ${cuenta.cliente.primer_apellido}` : 
            'N/A';
        
        const tipo = cuenta.tipoCuenta ? cuenta.tipoCuenta.nombre : 'N/A';
        
        return `
            <tr>
                <td><strong>${cuenta.numero_cuenta}</strong></td>
                <td>${cliente}</td>
                <td>${tipo}</td>
                <td class="text-end"><strong>Q ${formatMoney(cuenta.saldo)}</strong></td>
                <td>${formatDate(cuenta.fecha_apertura)}</td>
                <td><span class="badge bg-${estadoClass}">${capitalizar(cuenta.estado)}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="verDetalle(${cuenta.id_cuenta})" 
                            title="Ver detalle">
                        <i class="bi bi-eye"></i>
                    </button>
                    ${cuenta.estado !== 'cerrada' ? `
                        <button class="btn btn-sm btn-warning" 
                                onclick="mostrarModalBloquear(${cuenta.id_cuenta}, '${cuenta.estado}')" 
                                title="${cuenta.estado === 'activa' ? 'Bloquear' : 'Desbloquear'}">
                            <i class="bi bi-${cuenta.estado === 'activa' ? 'lock' : 'unlock'}"></i>
                        </button>
                        ${cuenta.estado === 'activa' ? `
                            <button class="btn btn-sm btn-danger" 
                                    onclick="mostrarModalCerrar(${cuenta.id_cuenta})" 
                                    title="Cerrar cuenta">
                                <i class="bi bi-x-circle"></i>
                            </button>
                        ` : ''}
                    ` : ''}
                </td>
            </tr>
        `;
    }).join('');
}

function actualizarEstadisticas(listaCuentas) {
    const activas = listaCuentas.filter(c => c.estado === 'activa').length;
    const bloqueadas = listaCuentas.filter(c => c.estado === 'bloqueada').length;
    const cerradas = listaCuentas.filter(c => c.estado === 'cerrada').length;
    const saldoTotal = listaCuentas.reduce((sum, c) => sum + parseFloat(c.saldo || 0), 0);
    
    document.getElementById('totalActivas').textContent = activas;
    document.getElementById('totalBloqueadas').textContent = bloqueadas;
    document.getElementById('totalCerradas').textContent = cerradas;
    document.getElementById('saldoTotal').textContent = `Q ${formatMoney(saldoTotal)}`;
}

function llenarSelectClientes() {
    const select = document.getElementById('clienteSelect');
    select.innerHTML = '<option value="">Seleccione un cliente</option>' +
        clientes.map(c => 
            `<option value="${c.id_cliente}">${c.primer_nombre} ${c.primer_apellido} - ${c.dpi}</option>`
        ).join('');
}

function llenarSelectTiposCuenta() {
    const selects = document.querySelectorAll('#tipoCuentaSelect, #filtroTipo');
    selects.forEach(select => {
        const defaultOption = select.id === 'filtroTipo' ? 
            '<option value="">Todos</option>' : 
            '<option value="">Seleccione tipo</option>';
        
        select.innerHTML = defaultOption + tiposCuenta.map(t => 
            `<option value="${t.id_tipo_cuenta}">${t.nombre}</option>`
        ).join('');
    });
}

function llenarSelectAgencias() {
    const select = document.getElementById('agenciaSelect');
    select.innerHTML = '<option value="">Seleccione agencia</option>' +
        agencias.map(a => 
            `<option value="${a.id_agencia}">${a.nombre}</option>`
        ).join('');
}

function configurarEventos() {
    document.getElementById('busquedaCuenta').addEventListener('input', debounce(cargarCuentas, 500));
    document.getElementById('filtroEstado').addEventListener('change', cargarCuentas);
    document.getElementById('filtroTipo').addEventListener('change', cargarCuentas);
}

async function crearCuenta() {
    try {
        const idCliente = document.getElementById('clienteSelect').value;
        const idTipoCuenta = document.getElementById('tipoCuentaSelect').value;
        const idAgencia = document.getElementById('agenciaSelect').value;
        const saldoInicial = document.getElementById('saldoInicial').value || 0;
        
        if (!idCliente || !idTipoCuenta || !idAgencia) {
            showAlert('Complete todos los campos requeridos', 'warning');
            return;
        }
        
        showLoading();
        
        const data = {
            id_cliente: parseInt(idCliente),
            id_tipo_cuenta: parseInt(idTipoCuenta),
            id_agencia: parseInt(idAgencia),
            saldo_inicial: parseFloat(saldoInicial)
        };
        
        await createCuenta(data);
        
        hideLoading();
        showAlert('Cuenta creada exitosamente', 'success');
        
        bootstrap.Modal.getInstance(document.getElementById('modalCrearCuenta')).hide();
        document.getElementById('formCrearCuenta').reset();
        
        await cargarCuentas();
    } catch (error) {
        hideLoading();
        console.error('Error al crear cuenta:', error);
        showAlert(error.message || 'Error al crear cuenta', 'danger');
    }
}

async function verDetalle(idCuenta) {
    try {
        showLoading();
        const cuenta = await getCuentaById(idCuenta);
        hideLoading();
        
        const cliente = cuenta.cliente || {};
        const tipo = cuenta.tipoCuenta || {};
        const agencia = cuenta.agencia || {};
        
        document.getElementById('detalleCuentaBody').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Información de la Cuenta</h6>
                    <table class="table table-sm">
                        <tr>
                            <th>Número de Cuenta:</th>
                            <td><strong>${cuenta.numero_cuenta}</strong></td>
                        </tr>
                        <tr>
                            <th>Tipo:</th>
                            <td>${tipo.nombre || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Saldo Actual:</th>
                            <td class="text-success"><strong>Q ${formatMoney(cuenta.saldo)}</strong></td>
                        </tr>
                        <tr>
                            <th>Fecha Apertura:</th>
                            <td>${formatDate(cuenta.fecha_apertura)}</td>
                        </tr>
                        <tr>
                            <th>Estado:</th>
                            <td><span class="badge bg-${cuenta.estado === 'activa' ? 'success' : cuenta.estado === 'bloqueada' ? 'warning' : 'danger'}">${capitalizar(cuenta.estado)}</span></td>
                        </tr>
                        <tr>
                            <th>Agencia:</th>
                            <td>${agencia.nombre || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6>Información del Cliente</h6>
                    <table class="table table-sm">
                        <tr>
                            <th>Nombre:</th>
                            <td>${cliente.primer_nombre} ${cliente.segundo_nombre || ''} ${cliente.primer_apellido} ${cliente.segundo_apellido || ''}</td>
                        </tr>
                        <tr>
                            <th>DPI:</th>
                            <td>${cliente.dpi || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>${cliente.email || 'N/A'}</td>
                        </tr>
                        ${cliente.telefonos && cliente.telefonos.length > 0 ? `
                            <tr>
                                <th>Teléfono:</th>
                                <td>${cliente.telefonos[0].numero}</td>
                            </tr>
                        ` : ''}
                    </table>
                    ${tipo.tasa_interes > 0 ? `
                        <div class="alert alert-info mt-3">
                            <strong>Tasa de Interés:</strong> ${tipo.tasa_interes}%
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        new bootstrap.Modal(document.getElementById('modalDetalleCuenta')).show();
    } catch (error) {
        hideLoading();
        console.error('Error al cargar detalle:', error);
        showAlert('Error al cargar detalle de cuenta', 'danger');
    }
}

function mostrarModalBloquear(idCuenta, estadoActual) {
    document.getElementById('idCuentaBloquear').value = idCuenta;
    document.getElementById('motivoBloqueo').value = '';
    
    const titulo = estadoActual === 'activa' ? 'Bloquear Cuenta' : 'Desbloquear Cuenta';
    document.getElementById('tituloBloquear').textContent = titulo;
    
    new bootstrap.Modal(document.getElementById('modalBloquear')).show();
}

async function confirmarBloqueo() {
    try {
        const idCuenta = document.getElementById('idCuentaBloquear').value;
        const motivo = document.getElementById('motivoBloqueo').value;
        
        showLoading();
        await bloquearCuenta(idCuenta, { motivo });
        hideLoading();
        
        showAlert('Estado de cuenta actualizado', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modalBloquear')).hide();
        
        await cargarCuentas();
    } catch (error) {
        hideLoading();
        console.error('Error al cambiar estado:', error);
        showAlert('Error al cambiar estado de cuenta', 'danger');
    }
}

function mostrarModalCerrar(idCuenta) {
    document.getElementById('idCuentaCerrar').value = idCuenta;
    document.getElementById('motivoCierre').value = '';
    
    new bootstrap.Modal(document.getElementById('modalCerrar')).show();
}

async function confirmarCierre() {
    try {
        const idCuenta = document.getElementById('idCuentaCerrar').value;
        const motivo = document.getElementById('motivoCierre').value;
        
        if (!motivo.trim()) {
            showAlert('Debe indicar un motivo para cerrar la cuenta', 'warning');
            return;
        }
        
        showLoading();
        await cerrarCuenta(idCuenta, { motivo });
        hideLoading();
        
        showAlert('Cuenta cerrada exitosamente', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modalCerrar')).hide();
        
        await cargarCuentas();
    } catch (error) {
        hideLoading();
        console.error('Error al cerrar cuenta:', error);
        showAlert(error.message || 'Error al cerrar cuenta', 'danger');
    }
}

function limpiarFiltros() {
    document.getElementById('busquedaCuenta').value = '';
    document.getElementById('filtroEstado').value = '';
    document.getElementById('filtroTipo').value = '';
    cargarCuentas();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
