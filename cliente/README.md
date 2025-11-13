# 👤 CLIENTE - Portal del Cliente

Portal para operaciones bancarias básicas del cliente.

## 🎯 Funcionalidades Implementadas

### 📊 Dashboard Principal (`dashboard.html`)
- ✅ Ver información completa de la cuenta (número, tipo, estado)
- ✅ Saldo disponible en tiempo real con diseño visual atractivo
- ✅ Accesos rápidos a las 3 funciones principales (Depositar, Retirar, Pagar)
- ✅ Resumen de préstamos activos con barra de progreso
- ✅ Tabla de últimos 5 movimientos
- ✅ Navegación intuitiva y responsiva

### 💰 Depositar (`depositar/index.html`)
- ✅ Formulario simple de depósito
- ✅ Muestra información de la cuenta y saldo actual
- ✅ Validación de monto mínimo (Q 1.00)
- ✅ Campo opcional de descripción
- ✅ Modal de confirmación con monto depositado y nuevo saldo
- ✅ Actualización automática del saldo

### 💸 Retirar (`retirar/index.html`)
- ✅ Formulario de retiro con validaciones
- ✅ Verificación de saldo disponible
- ✅ Validación de monto mínimo (Q 1.00)
- ✅ Confirmación de operación
- ✅ Modal de éxito con nuevo saldo
- ✅ Alerta de advertencia antes de confirmar

### 💳 Pagar Préstamo (`pagar/index.html`)
- ✅ Lista de préstamos activos del cliente
- ✅ Selección visual de préstamo
- ✅ Información detallada del préstamo (monto total, pagado, pendiente)
- ✅ Barra de progreso de pagos
- ✅ Botones rápidos: "Pagar completo" y "Pagar 50%"
- ✅ Validación de saldo suficiente
- ✅ Confirmación de pago
- ✅ Actualización en tiempo real de saldos

### 📜 Historial de Movimientos (`movimientos/index.html`)
- ✅ Tabla completa de todas las transacciones
- ✅ Filtros por tipo de transacción
- ✅ Filtros por rango de fechas (desde/hasta)
- ✅ Paginación inteligente (15 registros por página)
- ✅ Indicadores visuales de crédito (+) y débito (-)
- ✅ Código de referencia de transacción
- ✅ Estado de cada transacción

### 👤 Mi Perfil (`perfil/index.html`)
- ⏳ Por implementar:
  - Ver datos personales
  - Cambiar contraseña
  - Actualizar información de contacto

## 📁 Estructura de Carpetas

```
cliente/
├── dashboard.html          # Dashboard principal
├── css/
│   └── cliente.css        # Estilos específicos del cliente
├── js/
│   └── dashboard.js       # Lógica del dashboard
├── depositar/
│   └── index.html         # Página de depósito
├── retirar/
│   └── index.html         # Página de retiro
├── pagar/
│   └── index.html         # Página de pago de préstamos
├── movimientos/
│   └── index.html         # Historial de transacciones
├── perfil/
│   └── index.html         # Perfil del usuario (pendiente)
└── README.md              # Este archivo
```

## 🎨 Características de Diseño

- **Color Principal:** #db8e5e (Café corporativo)
- **Framework:** Bootstrap 5
- **Iconos:** Bootstrap Icons
- **Diseño Responsivo:** Compatible con móviles y tablets
- **Efectos:** Hover cards, animaciones smooth, modales de confirmación
- **UX:** Feedback visual inmediato, alertas automáticas, confirmaciones de seguridad

## 🔒 Seguridad

- ✅ Verificación de autenticación en cada página
- ✅ Validación de rol CLIENTE
- ✅ Confirmaciones antes de operaciones críticas
- ✅ Validación de saldo antes de retiros y pagos
- ✅ Tokens JWT en todas las peticiones al backend

## 🔗 Endpoints del Backend Utilizados

- `GET /api/cuentas/mis-cuentas` - Obtener cuentas del cliente
- `GET /api/prestamos/mis-prestamos` - Obtener préstamos del cliente
- `GET /api/transacciones/cuenta/:id` - Obtener transacciones
- `POST /api/transacciones/deposito` - Realizar depósito
- `POST /api/transacciones/retiro` - Realizar retiro
- `POST /api/prestamos/:id/pagar` - Realizar pago de préstamo

## 📝 Notas de Implementación

1. **Modularidad:** Cada función (depositar, retirar, pagar) tiene su propia página independiente
2. **Reutilización:** Se usan los archivos shared (api.js, auth.js, utils.js) para lógica común
3. **Validaciones:** Doble validación en frontend y backend
4. **Feedback:** Modales de confirmación y alertas informativas en cada operación
5. **Navegación:** Navbar consistente en todas las páginas

## 🚀 Próximos Pasos

1. Implementar página de perfil completa
2. Agregar exportación de movimientos a PDF/Excel
3. Implementar notificaciones en tiempo real
4. Agregar gráficos de gastos/ingresos mensuales
