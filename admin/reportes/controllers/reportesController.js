/**
 * Controlador para el módulo de Reportes
 */

// ==================== REPORTE DE TRANSACCIONES ====================

async function generarReporteTransacciones() {
    try {
        const fechaInicio = document.getElementById('trans-fecha-inicio').value;
        const fechaFin = document.getElementById('trans-fecha-fin').value;
        const tipoTransaccion = document.getElementById('trans-tipo').value;
        
        if (!fechaInicio || !fechaFin) {
            mostrarError('Debe seleccionar fecha de inicio y fin');
            return;
        }
        
        const params = {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin
        };
        
        if (tipoTransaccion) {
            params.tipo_transaccion = tipoTransaccion;
        }
        
        mostrarCargando('Generando reporte...');
        const resultado = await getReporteTransacciones(params);
        ocultarCargando();
        
        // Mostrar resumen
        document.getElementById('trans-resumen').style.display = 'block';
        document.getElementById('trans-total-count').textContent = resultado.resumen.total_transacciones;
        document.getElementById('trans-total-monto').textContent = formatearMoneda(resultado.resumen.monto_total);
        
        const promedio = resultado.resumen.total_transacciones > 0 
            ? resultado.resumen.monto_total / resultado.resumen.total_transacciones 
            : 0;
        document.getElementById('trans-promedio').textContent = formatearMoneda(promedio);
        
        // Mostrar distribución por tipo
        mostrarDistribucionTipos(resultado.resumen.por_tipo);
        
        // Mostrar tabla de transacciones
        mostrarTablaTransacciones(resultado.transacciones);
        
        mostrarExito('Reporte generado exitosamente');
    } catch (error) {
        ocultarCargando();
        console.error('Error al generar reporte:', error);
        mostrarError('Error al generar el reporte de transacciones');
    }
}

function mostrarDistribucionTipos(porTipo) {
    const container = document.getElementById('trans-por-tipo');
    container.innerHTML = '';
    
    for (const [tipo, datos] of Object.entries(porTipo)) {
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col-md-4">
                <strong>${tipo}</strong>
            </div>
            <div class="col-md-4 text-center">
                <span class="badge bg-primary">${datos.cantidad} transacciones</span>
            </div>
            <div class="col-md-4 text-end">
                <strong>${formatearMoneda(datos.monto)}</strong>
            </div>
        `;
        container.appendChild(row);
    }
}

function mostrarTablaTransacciones(transacciones) {
    const tbody = document.getElementById('trans-tabla');
    tbody.innerHTML = '';
    
    transacciones.forEach(trans => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatearFecha(trans.fecha_transaccion)}</td>
            <td>${trans.tipoTransaccion.nombre}</td>
            <td>${trans.cuentaOrigen ? trans.cuentaOrigen.numero_cuenta : 'N/A'}</td>
            <td>${trans.cuentaDestino ? trans.cuentaDestino.numero_cuenta : 'N/A'}</td>
            <td>${trans.descripcion || '-'}</td>
            <td class="text-end"><strong>${formatearMoneda(trans.monto)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== REPORTE DE CLIENTES ====================

async function generarReporteClientes() {
    try {
        const params = {};
        
        const estadoCliente = document.getElementById('cli-estado').value;
        const estadoKyc = document.getElementById('cli-kyc').value;
        const tieneCuentas = document.getElementById('cli-cuentas').value;
        
        if (estadoCliente) params.estado_cliente = estadoCliente;
        if (estadoKyc) params.estado_kyc = estadoKyc;
        if (tieneCuentas) params.tiene_cuentas = tieneCuentas;
        
        mostrarCargando('Generando reporte...');
        const resultado = await getReporteClientes(params);
        ocultarCargando();
        
        // Mostrar resumen
        document.getElementById('cli-resumen').style.display = 'block';
        document.getElementById('cli-total').textContent = resultado.resumen.total_clientes;
        document.getElementById('cli-con-cuentas').textContent = resultado.resumen.con_cuentas;
        document.getElementById('cli-con-prestamos').textContent = resultado.resumen.con_prestamos;
        
        const kycAprobados = resultado.resumen.por_kyc.aprobado || 0;
        document.getElementById('cli-kyc-aprobado').textContent = kycAprobados;
        
        // Mostrar tabla de clientes
        mostrarTablaClientes(resultado.clientes);
        
        mostrarExito('Reporte generado exitosamente');
    } catch (error) {
        ocultarCargando();
        console.error('Error al generar reporte:', error);
        mostrarError('Error al generar el reporte de clientes');
    }
}

function mostrarTablaClientes(clientes) {
    const tbody = document.getElementById('cli-tabla');
    tbody.innerHTML = '';
    
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.dpi}</td>
            <td>${cliente.primer_nombre} ${cliente.primer_apellido}</td>
            <td>${cliente.correo}</td>
            <td><span class="badge bg-${obtenerColorEstado(cliente.estado_cliente)}">${capitalizar(cliente.estado_cliente)}</span></td>
            <td><span class="badge bg-${obtenerColorKYC(cliente.estado_kyc)}">${capitalizar(cliente.estado_kyc)}</span></td>
            <td class="text-center">${cliente.cuentas.length}</td>
            <td class="text-center">${cliente.prestamos.length}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== REPORTE DE PRÉSTAMOS ====================

async function generarReportePrestamos() {
    try {
        const params = {};
        
        const estado = document.getElementById('prest-estado').value;
        const fechaInicio = document.getElementById('prest-fecha-inicio').value;
        const fechaFin = document.getElementById('prest-fecha-fin').value;
        
        if (estado) params.estado = estado;
        if (fechaInicio) params.fecha_inicio = fechaInicio;
        if (fechaFin) params.fecha_fin = fechaFin;
        
        mostrarCargando('Generando reporte...');
        const resultado = await getReportePrestamos(params);
        ocultarCargando();
        
        // Mostrar resumen
        document.getElementById('prest-resumen').style.display = 'block';
        document.getElementById('prest-total').textContent = resultado.resumen.total_prestamos;
        document.getElementById('prest-monto-total').textContent = formatearMoneda(resultado.resumen.monto_total);
        
        const promedio = resultado.resumen.total_prestamos > 0 
            ? resultado.resumen.monto_total / resultado.resumen.total_prestamos 
            : 0;
        document.getElementById('prest-promedio').textContent = formatearMoneda(promedio);
        
        // Mostrar distribución por estado
        mostrarDistribucionEstados(resultado.resumen.por_estado, resultado.resumen.por_tipo);
        
        // Mostrar tabla de préstamos
        mostrarTablaPrestamos(resultado.prestamos);
        
        mostrarExito('Reporte generado exitosamente');
    } catch (error) {
        ocultarCargando();
        console.error('Error al generar reporte:', error);
        mostrarError('Error al generar el reporte de préstamos');
    }
}

function mostrarDistribucionEstados(porEstado, porTipo) {
    const container = document.getElementById('prest-por-estado');
    container.innerHTML = '';
    
    // Por estado
    container.innerHTML += '<h6 class="mb-2">Por Estado</h6>';
    for (const [estado, cantidad] of Object.entries(porEstado)) {
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col-md-6">
                <span class="badge bg-${obtenerColorEstadoPrestamo(estado)}">${capitalizar(estado.replace('_', ' '))}</span>
            </div>
            <div class="col-md-6 text-end">
                <strong>${cantidad} préstamos</strong>
            </div>
        `;
        container.appendChild(row);
    }
    
    // Por tipo
    container.innerHTML += '<h6 class="mt-3 mb-2">Por Tipo</h6>';
    for (const [tipo, datos] of Object.entries(porTipo)) {
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col-md-4">
                <strong>${tipo}</strong>
            </div>
            <div class="col-md-4 text-center">
                <span class="badge bg-primary">${datos.cantidad} préstamos</span>
            </div>
            <div class="col-md-4 text-end">
                <strong>${formatearMoneda(datos.monto)}</strong>
            </div>
        `;
        container.appendChild(row);
    }
}

function mostrarTablaPrestamos(prestamos) {
    const tbody = document.getElementById('prest-tabla');
    tbody.innerHTML = '';
    
    prestamos.forEach(prestamo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prestamo.numero_prestamo}</td>
            <td>${prestamo.cliente.primer_nombre} ${prestamo.cliente.primer_apellido}</td>
            <td>${prestamo.tipoPrestamo.nombre}</td>
            <td class="text-end"><strong>${formatearMoneda(prestamo.monto)}</strong></td>
            <td>${prestamo.plazo_meses} meses</td>
            <td><span class="badge bg-${obtenerColorEstadoPrestamo(prestamo.estado)}">${capitalizar(prestamo.estado.replace('_', ' '))}</span></td>
            <td>${formatearFecha(prestamo.fecha_solicitud)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== REPORTE DE MOROSIDAD ====================

async function generarReporteMorosidad() {
    try {
        mostrarCargando('Generando reporte...');
        const resultado = await getReporteMorosidad();
        ocultarCargando();
        
        // Mostrar resumen
        document.getElementById('mora-resumen').style.display = 'block';
        document.getElementById('mora-total').textContent = resultado.resumen.total_prestamos_mora;
        document.getElementById('mora-monto').textContent = formatearMoneda(resultado.resumen.monto_total_mora);
        
        const promedioDias = resultado.prestamos_en_mora.length > 0
            ? resultado.prestamos_en_mora.reduce((sum, p) => sum + p.dias_mora, 0) / resultado.prestamos_en_mora.length
            : 0;
        document.getElementById('mora-promedio').textContent = Math.round(promedioDias);
        
        // Mostrar distribución por rango
        mostrarDistribucionMora(resultado.resumen.por_rango_dias);
        
        // Mostrar tabla de morosidad
        mostrarTablaMorosidad(resultado.prestamos_en_mora);
        
        mostrarExito('Reporte generado exitosamente');
    } catch (error) {
        ocultarCargando();
        console.error('Error al generar reporte:', error);
        mostrarError('Error al generar el reporte de morosidad');
    }
}

function mostrarDistribucionMora(porRango) {
    const container = document.getElementById('mora-por-rango');
    container.innerHTML = '';
    
    const rangos = [
        { key: '1-30', label: '1-30 días', color: 'warning' },
        { key: '31-60', label: '31-60 días', color: 'orange' },
        { key: '61-90', label: '61-90 días', color: 'danger' },
        { key: 'mas_90', label: 'Más de 90 días', color: 'dark' }
    ];
    
    rangos.forEach(rango => {
        const cantidad = porRango[rango.key] || 0;
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col-md-6">
                <span class="badge bg-${rango.color}">${rango.label}</span>
            </div>
            <div class="col-md-6 text-end">
                <strong>${cantidad} préstamos</strong>
            </div>
        `;
        container.appendChild(row);
    });
}

function mostrarTablaMorosidad(prestamos) {
    const tbody = document.getElementById('mora-tabla');
    tbody.innerHTML = '';
    
    prestamos.forEach(prestamo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prestamo.numero_prestamo}</td>
            <td>${prestamo.cliente.primer_nombre} ${prestamo.cliente.primer_apellido}</td>
            <td>${prestamo.cliente.dpi}</td>
            <td class="text-end text-danger"><strong>${formatearMoneda(prestamo.monto_mora)}</strong></td>
            <td class="text-center"><span class="badge bg-danger">${prestamo.cuotas_vencidas}</span></td>
            <td class="text-center"><span class="badge bg-dark">${prestamo.dias_mora}</span></td>
            <td><span class="badge bg-danger">${capitalizar(prestamo.estado.replace('_', ' '))}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== ESTADO DE CUENTA ====================

async function generarEstadoCuenta() {
    try {
        const idCuenta = document.getElementById('ec-cuenta').value;
        const fechaInicio = document.getElementById('ec-fecha-inicio').value;
        const fechaFin = document.getElementById('ec-fecha-fin').value;
        
        if (!idCuenta) {
            mostrarError('Debe seleccionar una cuenta');
            return;
        }
        
        if (!fechaInicio || !fechaFin) {
            mostrarError('Debe seleccionar fecha de inicio y fin');
            return;
        }
        
        mostrarCargando('Generando estado de cuenta...');
        const resultado = await getEstadoCuenta(idCuenta, fechaInicio, fechaFin);
        ocultarCargando();
        
        // Mostrar información de la cuenta
        document.getElementById('ec-resultado').style.display = 'block';
        document.getElementById('ec-numero').textContent = resultado.cuenta.numero_cuenta;
        document.getElementById('ec-tipo').textContent = resultado.cuenta.tipo;
        document.getElementById('ec-cliente').textContent = resultado.cuenta.cliente;
        document.getElementById('ec-agencia').textContent = resultado.cuenta.agencia;
        
        // Mostrar resumen
        document.getElementById('ec-saldo-inicial').textContent = formatearMoneda(resultado.resumen.saldo_inicial);
        document.getElementById('ec-total-creditos').textContent = formatearMoneda(resultado.resumen.total_creditos);
        document.getElementById('ec-total-debitos').textContent = formatearMoneda(resultado.resumen.total_debitos);
        document.getElementById('ec-saldo-final').textContent = formatearMoneda(resultado.resumen.saldo_final);
        
        // Mostrar movimientos
        mostrarMovimientosCuenta(resultado.movimientos);
        
        mostrarExito('Estado de cuenta generado exitosamente');
    } catch (error) {
        ocultarCargando();
        console.error('Error al generar estado de cuenta:', error);
        mostrarError('Error al generar el estado de cuenta');
    }
}

function mostrarMovimientosCuenta(movimientos) {
    const tbody = document.getElementById('ec-tabla');
    tbody.innerHTML = '';
    
    movimientos.forEach(mov => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatearFecha(mov.fecha)}</td>
            <td>${mov.descripcion}</td>
            <td>${mov.tipo}</td>
            <td>${mov.referencia}</td>
            <td class="text-end text-danger">${mov.debito ? formatearMoneda(mov.debito) : '-'}</td>
            <td class="text-end text-success">${mov.credito ? formatearMoneda(mov.credito) : '-'}</td>
            <td class="text-end"><strong>${formatearMoneda(mov.saldo)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== EXPORTACIÓN ====================

function exportarTransacciones() {
    exportarACSV('reporte-transacciones', 'trans-tabla');
}

function exportarClientes() {
    exportarACSV('reporte-clientes', 'cli-tabla');
}

function exportarPrestamos() {
    exportarACSV('reporte-prestamos', 'prest-tabla');
}

function exportarMorosidad() {
    exportarACSV('reporte-morosidad', 'mora-tabla');
}

function exportarEstadoCuenta() {
    exportarACSV('estado-cuenta', 'ec-tabla');
}

function exportarACSV(nombreArchivo, idTabla) {
    const tabla = document.getElementById(idTabla);
    const rows = tabla.closest('table').querySelectorAll('tr');
    
    let csv = [];
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map(col => {
            let text = col.textContent.trim();
            // Escapar comillas y comas
            text = text.replace(/"/g, '""');
            return `"${text}"`;
        });
        csv.push(rowData.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${nombreArchivo}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarExito('Reporte exportado exitosamente');
}

// ==================== UTILIDADES ====================

function obtenerColorEstado(estado) {
    const colores = {
        'activo': 'success',
        'inactivo': 'secondary',
        'suspendido': 'danger',
        'bloqueado': 'warning'
    };
    return colores[estado] || 'secondary';
}

function obtenerColorKYC(estado) {
    const colores = {
        'pendiente': 'warning',
        'aprobado': 'success',
        'rechazado': 'danger'
    };
    return colores[estado] || 'secondary';
}

function obtenerColorEstadoPrestamo(estado) {
    const colores = {
        'pendiente': 'warning',
        'aprobado': 'info',
        'activo': 'primary',
        'pagado': 'success',
        'rechazado': 'danger',
        'en_mora': 'danger'
    };
    return colores[estado] || 'secondary';
}

function mostrarCargando(mensaje) {
    // Implementar según necesidad
    console.log(mensaje);
}

function ocultarCargando() {
    // Implementar según necesidad
}

function mostrarExito(mensaje) {
    alert(mensaje);
}

function mostrarError(mensaje) {
    alert(mensaje);
}
