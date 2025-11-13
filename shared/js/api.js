/**
 * API Service - Maneja todas las llamadas al Backend
 * Base URL: http://localhost:3000/api
 */

const API_URL = 'http://localhost:3000/api';

/**
 * Función principal para hacer llamadas a la API
 * @param {string} endpoint - Endpoint de la API (ej: '/usuarios')
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {object} data - Datos a enviar (para POST, PUT)
 * @returns {Promise} - Respuesta de la API
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('token');
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Agregar token si existe
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Agregar body si hay datos
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        // Si el token expiró o es inválido (401/403), manejar apropiadamente
        if (response.status === 401 || response.status === 403) {
            const result = await response.json();
            // Solo limpiar y redirigir si es un problema de token/autenticación
            if (result.message && (
                result.message.includes('Token') || 
                result.message.includes('token') ||
                result.message.includes('autenticación') ||
                result.message.includes('autenticacion') ||
                result.message.includes('sesión') ||
                result.message.includes('sesion')
            )) {
                localStorage.clear();
                const path = window.location.pathname;
                if (path.includes('/admin/') || path.includes('/cliente/')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
                return;
            }
            // Si no es problema de token, propagar el error normal
            throw new Error(result.message || 'No autorizado');
        }
        
        const result = await response.json();
        
        // Si hay error del servidor
        if (!response.ok) {
            throw new Error(result.message || 'Error en la petición');
        }
        
        // Si la respuesta tiene formato { success: true, data: [...] }
        // devolver solo data, si no devolver todo el resultado
        return result.data !== undefined ? result.data : result;
    } catch (error) {
        console.error('Error en API:', error);
        throw error;
    }
}

// ==================== AUTENTICACIÓN ====================

async function login(username, password) {
    // Login retorna la respuesta completa con success y data
    const token = localStorage.getItem('token');
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };
    
    const response = await fetch(`${API_URL}/auth/login`, options);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error en el inicio de sesión');
    }
    
    return result; // Retornar la respuesta completa { success, data }
}

// ==================== USUARIOS ====================

async function getUsuarios() {
    return await apiCall('/usuarios');
}

async function getUsuario(id) {
    return await apiCall(`/usuarios/${id}`);
}

async function crearUsuario(data) {
    return await apiCall('/usuarios', 'POST', data);
}

async function actualizarUsuario(id, data) {
    return await apiCall(`/usuarios/${id}`, 'PUT', data);
}

async function eliminarUsuario(id) {
    return await apiCall(`/usuarios/${id}`, 'DELETE');
}

// ==================== CLIENTES ====================

async function getClientes() {
    return await apiCall('/clientes');
}

async function getCliente(id) {
    return await apiCall(`/clientes/${id}`);
}

async function crearCliente(data) {
    return await apiCall('/clientes', 'POST', data);
}

async function actualizarCliente(id, data) {
    return await apiCall(`/clientes/${id}`, 'PUT', data);
}

async function eliminarCliente(id) {
    return await apiCall(`/clientes/${id}`, 'DELETE');
}

// ==================== CUENTAS ====================

async function getCuentas() {
    return await apiCall('/cuentas');
}

async function getCuenta(id) {
    return await apiCall(`/cuentas/${id}`);
}

async function getCuentasByCliente(clienteId) {
    return await apiCall(`/clientes/${clienteId}/cuentas`);
}

async function crearCuenta(data) {
    return await apiCall('/cuentas', 'POST', data);
}

async function actualizarCuenta(id, data) {
    return await apiCall(`/cuentas/${id}`, 'PUT', data);
}

// ==================== TRANSACCIONES ====================

async function getTransacciones(cuentaId = null) {
    const endpoint = cuentaId ? `/cuentas/${cuentaId}/transacciones` : '/transacciones';
    return await apiCall(endpoint);
}

async function crearTransaccion(data) {
    return await apiCall('/transacciones', 'POST', data);
}

async function depositar(data) {
    return await apiCall('/transacciones/deposito', 'POST', data);
}

async function retirar(data) {
    return await apiCall('/transacciones/retiro', 'POST', data);
}

// ==================== TRANSFERENCIAS ====================

async function getTransferencias() {
    return await apiCall('/transferencias');
}

async function crearTransferencia(data) {
    return await apiCall('/transferencias', 'POST', data);
}

// ==================== PRÉSTAMOS ====================

async function getPrestamos() {
    return await apiCall('/prestamos');
}

async function getPrestamo(id) {
    return await apiCall(`/prestamos/${id}`);
}

async function solicitarPrestamo(data) {
    return await apiCall('/prestamos', 'POST', data);
}

async function aprobarPrestamo(id) {
    return await apiCall(`/prestamos/${id}/aprobar`, 'PUT');
}

async function rechazarPrestamo(id) {
    return await apiCall(`/prestamos/${id}/rechazar`, 'PUT');
}

// ==================== REPORTES ====================

async function getReporteTransacciones(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/reportes/transacciones?${query}`);
}

async function getReportePrestamos(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/reportes/prestamos?${query}`);
}

async function getReporteGeneral() {
    return await apiCall('/reportes/general');
}

// ==================== ROLES ====================

async function getRoles() {
    return await apiCall('/roles');
}

async function getRol(id) {
    return await apiCall(`/roles/${id}`);
}

// ==================== AGENCIAS ====================

async function getAgencias() {
    return await apiCall('/agencias');
}

async function getAgencia(id) {
    return await apiCall(`/agencias/${id}`);
}

async function crearAgencia(data) {
    return await apiCall('/agencias', 'POST', data);
}

async function actualizarAgencia(id, data) {
    return await apiCall(`/agencias/${id}`, 'PUT', data);
}

async function eliminarAgencia(id) {
    return await apiCall(`/agencias/${id}`, 'DELETE');
}

// ==================== CUENTAS ====================

async function getCuentas(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/cuentas${query ? '?' + query : ''}`);
}

async function getCuenta(id) {
    return await apiCall(`/cuentas/${id}`);
}

async function getCuentaById(id) {
    return await apiCall(`/cuentas/${id}`);
}

async function getCuentaPorNumero(numero) {
    return await apiCall(`/cuentas/numero/${numero}`);
}

async function crearCuenta(data) {
    return await apiCall('/cuentas', 'POST', data);
}

async function createCuenta(data) {
    return await apiCall('/cuentas', 'POST', data);
}

async function consultarSaldo(id) {
    return await apiCall(`/cuentas/${id}/saldo`);
}

async function bloquearCuenta(id, data = {}) {
    return await apiCall(`/cuentas/${id}/bloquear`, 'PATCH', data);
}

async function cerrarCuenta(id, data = {}) {
    return await apiCall(`/cuentas/${id}/cerrar`, 'PATCH', data);
}

// ==================== TIPOS DE CUENTA ====================

async function getTiposCuenta() {
    return await apiCall('/tipos-cuenta');
}

async function getTipoCuenta(id) {
    return await apiCall(`/tipos-cuenta/${id}`);
}

// ==================== PRESTAMOS ====================

async function getPrestamos(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/prestamos${query ? '?' + query : ''}`);
}

async function getPrestamo(id) {
    return await apiCall(`/prestamos/${id}`);
}

async function solicitarPrestamo(data) {
    return await apiCall('/prestamos/solicitar', 'POST', data);
}

async function aprobarPrestamo(id, data) {
    return await apiCall(`/prestamos/${id}/aprobar`, 'POST', data);
}

async function desembolsarPrestamo(id) {
    return await apiCall(`/prestamos/${id}/desembolsar`, 'POST');
}

async function rechazarPrestamo(id, data) {
    return await apiCall(`/prestamos/${id}/rechazar`, 'POST', data);
}

// ==================== TIPOS DE PRESTAMO ====================

async function getTiposPrestamo() {
    return await apiCall('/tipos-prestamo');
}

async function getTipoPrestamo(id) {
    return await apiCall(`/tipos-prestamo/${id}`);
}

// ==================== TRANSACCIONES ====================

async function getTransacciones(filtros = {}) {
    const params = new URLSearchParams(filtros);
    return await apiCall(`/transacciones?${params.toString()}`);
}

async function getTransaccion(id) {
    return await apiCall(`/transacciones/${id}`);
}

async function realizarDeposito(id_cuenta, monto, descripcion = '') {
    return await apiCall('/transacciones/deposito', 'POST', {
        id_cuenta,
        monto,
        descripcion
    });
}

async function realizarRetiro(id_cuenta, monto, descripcion = '') {
    return await apiCall('/transacciones/retiro', 'POST', {
        id_cuenta,
        monto,
        descripcion
    });
}

async function realizarTransferencia(id_cuenta_origen, id_cuenta_destino, monto, descripcion = '') {
    return await apiCall('/transacciones/transferencia', 'POST', {
        id_cuenta_origen,
        id_cuenta_destino,
        monto,
        descripcion
    });
}

async function getHistorialCuenta(id_cuenta, limit = 50) {
    return await apiCall(`/transacciones/cuenta/${id_cuenta}/historial?limit=${limit}`);
}

// ==================== REPORTES ====================

async function getReporteTransacciones(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/reportes/transacciones?${query}`);
}

async function getReporteClientes(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/reportes/clientes?${query}`);
}

async function getReportePrestamos(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiCall(`/reportes/prestamos?${query}`);
}

async function getReporteMorosidad() {
    return await apiCall('/reportes/morosidad');
}

async function getEstadoCuenta(id_cuenta, fecha_inicio, fecha_fin) {
    const params = new URLSearchParams({ fecha_inicio, fecha_fin }).toString();
    return await apiCall(`/reportes/estado-cuenta/${id_cuenta}?${params}`);
}

// ========================================
// Exportar funciones al scope global
// ========================================
window.apiCall = apiCall;
