/**
 * Utilidades generales
 */

/**
 * Formatear moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada (ej: $1,234.56)
 */
function formatearMoneda(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

/**
 * Formatear fecha
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada (ej: 13/11/2025)
 */
function formatearFecha(date) {
    return new Date(date).toLocaleDateString('es-MX');
}

/**
 * Formatear fecha y hora
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha y hora formateada (ej: 13/11/2025 10:30:45)
 */
function formatearFechaHora(date) {
    return new Date(date).toLocaleString('es-MX');
}

/**
 * Mostrar alerta de éxito
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarExito(mensaje) {
    alert('✅ ' + mensaje);
}

/**
 * Mostrar alerta de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
    alert('❌ Error: ' + mensaje);
}

/**
 * Mostrar alerta de advertencia
 * @param {string} mensaje - Mensaje de advertencia
 */
function mostrarAdvertencia(mensaje) {
    alert('⚠️ ' + mensaje);
}

/**
 * Confirmar acción
 * @param {string} mensaje - Mensaje de confirmación
 * @returns {boolean}
 */
function confirmar(mensaje) {
    return confirm('⚠️ ' + mensaje);
}

/**
 * Validar email
 * @param {string} email
 * @returns {boolean}
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar que un campo no esté vacío
 * @param {string} valor
 * @returns {boolean}
 */
function validarRequerido(valor) {
    return valor !== null && valor !== undefined && valor.trim() !== '';
}

/**
 * Validar número positivo
 * @param {number} numero
 * @returns {boolean}
 */
function validarNumeroPositivo(numero) {
    return !isNaN(numero) && numero > 0;
}

/**
 * Validar monto (número positivo con máximo 2 decimales)
 * @param {number} monto
 * @returns {boolean}
 */
function validarMonto(monto) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(monto.toString()) && parseFloat(monto) > 0;
}

/**
 * Limpiar formulario
 * @param {string} formId - ID del formulario
 */
function limpiarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

/**
 * Deshabilitar botón
 * @param {string} btnId - ID del botón
 */
function deshabilitarBoton(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    }
}

/**
 * Habilitar botón
 * @param {string} btnId - ID del botón
 */
function habilitarBoton(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }
}

/**
 * Mostrar loader/spinner
 * @param {string} elementId - ID del elemento donde mostrar el loader
 */
function mostrarLoader(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loader">Cargando...</div>';
    }
}

/**
 * Ocultar loader
 * @param {string} elementId - ID del elemento
 */
function ocultarLoader(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Obtener parámetros de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null}
 */
function obtenerParametroURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Capitalizar primera letra
 * @param {string} texto
 * @returns {string}
 */
function capitalizar(texto) {
    if (!texto || typeof texto !== 'string') return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Truncar texto
 * @param {string} texto
 * @param {number} maxLength
 * @returns {string}
 */
function truncarTexto(texto, maxLength = 50) {
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
}

/**
 * Formatear número con separadores de miles
 * @param {number|string} num - Número a formatear
 * @returns {string}
 */
function formatNumber(num) {
    if (!num && num !== 0) return '0.00';
    const number = parseFloat(num);
    return number.toLocaleString('es-GT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Formatear fecha y hora
 * @param {string|Date} date - Fecha a formatear
 * @returns {string}
 */
function formatDateTime(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('es-GT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
