/**
 * Función para confirmar y cerrar sesión en el área de cliente
 */
function confirmarCerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Limpiar localStorage y sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirigir al login raíz usando replace para evitar volver atrás
        const path = window.location.pathname;
        if (path.includes('/dashboard.html')) {
            window.location.replace('../index.html');
        } else {
            // Si estamos en una subcarpeta, subir dos niveles
            window.location.replace('../../index.html');
        }
    }
}

// Hacer disponible globalmente
window.confirmarCerrarSesion = confirmarCerrarSesion;
