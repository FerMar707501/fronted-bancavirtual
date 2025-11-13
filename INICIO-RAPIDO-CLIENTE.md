# 🚀 INICIO RÁPIDO - MÓDULO CLIENTE

## 📋 Lo que necesitas saber

El módulo cliente permite a los usuarios realizar las siguientes operaciones:
- 💰 **Depositar** dinero a su cuenta
- 💸 **Retirar** dinero de su cuenta  
- 💳 **Pagar** sus préstamos activos
- 📜 **Ver historial** de todas sus transacciones
- 👤 **Gestionar** su perfil y cambiar contraseña

---

## ⚡ Acceso Rápido

### 1️⃣ Inicia Sesión
```
URL: http://localhost:puerto/Frontend/index.html
Usuario: juan.perez
Contraseña: Cliente123!
```

### 2️⃣ Dashboard
Automáticamente llegarás al dashboard donde verás:
- Tu saldo disponible
- Tus cuentas activas
- Tus préstamos (si tienes)
- Últimos movimientos

### 3️⃣ Operaciones Rápidas
Desde el dashboard haz clic en:
- **Depositar** → Ingresa monto → Confirmar
- **Retirar** → Ingresa monto → Confirmar
- **Pagar Préstamo** → Selecciona préstamo → Ingresa monto → Confirmar

---

## 🎯 Operaciones Paso a Paso

### Hacer un Depósito
1. Clic en "Depositar" desde el dashboard
2. Ingresa el monto (mínimo Q 1.00)
3. Opcional: Agrega una descripción
4. Clic en "Realizar Depósito"
5. ✅ Verás un modal de confirmación con tu nuevo saldo

### Hacer un Retiro
1. Clic en "Retirar" desde el dashboard
2. Ingresa el monto (debe ser menor a tu saldo)
3. Opcional: Agrega una descripción
4. Clic en "Realizar Retiro"
5. Confirma en el popup
6. ✅ Verás un modal con tu nuevo saldo

### Pagar un Préstamo
1. Clic en "Pagar Préstamo" desde el dashboard
2. Selecciona el préstamo que quieres pagar
3. Opciones rápidas:
   - "Pagar completo" → Paga todo el saldo pendiente
   - "Pagar 50%" → Paga la mitad del saldo
4. O ingresa un monto personalizado
5. Clic en "Confirmar Pago"
6. ✅ Verás la actualización del progreso del préstamo

### Ver Historial
1. Clic en "Movimientos" en el navbar
2. Usa los filtros:
   - Por tipo: Depósito, Retiro, Transferencia, etc.
   - Por fechas: Desde - Hasta
3. Clic en "Buscar"
4. ✅ Verás tu historial filtrado con paginación

### Cambiar Contraseña
1. Clic en tu nombre → "Mi Perfil"
2. En la sección "Cambiar Contraseña"
3. Ingresa tu contraseña actual
4. Ingresa la nueva contraseña (mínimo 6 caracteres)
5. Confirma la nueva contraseña
6. Clic en "Cambiar Contraseña"
7. ✅ Tu contraseña ha sido actualizada

---

## 📱 Navegación

### Navbar Superior
- **Inicio** → Volver al dashboard
- **Movimientos** → Ver historial completo
- **Mi Perfil** → Ver/editar perfil
- **Tu nombre** → Menú desplegable
  - Mi Perfil
  - Cerrar Sesión

### Desde el Dashboard
- **3 tarjetas grandes** → Acceso directo a Depositar, Retirar, Pagar
- **Tabla de movimientos** → Link "Ver todos" → Historial completo
- **Préstamos** → Botón "Realizar Pago" → Ir a pagar

---

## 💡 Tips y Trucos

### ⚠️ Antes de Operar
- Verifica siempre tu saldo actual
- Lee las alertas de advertencia
- Confirma los montos antes de proceder

### ✅ Buenas Prácticas
- Agrega descripciones a tus transacciones para recordar el motivo
- Revisa tu historial regularmente
- Cambia tu contraseña periódicamente
- Cierra sesión cuando termines

### 🚫 Evita Errores Comunes
- ❌ No intentes retirar más de tu saldo
- ❌ No uses montos con más de 2 decimales
- ❌ No olvides confirmar en los popups
- ❌ No cierres la ventana durante una operación

---

## 🔍 ¿Dónde está...?

| Quiero... | Dónde encontrarlo |
|-----------|------------------|
| Ver mi saldo | Dashboard (tarjeta grande arriba) |
| Hacer un depósito | Dashboard → Tarjeta "Depositar" |
| Hacer un retiro | Dashboard → Tarjeta "Retirar" |
| Pagar préstamo | Dashboard → Tarjeta "Pagar Préstamo" |
| Ver movimientos | Navbar → "Movimientos" |
| Ver mis préstamos | Dashboard → Sección "Mis Préstamos" |
| Cambiar contraseña | Navbar → Tu nombre → "Mi Perfil" |
| Ver mis cuentas | Mi Perfil → Sección "Mis Cuentas" |
| Cerrar sesión | Navbar → Tu nombre → "Cerrar Sesión" |

---

## ❓ Preguntas Frecuentes

### ¿Cuál es el monto mínimo para depositar/retirar?
**R:** Q 1.00 (un quetzal)

### ¿Puedo tener múltiples cuentas?
**R:** Sí, puedes tener múltiples cuentas. El sistema usará la primera cuenta activa para las operaciones.

### ¿Puedo cancelar una operación?
**R:** Sí, antes de confirmar. Una vez confirmada, la operación no se puede revertir.

### ¿Cómo sé si mi operación fue exitosa?
**R:** Verás un modal verde con un ícono de check y los detalles de la operación.

### ¿Qué hago si veo un error?
**R:** Verifica tu conexión a internet y que el backend esté funcionando. Si persiste, contacta al administrador.

### ¿Puedo pagar un préstamo parcialmente?
**R:** Sí, puedes pagar cualquier monto hasta el saldo pendiente.

### ¿Dónde veo el código de mi transacción?
**R:** En Movimientos → Columna "Referencia"

### ¿Puedo exportar mi historial?
**R:** Esta función está planificada para una futura actualización.

---

## 🆘 Problemas Comunes

### "No hay cuenta disponible"
- **Causa:** No tienes cuentas activas
- **Solución:** Contacta al administrador para activar tu cuenta

### "Saldo insuficiente"
- **Causa:** Intentas retirar más de lo que tienes
- **Solución:** Reduce el monto o haz un depósito primero

### "Error al realizar operación"
- **Causa:** Problema de conexión o backend
- **Solución:** Verifica tu internet y recarga la página

### "Token expirado" / Redirige al login
- **Causa:** Tu sesión expiró
- **Solución:** Vuelve a iniciar sesión

### La página no carga
- **Causa:** Backend no está corriendo
- **Solución:** Verifica que el backend esté en http://localhost:3000

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Recarga la página (F5)
2. Cierra sesión y vuelve a entrar
3. Verifica la consola del navegador (F12)
4. Contacta al administrador del sistema

---

## 🎉 ¡Listo!

Ya puedes usar todas las funciones del módulo cliente. ¡Es fácil e intuitivo!

**¡Disfruta tu experiencia bancaria! 🏦**

---

**Documentos relacionados:**
- `README.md` - Documentación completa
- `MODULO-CLIENTE-COMPLETO.md` - Detalles técnicos
- `GUIA-PRUEBAS-CLIENTE.md` - Guía de pruebas
- `RESUMEN-CLIENTE.md` - Resumen ejecutivo
