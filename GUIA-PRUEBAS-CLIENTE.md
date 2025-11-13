# 🧪 GUÍA DE PRUEBAS - MÓDULO CLIENTE

## 📋 Pre-requisitos

1. ✅ Backend corriendo en `http://localhost:3000`
2. ✅ Base de datos con datos de prueba
3. ✅ Usuario cliente creado

## 👤 Credenciales de Prueba

### Cliente de Prueba
```
Usuario: juan.perez
Contraseña: Cliente123!
```

## 🔄 Flujo de Pruebas Completo

### 1. Inicio de Sesión
**Página:** `index.html`

1. Abrir el navegador en `http://localhost:puerto/Frontend/index.html`
2. Ingresar credenciales del cliente
3. Clic en "Iniciar Sesión"
4. ✅ Debe redirigir a `cliente/dashboard.html`

### 2. Dashboard Principal
**Página:** `cliente/dashboard.html`

✅ **Verificar que se muestre:**
- Número de cuenta
- Tipo de cuenta
- Saldo disponible
- Estado de la cuenta
- 3 tarjetas de acceso rápido (Depositar, Retirar, Pagar)
- Préstamos activos (si los hay)
- Últimos 5 movimientos

🧪 **Pruebas:**
- Clic en cada tarjeta debe llevar a su respectiva página
- Los montos deben estar formateados (Q X,XXX.XX)
- El navbar debe mostrar el nombre del usuario

### 3. Depositar
**Página:** `cliente/depositar/index.html`

🧪 **Prueba 1: Depósito exitoso**
1. Ingresar monto: `500.00`
2. Descripción: "Depósito de prueba"
3. Clic en "Realizar Depósito"
4. ✅ Debe mostrar modal de confirmación
5. ✅ El saldo debe actualizarse

🧪 **Prueba 2: Validación de monto mínimo**
1. Ingresar monto: `0.50`
2. Clic en "Realizar Depósito"
3. ✅ Debe mostrar alerta de error

🧪 **Prueba 3: Campos requeridos**
1. Dejar monto vacío
2. Clic en "Realizar Depósito"
3. ✅ Debe mostrar validación HTML5

### 4. Retirar
**Página:** `cliente/retirar/index.html`

🧪 **Prueba 1: Retiro exitoso**
1. Verificar saldo disponible
2. Ingresar monto menor al saldo: `100.00`
3. Clic en "Realizar Retiro"
4. Confirmar en el prompt
5. ✅ Debe mostrar modal de éxito
6. ✅ El saldo debe disminuir

🧪 **Prueba 2: Saldo insuficiente**
1. Ingresar monto mayor al saldo disponible
2. Clic en "Realizar Retiro"
3. ✅ Debe mostrar alerta "Saldo insuficiente"

🧪 **Prueba 3: Cancelar retiro**
1. Ingresar monto válido
2. Clic en "Realizar Retiro"
3. Cancelar en el prompt de confirmación
4. ✅ No debe realizar el retiro

### 5. Pagar Préstamo
**Página:** `cliente/pagar/index.html`

**NOTA:** Esta prueba requiere que el cliente tenga préstamos activos.

🧪 **Prueba 1: Sin préstamos**
- ✅ Debe mostrar mensaje "No tienes préstamos activos"

🧪 **Prueba 2: Con préstamos (si aplica)**
1. ✅ Debe mostrar lista de préstamos
2. Clic en un préstamo
3. ✅ Debe mostrar información detallada
4. Clic en "Pagar 50%"
5. ✅ Debe auto-completar el monto
6. Clic en "Confirmar Pago"
7. Confirmar en el prompt
8. ✅ Debe mostrar modal de éxito
9. ✅ El progreso debe actualizarse

🧪 **Prueba 3: Pago completo**
1. Seleccionar préstamo
2. Clic en "Pagar completo"
3. Verificar que el monto sea el saldo pendiente
4. Confirmar pago
5. ✅ El préstamo debe quedar con saldo 0

### 6. Movimientos
**Página:** `cliente/movimientos/index.html`

🧪 **Prueba 1: Ver historial completo**
1. ✅ Debe cargar todas las transacciones
2. ✅ Debe mostrar paginación si hay más de 15 registros
3. ✅ Depósitos deben tener signo "+"
4. ✅ Retiros deben tener signo "-"

🧪 **Prueba 2: Filtro por tipo**
1. Seleccionar "Depósito" en el filtro
2. Clic en "Buscar"
3. ✅ Solo debe mostrar depósitos

🧪 **Prueba 3: Filtro por fechas**
1. Seleccionar fecha desde: hace 1 semana
2. Seleccionar fecha hasta: hoy
3. Clic en "Buscar"
4. ✅ Solo debe mostrar transacciones en ese rango

🧪 **Prueba 4: Limpiar filtros**
1. Aplicar cualquier filtro
2. Clic en "Limpiar"
3. ✅ Debe mostrar todas las transacciones nuevamente

🧪 **Prueba 5: Paginación**
1. Si hay más de 15 registros
2. ✅ Debe mostrar botones de paginación
3. Clic en "Siguiente"
4. ✅ Debe cargar la siguiente página

### 7. Mi Perfil
**Página:** `cliente/perfil/index.html`

🧪 **Prueba 1: Ver información**
1. ✅ Debe mostrar nombre completo
2. ✅ Debe mostrar username
3. ✅ Debe mostrar correo
4. ✅ Debe mostrar rol
5. ✅ Debe mostrar último acceso
6. ✅ Debe listar todas las cuentas

🧪 **Prueba 2: Cambiar contraseña - Exitoso**
1. Ingresar contraseña actual correcta
2. Ingresar nueva contraseña (min 6 caracteres)
3. Confirmar nueva contraseña (igual)
4. Clic en "Cambiar Contraseña"
5. ✅ Debe mostrar mensaje de éxito
6. ✅ El formulario debe limpiarse

🧪 **Prueba 3: Cambiar contraseña - Contraseñas no coinciden**
1. Ingresar contraseña actual
2. Ingresar nueva contraseña: "123456"
3. Confirmar con: "654321"
4. Clic en "Cambiar Contraseña"
5. ✅ Debe mostrar alerta "Las contraseñas no coinciden"

🧪 **Prueba 4: Cambiar contraseña - Contraseña actual incorrecta**
1. Ingresar contraseña actual incorrecta
2. Ingresar nueva contraseña válida
3. Confirmar nueva contraseña
4. Clic en "Cambiar Contraseña"
5. ✅ Debe mostrar error del backend

### 8. Navegación General

🧪 **Prueba 1: Navbar**
- Clic en "Inicio" → debe ir a dashboard
- Clic en "Movimientos" → debe ir a movimientos
- Clic en "Mi Perfil" → debe ir a perfil
- Clic en "Cerrar Sesión" → debe cerrar sesión y volver a login

🧪 **Prueba 2: Autenticación**
1. Cerrar sesión
2. Intentar acceder directamente a `cliente/dashboard.html`
3. ✅ Debe redirigir al login

🧪 **Prueba 3: Botones "Volver"**
- En cada página secundaria hay botón "Volver"
- ✅ Debe regresar al dashboard

### 9. Responsive Design

🧪 **Prueba en diferentes dispositivos:**
- Desktop (1920x1080)
- Tablet (768x1024)
- Móvil (375x667)

✅ **Verificar:**
- Navbar colapsa en móvil
- Tarjetas se apilan verticalmente
- Tablas tienen scroll horizontal
- Botones son táctiles (min 44px)

### 10. Errores y Edge Cases

🧪 **Prueba 1: Backend no disponible**
1. Detener el backend
2. Intentar hacer un depósito
3. ✅ Debe mostrar error de conexión

🧪 **Prueba 2: Token expirado**
1. Esperar que el token expire (o borrar manualmente)
2. Intentar hacer una operación
3. ✅ Debe redirigir al login

🧪 **Prueba 3: Cuenta sin saldo**
1. Cuenta con saldo Q 0.00
2. Intentar retirar
3. ✅ Debe mostrar "Saldo insuficiente"

## ✅ Checklist de Pruebas

- [ ] Login funciona correctamente
- [ ] Dashboard muestra toda la información
- [ ] Depositar funciona y actualiza saldo
- [ ] Retirar valida saldo y funciona
- [ ] Pagar préstamo funciona (si hay préstamos)
- [ ] Movimientos muestra historial completo
- [ ] Filtros en movimientos funcionan
- [ ] Paginación funciona correctamente
- [ ] Perfil muestra información correcta
- [ ] Cambio de contraseña funciona
- [ ] Navegación funciona en todas las páginas
- [ ] Cerrar sesión funciona
- [ ] Responsive en móviles
- [ ] Manejo de errores funciona
- [ ] Validaciones de formularios funcionan

## 🐛 Reporte de Errores

Si encuentras algún error, documenta:
1. Página donde ocurrió
2. Acción que realizaste
3. Error esperado vs error actual
4. Consola del navegador (F12)
5. Respuesta del backend (Network tab)

## 📊 Criterios de Aceptación

✅ **El módulo se considera funcional si:**
1. Todas las páginas cargan sin errores
2. Las operaciones de depositar/retirar/pagar funcionan
3. Los saldos se actualizan correctamente
4. Los filtros y paginación funcionan
5. No hay errores en la consola
6. La navegación es fluida
7. El diseño es responsive

---

**Última actualización:** 13 de Noviembre, 2025
