/**
 * Auth Service - Gestión de autenticación y sesión
 */

/**
 * Realizar login
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 */
async function iniciarSesion(username, password) {
    try {
        const response = await login(username, password);
        
        // El backend devuelve: { success: true, data: { user, accessToken, refreshToken } }
        if (response.success && response.data) {
            const { user, accessToken } = response.data;
            
            // El rol viene en user.rol.codigo (ej: "ADMIN", "CLIENTE", etc.)
            const rolCodigo = user.rol?.codigo || '';
            
            // Guardar en localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('role', rolCodigo.toLowerCase()); // guardar en minúsculas
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('usuario', JSON.stringify(user)); // También guardar como 'usuario' para compatibilidad
            
            // Redirigir según rol
            if (rolCodigo === 'ADMIN' || rolCodigo === 'GERENTE' || rolCodigo === 'CAJERO' || rolCodigo === 'ANALISTA') {
                window.location.href = 'admin/dashboard.html';
            } else if (rolCodigo === 'CLIENTE') {
                window.location.href = 'cliente/dashboard.html';
            } else {
                throw new Error('Rol no reconocido: ' + rolCodigo);
            }
        } else {
            throw new Error(response.message || 'Error en el inicio de sesión');
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    try {
        // Limpiar todo el localStorage
        localStorage.clear();
        // Asegurarse de que sessionStorage también se limpie
        sessionStorage.clear();
        
        // Determinar la ruta correcta al login según la ubicación actual
        const path = window.location.pathname;
        let loginPath = '/index.html';
        
        // Si estamos en una subcarpeta del admin o cliente, navegar correctamente
        if (path.includes('/admin/')) {
            loginPath = path.split('/admin/')[0] + '/index.html';
        } else if (path.includes('/cliente/')) {
            loginPath = path.split('/cliente/')[0] + '/index.html';
        }
        
        // Redirigir al login
        window.location.replace(loginPath);
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Forzar redirección de todas formas
        window.location.replace('../index.html');
    }
}

/**
 * Verificar si está autenticado
 * @returns {boolean}
 */
function estaAutenticado() {
    const token = localStorage.getItem('token');
    return token !== null;
}

/**
 * Obtener usuario actual
 * @returns {object|null}
 */
function getUsuarioActual() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Obtener rol del usuario
 * @returns {string|null}
 */
function getRolUsuario() {
    const role = localStorage.getItem('role');
    return role ? role.toLowerCase() : null;
}

/**
 * Verificar autenticación y rol
 * Redirige al login si no está autenticado
 * @param {string} requiredRole - Rol requerido ('admin' o 'cliente')
 * @returns {boolean} - true si está autenticado y tiene permisos
 */
function verificarAutenticacion(requiredRole = null) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    // Si no hay token, redirigir a login
    if (!token) {
        // Determinar ruta relativa al login
        const path = window.location.pathname;
        let loginPath = '../index.html';
        if (path.includes('/admin/')) {
            const depth = (path.split('/admin/')[1].match(/\//g) || []).length;
            loginPath = '../'.repeat(depth + 1) + 'index.html';
        } else if (path.includes('/cliente/')) {
            const depth = (path.split('/cliente/')[1].match(/\//g) || []).length;
            loginPath = '../'.repeat(depth + 1) + 'index.html';
        }
        window.location.href = loginPath;
        return false;
    }
    
    // Si se requiere un rol específico
    if (requiredRole) {
        if (requiredRole === 'admin') {
            // Admin incluye: admin, gerente, cajero, analista
            const rolesAdmin = ['admin', 'gerente', 'cajero', 'analista'];
            if (!rolesAdmin.includes(role)) {
                alert('No tienes permisos para acceder a esta página');
                cerrarSesion();
                return false;
            }
        } else if (requiredRole === 'cliente') {
            if (role !== 'cliente') {
                alert('No tienes permisos para acceder a esta página');
                cerrarSesion();
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Verificar si es admin
 * @returns {boolean}
 */
function esAdmin() {
    const role = getRolUsuario();
    return role === 'admin' || role === 'gerente' || role === 'cajero' || role === 'analista';
}

/**
 * Verificar si es cliente
 * @returns {boolean}
 */
function esCliente() {
    return getRolUsuario() === 'cliente';
}

/**
 * Alias para cerrar sesión
 */
function logout() {
    cerrarSesion();
}

/**
 * Alias para obtener usuario actual
 * @returns {object|null}
 */
function obtenerUsuarioActual() {
    return getUsuarioActual();
}

// ========================================
// Exportar todas las funciones al scope global para que estén disponibles en HTML
// ========================================
window.iniciarSesion = iniciarSesion;
window.cerrarSesion = cerrarSesion;
window.logout = logout;
window.estaAutenticado = estaAutenticado;
window.getUsuarioActual = getUsuarioActual;
window.getRolUsuario = getRolUsuario;
window.verificarAutenticacion = verificarAutenticacion;
window.esAdmin = esAdmin;
window.esCliente = esCliente;
window.obtenerUsuarioActual = obtenerUsuarioActual;
