# Plan de Implementación - Módulo Cliente

## Estado Actual
- ✅ Estructura base creada
- ✅ Dashboard cliente
- ✅ Vistas creadas: Depositar, Retirar, Pagar, Movimientos, Perfil
- ⚠️ Funcionalidades por verificar y completar

## FASE 1: DEPOSITAR 💰
**Objetivo**: Permitir al cliente realizar depósitos a su cuenta

### Requisitos Backend
- Endpoint: `POST /api/transacciones/deposito`
- Permiso necesario: `TRANS_DEPOSITO`
- Campos requeridos:
  - `id_cuenta` (ID de la cuenta)
  - `monto` (cantidad a depositar)
  - `descripcion` (opcional)

### Tareas
- [x] Vista HTML creada
- [x] Permisos del rol CLIENTE agregados
- [x] Endpoint `/api/cuentas/mis-cuentas` creado
- [x] Funcionalidad de depósito probada y funcionando ✅
- [x] Actualización de saldo validada
- [x] Campo corregido de `id_cuenta_destino` a `id_cuenta`

**Estado: ✅ COMPLETADA**

---

## FASE 2: RETIRAR 💸
**Objetivo**: Permitir al cliente retirar dinero de su cuenta

### Requisitos Backend
- Endpoint: `POST /api/transacciones/retiro`
- Permiso necesario: `TRANS_RETIRO`
- Campos requeridos:
  - `id_cuenta_origen` (ID de la cuenta)
  - `monto` (cantidad a retirar)
  - `descripcion` (opcional)

### Validaciones Importantes
- Verificar saldo disponible
- No permitir retiros mayores al saldo
- Monto mínimo de retiro

### Tareas
- [x] Vista HTML creada
- [ ] Verificar permisos del rol CLIENTE
- [ ] Implementar validación de saldo
- [ ] Probar funcionalidad de retiro
- [ ] Validar actualización de saldo
- [ ] Probar casos límite

---

## FASE 3: PAGAR 💳
**Objetivo**: Permitir al cliente realizar pagos (préstamos, servicios, etc.)

### Tipos de Pago
1. **Pago de Préstamo**
   - Endpoint: `POST /api/prestamos/:id/pagar`
   - Mostrar préstamos activos del cliente
   - Calcular cuotas pendientes
   - Validar monto mínimo (cuota)

2. **Pago de Servicios** (futuro)
   - Luz, agua, teléfono, etc.

### Tareas
- [x] Vista HTML creada
- [ ] Verificar permisos del rol CLIENTE
- [ ] Cargar préstamos activos del cliente
- [ ] Implementar pago de préstamo
- [ ] Mostrar historial de pagos
- [ ] Validaciones de monto

---

## FASE 4: MOVIMIENTOS 📊
**Objetivo**: Mostrar historial de transacciones del cliente

### Requisitos Backend
- Endpoint: `GET /api/transacciones/cuenta/:id_cuenta/historial`
- Permiso necesario: `TRANS_LISTAR`

### Funcionalidades
- Listar todas las transacciones
- Filtrar por tipo (depósito, retiro, transferencia, pago)
- Filtrar por fecha
- Exportar a PDF/Excel

### Tareas
- [x] Vista HTML creada
- [ ] Verificar carga de movimientos
- [ ] Implementar filtros
- [ ] Agregar paginación
- [ ] Exportar reportes

---

## FASE 5: PERFIL 👤
**Objetivo**: Permitir al cliente ver y actualizar su información personal

### Funcionalidades
- Ver datos personales
- Cambiar contraseña
- Actualizar correo electrónico
- Ver información de cuenta

### Tareas
- [x] Vista HTML creada
- [ ] Cargar datos del cliente
- [ ] Implementar cambio de contraseña
- [ ] Actualizar datos personales
- [ ] Validaciones de seguridad

---

## PRIORIDADES ACTUALES

### 🔴 ALTA PRIORIDAD
1. **Verificar y corregir permisos del rol CLIENTE**
   - Asegurar que tiene: TRANS_DEPOSITO, TRANS_RETIRO, TRANS_LISTAR
   - Verificar permisos de préstamos

2. **Completar DEPOSITAR**
   - Probar flujo completo
   - Validar errores

3. **Completar RETIRAR**
   - Implementar validación de saldo
   - Probar flujo completo

### 🟡 MEDIA PRIORIDAD
4. **Completar PAGAR**
   - Cargar préstamos del cliente
   - Implementar pago

5. **Validar MOVIMIENTOS**
   - Verificar carga correcta
   - Implementar filtros

### 🟢 BAJA PRIORIDAD
6. **Completar PERFIL**
   - Cambio de contraseña
   - Actualización de datos

---

## NOTAS TÉCNICAS

### Estructura de Archivos
```
Frontend/cliente/
├── dashboard.html          # Dashboard principal
├── depositar/
│   └── index.html         # ✅ Vista de depósito
├── retirar/
│   └── index.html         # ⚠️ Por completar
├── pagar/
│   └── index.html         # ⚠️ Por completar
├── movimientos/
│   └── index.html         # ⚠️ Por validar
├── perfil/
│   └── index.html         # ⚠️ Por completar
├── js/
│   └── logout.js          # ✅ Cerrar sesión
└── css/
    └── cliente.css        # Estilos del cliente
```

### APIs Disponibles
- `/api/auth/login` - Login
- `/api/auth/logout` - Logout
- `/api/cuentas/mis-cuentas` - Obtener cuentas del usuario
- `/api/transacciones/deposito` - Realizar depósito
- `/api/transacciones/retiro` - Realizar retiro
- `/api/transacciones/transferencia` - Transferencia
- `/api/transacciones/cuenta/:id/historial` - Historial
- `/api/prestamos/mis-prestamos` - Préstamos del cliente
- `/api/prestamos/:id/pagar` - Pagar préstamo

---

## SIGUIENTE PASO
**Empezar con FASE 1: Verificar y probar DEPOSITAR**
