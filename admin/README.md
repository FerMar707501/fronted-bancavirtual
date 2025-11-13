# 👨‍💼 ADMIN - Panel de Administración

Panel completo de administración del sistema bancario.

## 🎯 Funcionalidades

### 📊 Dashboard
- Resumen general del sistema
- Estadísticas de usuarios, clientes y cuentas
- Gráficos y métricas

### 👥 Usuarios
- Listar todos los usuarios del sistema
- Crear nuevos usuarios
- Editar/eliminar usuarios
- Asignar roles

### 👤 Clientes
- Listar todos los clientes
- Crear nuevos clientes
- Ver detalle de cliente
- Ver cuentas asociadas

### 💳 Cuentas
- Listar todas las cuentas
- Crear cuentas para clientes
- Ver movimientos de cuenta
- Gestionar estado de cuentas

### 🏦 Préstamos
- Listar todos los préstamos
- Aprobar/rechazar solicitudes
- Ver detalle de préstamos
- Gestionar pagos de cuotas

### 🔄 Transferencias
- Ver historial de transferencias
- Validar transferencias
- Reportes de transferencias

### ⚙️ Parámetros
- Configurar tasas de interés
- Gestionar agencias
- Gestionar productos bancarios
- Configurar límites y comisiones

### 🔐 Permisos
- Asignar permisos a usuarios
- Definir roles y accesos

### 📈 Reportes
- Reporte de transacciones
- Reporte de préstamos
- Reporte general del sistema
- Exportar datos

## 🔒 Protección

Todas las páginas verifican que el usuario tenga rol `admin` antes de cargar.
