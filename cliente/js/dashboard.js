// Dashboard del Cliente
let cuentaCliente = null;
let usuarioActual = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticación y rol de cliente
    if (!verificarAutenticacion('cliente')) {
        return;
    }

    // Obtener usuario actual
    usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
        window.location.href = '../index.html';
        return;
    }

    // Cargar datos del usuario
    document.getElementById('nombreUsuario').textContent = usuarioActual.nombre_completo || usuarioActual.username;

    // Cargar información de la cuenta
    await cargarCuentaCliente();
    
    // Cargar préstamos
    await cargarPrestamos();
    
    // Cargar últimos movimientos
    await cargarUltimosMovimientos();
});

async function cargarCuentaCliente() {
    try {
        // Obtener las cuentas del cliente
        const response = await apiCall('/cuentas/mis-cuentas', 'GET');

        if (response && response.cuentas && response.cuentas.length > 0) {
            // Tomar la primera cuenta activa
            cuentaCliente = response.cuentas.find(c => c.estado === 'activa') || response.cuentas[0];
            
            // Mostrar información de la cuenta
            document.getElementById('numeroCuenta').textContent = cuentaCliente.numero_cuenta;
            document.getElementById('tipoCuenta').textContent = cuentaCliente.tipo_cuenta?.nombre || 'N/A';
            document.getElementById('saldoDisponible').textContent = formatearMoneda(cuentaCliente.saldo);
            
            const estadoBadge = document.getElementById('estadoCuenta');
            estadoBadge.textContent = capitalizar(cuentaCliente.estado);
            estadoBadge.className = `badge ${cuentaCliente.estado === 'activa' ? 'bg-success' : 'bg-warning'}`;
        } else {
            // Si no hay cuentas, mostrar mensaje pero no bloquear la app
            document.getElementById('numeroCuenta').textContent = 'Sin cuenta asignada';
            document.getElementById('tipoCuenta').textContent = 'N/A';
            document.getElementById('saldoDisponible').textContent = 'Q 0.00';
            const estadoBadge = document.getElementById('estadoCuenta');
            estadoBadge.textContent = 'Sin cuenta';
            estadoBadge.className = 'badge bg-warning';
            mostrarAlerta('No tienes cuentas registradas. Contacta al administrador.', 'warning');
        }
    } catch (error) {
        console.error('Error al cargar cuenta:', error);
        // No mostrar alerta si es un error de red normal, solo en consola
        // mostrarAlerta('Error al cargar la información de la cuenta', 'danger');
    }
}

async function cargarPrestamos() {
    try {
        const response = await apiCall('/prestamos', 'GET');

        if (response && response.prestamos && response.prestamos.length > 0) {
            document.getElementById('seccionPrestamos').style.display = 'block';
            
            const prestamosActivos = response.prestamos.filter(p => p.estado === 'activo');
            
            if (prestamosActivos.length > 0) {
                let html = '<div class="row">';
                
                prestamosActivos.forEach(prestamo => {
                    const porcentajePagado = (prestamo.monto_pagado / prestamo.monto_total) * 100;
                    
                    html += `
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title">Préstamo ${prestamo.codigo_prestamo}</h6>
                                    <p class="mb-1"><strong>Monto Total:</strong> ${formatearMoneda(prestamo.monto_total)}</p>
                                    <p class="mb-1"><strong>Monto Pagado:</strong> ${formatearMoneda(prestamo.monto_pagado)}</p>
                                    <p class="mb-2"><strong>Saldo Pendiente:</strong> ${formatearMoneda(prestamo.monto_total - prestamo.monto_pagado)}</p>
                                    <div class="progress mb-2">
                                        <div class="progress-bar" role="progressbar" style="width: ${porcentajePagado}%" 
                                             aria-valuenow="${porcentajePagado}" aria-valuemin="0" aria-valuemax="100">
                                            ${porcentajePagado.toFixed(1)}%
                                        </div>
                                    </div>
                                    <a href="pagar/index.html?prestamo=${prestamo.id_prestamo}" class="btn btn-sm btn-primary">
                                        <i class="bi bi-credit-card"></i> Realizar Pago
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += '</div>';
                document.getElementById('listaPrestamos').innerHTML = html;
            } else {
                document.getElementById('listaPrestamos').innerHTML = `
                    <div class="alert alert-info mb-0">
                        <i class="bi bi-info-circle"></i> No tienes préstamos activos en este momento.
                    </div>
                `;
            }
        } else {
            document.getElementById('seccionPrestamos').style.display = 'none';
        }
    } catch (error) {
        console.error('Error al cargar préstamos:', error);
        // No mostrar la sección si hay error
        document.getElementById('seccionPrestamos').style.display = 'none';
    }
}

async function cargarUltimosMovimientos() {
    try {
        if (!cuentaCliente) {
            document.getElementById('tablaMovimientos').innerHTML = `
                <tr><td colspan="4" class="text-center">No hay cuenta disponible</td></tr>
            `;
            return;
        }

        const response = await apiCall(`/transacciones/cuenta/${cuentaCliente.id_cuenta}?limite=5`, 'GET');

        const tbody = document.getElementById('tablaMovimientos');
        
        if (response.transacciones && response.transacciones.length > 0) {
            tbody.innerHTML = response.transacciones.map(trans => {
                const esCredito = trans.id_cuenta_destino === cuentaCliente.id_cuenta;
                const claseMonto = esCredito ? 'text-success' : 'text-danger';
                const signo = esCredito ? '+' : '-';
                
                return `
                    <tr>
                        <td>${formatearFecha(trans.fecha_transaccion)}</td>
                        <td><span class="badge bg-secondary">${capitalizar(trans.tipo_transaccion)}</span></td>
                        <td>${trans.descripcion || '-'}</td>
                        <td class="text-end ${claseMonto}"><strong>${signo}${formatearMoneda(trans.monto)}</strong></td>
                    </tr>
                `;
            }).join('');
        } else {
            tbody.innerHTML = `
                <tr><td colspan="4" class="text-center text-muted">No hay movimientos recientes</td></tr>
            `;
        }
    } catch (error) {
        console.error('Error al cargar movimientos:', error);
        document.getElementById('tablaMovimientos').innerHTML = `
            <tr><td colspan="4" class="text-center text-danger">Error al cargar movimientos</td></tr>
        `;
    }
}

function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alerta.style.zIndex = '9999';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}
