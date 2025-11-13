# Módulo de Gestión de Cuentas - Administrador

## Descripción
Este módulo permite a los administradores gestionar las cuentas bancarias del sistema.

## Funcionalidades Implementadas

### Listado de Cuentas
- Visualización de todas las cuentas con información detallada
- Filtros por:
  - Número de cuenta (búsqueda)
  - Estado (activa, bloqueada, cerrada)
  - Tipo de cuenta
- Estadísticas en tiempo real:
  - Total de cuentas activas
  - Total de cuentas bloqueadas
  - Total de cuentas cerradas
  - Saldo total del sistema

### Crear Nueva Cuenta
- Selección de cliente activo
- Selección de tipo de cuenta
- Asignación de agencia
- Saldo inicial opcional
- Generación automática de número de cuenta único

### Ver Detalle de Cuenta
- Información completa de la cuenta
- Datos del cliente asociado
- Historial y estadísticas

### Bloquear/Desbloquear Cuenta
- Cambio de estado de cuenta
- Registro de motivo
- Validaciones de seguridad

### Cerrar Cuenta
- Cierre definitivo de cuenta
- Validación de saldo en 0
- Registro de motivo obligatorio

## Estructura de Archivos
```
/admin/cuentas/
├── index.html       # Vista principal
├── controller.js    # Lógica de negocio y manejo de eventos
├── style.css        # Estilos específicos del módulo
└── README.md        # Este archivo
```

## APIs del Backend Utilizadas
- `GET /api/cuentas` - Listar cuentas con filtros
- `GET /api/cuentas/:id` - Obtener detalle de cuenta
- `POST /api/cuentas` - Crear nueva cuenta
- `PATCH /api/cuentas/:id/bloquear` - Bloquear/desbloquear cuenta
- `PATCH /api/cuentas/:id/cerrar` - Cerrar cuenta
- `GET /api/tipos-cuenta` - Obtener tipos de cuenta disponibles
- `GET /api/clientes` - Obtener listado de clientes
- `GET /api/agencias` - Obtener listado de agencias

## Dependencias
- Bootstrap 5.3.2
- Bootstrap Icons
- Scripts compartidos:
  - `/shared/js/utils.js` - Funciones utilitarias
  - `/shared/js/api.js` - Cliente API
  - `/shared/js/auth.js` - Manejo de autenticación

## Permisos Requeridos
- `ADMIN_CUENTAS` o `ADMIN_USUARIOS`

## Notas Técnicas
- El número de cuenta se genera automáticamente en el backend
- Las cuentas solo pueden cerrarse si el saldo es 0
- Todas las acciones quedan registradas en la bitácora del sistema
- Los filtros se aplican en tiempo real con debounce
