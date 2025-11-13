# Módulo de Reportes - Admin

## Descripción
Módulo para generar reportes y análisis del sistema bancario.

## Estructura
```
reportes/
├── index.html              # Vista principal con selector de reportes
├── controllers/
│   └── reportesController.js  # Lógica de negocio
├── services/               # (Reservado para futuros servicios)
└── views/                  # (Reservado para vistas adicionales)
```

## Tipos de Reportes

### 1. Reporte de Transacciones
- **Descripción**: Análisis completo de transacciones por período
- **Filtros**: 
  - Rango de fechas (requerido)
  - Tipo de transacción (opcional)
  - Cuenta específica (opcional)
- **Información mostrada**:
  - Total de transacciones
  - Monto total
  - Promedio por transacción
  - Distribución por tipo
  - Detalle de cada transacción
- **Exportación**: CSV

### 2. Reporte de Clientes
- **Descripción**: Información y estadísticas de clientes
- **Filtros**:
  - Estado del cliente
  - Estado KYC
  - Con/sin cuentas
  - Con/sin préstamos
- **Información mostrada**:
  - Total de clientes
  - Clientes con cuentas
  - Clientes con préstamos
  - KYC aprobados
  - Detalle por cliente
- **Exportación**: CSV

### 3. Reporte de Préstamos
- **Descripción**: Análisis de préstamos del sistema
- **Filtros**:
  - Estado del préstamo
  - Rango de fechas (opcional)
- **Información mostrada**:
  - Total de préstamos
  - Monto total prestado
  - Promedio por préstamo
  - Distribución por estado
  - Distribución por tipo
  - Detalle de préstamos
- **Exportación**: CSV

### 4. Reporte de Morosidad
- **Descripción**: Análisis de préstamos en mora
- **Filtros**: Ninguno (analiza todos los préstamos activos)
- **Información mostrada**:
  - Total de préstamos en mora
  - Monto total en mora
  - Días promedio de mora
  - Distribución por rango de días (1-30, 31-60, 61-90, >90)
  - Detalle de préstamos morosos
- **Exportación**: CSV

### 5. Estado de Cuenta
- **Descripción**: Detalle de movimientos de una cuenta específica
- **Filtros**:
  - Cuenta (requerido)
  - Rango de fechas (requerido)
- **Información mostrada**:
  - Información de la cuenta
  - Saldo inicial
  - Total de créditos
  - Total de débitos
  - Saldo final
  - Detalle de todos los movimientos
- **Exportación**: CSV

## Endpoints de Backend Utilizados

### GET /api/reportes/transacciones
**Query Params:**
- `fecha_inicio` (requerido)
- `fecha_fin` (requerido)
- `id_cuenta` (opcional)
- `tipo_transaccion` (opcional)
- `id_agencia` (opcional)

### GET /api/reportes/clientes
**Query Params:**
- `estado_cliente` (opcional)
- `estado_kyc` (opcional)
- `tiene_cuentas` (opcional)
- `tiene_prestamos` (opcional)

### GET /api/reportes/prestamos
**Query Params:**
- `estado` (opcional)
- `fecha_inicio` (opcional)
- `fecha_fin` (opcional)
- `id_agencia` (opcional)

### GET /api/reportes/morosidad
Sin parámetros

### GET /api/reportes/estado-cuenta/:idCuenta
**Query Params:**
- `fecha_inicio` (requerido)
- `fecha_fin` (requerido)

## Funciones Principales

### reportesController.js

#### Transacciones
- `generarReporteTransacciones()`: Genera y muestra el reporte
- `mostrarDistribucionTipos()`: Muestra distribución por tipo
- `mostrarTablaTransacciones()`: Renderiza la tabla
- `exportarTransacciones()`: Exporta a CSV

#### Clientes
- `generarReporteClientes()`: Genera y muestra el reporte
- `mostrarTablaClientes()`: Renderiza la tabla
- `exportarClientes()`: Exporta a CSV

#### Préstamos
- `generarReportePrestamos()`: Genera y muestra el reporte
- `mostrarDistribucionEstados()`: Muestra distribución por estado y tipo
- `mostrarTablaPrestamos()`: Renderiza la tabla
- `exportarPrestamos()`: Exporta a CSV

#### Morosidad
- `generarReporteMorosidad()`: Genera y muestra el reporte
- `mostrarDistribucionMora()`: Muestra distribución por días
- `mostrarTablaMorosidad()`: Renderiza la tabla
- `exportarMorosidad()`: Exporta a CSV

#### Estado de Cuenta
- `generarEstadoCuenta()`: Genera y muestra el reporte
- `mostrarMovimientosCuenta()`: Renderiza los movimientos
- `exportarEstadoCuenta()`: Exporta a CSV

#### Utilidades
- `exportarACSV()`: Función genérica para exportar tablas a CSV
- `obtenerColorEstado()`: Retorna clase CSS según estado
- `obtenerColorKYC()`: Retorna clase CSS según estado KYC
- `obtenerColorEstadoPrestamo()`: Retorna clase CSS según estado préstamo

## Características

### Diseño
- Interfaz responsive con Bootstrap 5
- Color principal: #db8e5e (café corporativo)
- Tarjetas interactivas para selección de reportes
- Estadísticas visuales con cards de colores
- Tablas responsive para visualización de datos

### Funcionalidad
- Generación de reportes en tiempo real
- Filtros avanzados por cada tipo de reporte
- Exportación a CSV de todos los reportes
- Validación de campos requeridos
- Manejo de errores con mensajes al usuario
- Fechas por defecto (último mes)

### Exportación CSV
- Formato estándar CSV con comillas
- Incluye encabezados de columna
- Nombre de archivo con fecha actual
- Codificación UTF-8

## Permisos Requeridos
- `REPORTE_VER`: Para todos los reportes excepto estado de cuenta
- `CUENTA_LISTAR`: Para estado de cuenta

## Mejoras Futuras
- [ ] Gráficos con Chart.js
- [ ] Exportación a PDF
- [ ] Reportes personalizados
- [ ] Guardar filtros favoritos
- [ ] Programar reportes automáticos
- [ ] Comparativas entre períodos
- [ ] Reportes por agencia
- [ ] Dashboard de reportes con widgets

## Notas de Desarrollo
- Todas las fechas deben enviarse en formato ISO (YYYY-MM-DD)
- Los montos se muestran con formato Q X,XXX.XX
- Las fechas se muestran en formato DD/MM/YYYY
- Los estados se capitalizan automáticamente
- El CSV usa punto y coma si es necesario para compatibilidad
