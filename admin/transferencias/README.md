# Módulo de Transferencias

## Descripción
Gestión completa de transacciones bancarias: depósitos, retiros y transferencias entre cuentas.

## Funcionalidades

### 📊 Dashboard de Estadísticas
- Total de depósitos del día
- Total de retiros del día
- Total de transferencias del día
- Total de movimientos

### 💰 Operaciones Disponibles

#### 1. Depósito
- Acreditar fondos a una cuenta
- Validación de monto mínimo
- Búsqueda por número de cuenta
- Descripción opcional

#### 2. Retiro
- Debitar fondos de una cuenta
- Validación de saldo disponible
- Búsqueda por número de cuenta
- Descripción opcional

#### 3. Transferencia
- Transferir fondos entre dos cuentas
- Validación de cuentas origen y destino
- Validación de saldo disponible
- No permite transferencias a la misma cuenta
- Descripción opcional

### 📝 Historial de Transacciones
- Lista completa de todas las transacciones
- Filtros por:
  - Tipo de transacción (Depósito, Retiro, Transferencia)
  - Rango de fechas
- Visualización detallada de cada transacción
- Información de cuentas y clientes involucrados

## Endpoints Utilizados

```
GET    /api/transacciones              - Listar transacciones
GET    /api/transacciones/:id          - Obtener transacción por ID
POST   /api/transacciones/deposito     - Realizar depósito
POST   /api/transacciones/retiro       - Realizar retiro
POST   /api/transacciones/transferencia - Realizar transferencia
GET    /api/transacciones/cuenta/:id/historial - Historial de una cuenta
```

## Validaciones
- ✅ Monto mayor a 0
- ✅ Cuenta existe y está activa
- ✅ Saldo suficiente para retiros y transferencias
- ✅ Cuentas origen y destino diferentes en transferencias
- ✅ Autenticación y permisos requeridos

## Estado
✅ **FUNCIONAL** - Probado y operativo
