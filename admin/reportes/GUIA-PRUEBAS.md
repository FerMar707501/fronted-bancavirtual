# Guía de Prueba - Módulo de Reportes

## Pre-requisitos
- Backend corriendo en puerto 3000
- Frontend servido en puerto 8080  
- Usuario admin con credenciales válidas

## Pasos para Probar

### 1. Acceso al Sistema
```
URL: http://localhost:8080
Usuario: admin
Password: [tu password de admin]
```

### 2. Navegar a Reportes
1. Iniciar sesión
2. En el menú lateral, hacer clic en "Reportes"
3. Deberías ver 5 tarjetas de tipos de reportes

### 3. Probar Reporte de Transacciones

#### Generar Reporte
1. Clic en la tarjeta "Transacciones"
2. Seleccionar fecha inicio (ej: hace 1 mes)
3. Seleccionar fecha fin (hoy)
4. (Opcional) Seleccionar tipo de transacción
5. Clic en "Generar"

#### Verificar Resultados
- ✅ Se muestra resumen con estadísticas
- ✅ Cards con total transacciones, monto total, promedio
- ✅ Distribución por tipo
- ✅ Tabla con todas las transacciones

#### Exportar
1. Clic en botón "Exportar"
2. Se descarga archivo CSV
3. Verificar que contiene los datos correctos

### 4. Probar Reporte de Clientes

#### Generar Reporte
1. Clic en tarjeta "Clientes"
2. (Opcional) Filtrar por:
   - Estado del cliente
   - Estado KYC
   - Con/sin cuentas
3. Clic en "Generar"

#### Verificar Resultados
- ✅ Resumen: Total clientes, con cuentas, con préstamos, KYC aprobado
- ✅ Tabla con DPI, nombre, correo, estados
- ✅ Contadores de cuentas y préstamos por cliente

#### Exportar
- Clic en "Exportar" y verificar CSV

### 5. Probar Reporte de Préstamos

#### Generar Reporte
1. Clic en tarjeta "Préstamos"
2. (Opcional) Filtrar por:
   - Estado (pendiente, aprobado, activo, etc.)
   - Fechas
3. Clic en "Generar"

#### Verificar Resultados
- ✅ Total préstamos, monto total, promedio
- ✅ Distribución por estado
- ✅ Distribución por tipo
- ✅ Tabla con número, cliente, tipo, monto, plazo

#### Exportar
- Clic en "Exportar" y verificar CSV

### 6. Probar Reporte de Morosidad

#### Generar Reporte
1. Clic en tarjeta "Morosidad"
2. Clic en "Generar Reporte"
3. No requiere filtros adicionales

#### Verificar Resultados
- ✅ Cards rojos con:
  - Total préstamos en mora
  - Monto total en mora
  - Días promedio de mora
- ✅ Distribución por rangos (1-30, 31-60, 61-90, >90 días)
- ✅ Tabla con préstamos morosos
- ✅ Alertas visuales (badges rojos)

#### Exportar
- Clic en "Exportar" y verificar CSV

### 7. Probar Estado de Cuenta

#### Generar Reporte
1. Clic en tarjeta "Estado de Cuenta"
2. Seleccionar una cuenta del dropdown
3. Seleccionar fecha inicio
4. Seleccionar fecha fin
5. Clic en "Generar"

#### Verificar Resultados
- ✅ Información de la cuenta:
  - Número de cuenta
  - Tipo
  - Cliente
  - Agencia
- ✅ Resumen:
  - Saldo inicial
  - Total créditos (verde)
  - Total débitos (rojo)
  - Saldo final
- ✅ Tabla de movimientos con:
  - Fecha, descripción, tipo, referencia
  - Débito/Crédito
  - Saldo

#### Exportar
- Clic en "Exportar" y verificar CSV

## Casos de Prueba Específicos

### Test 1: Sin Datos
**Objetivo**: Verificar comportamiento cuando no hay datos

1. Generar reporte de transacciones con fechas muy antiguas
2. **Esperado**: Mensaje "No hay transacciones registradas"

### Test 2: Fechas Inválidas
**Objetivo**: Validación de campos obligatorios

1. Intentar generar reporte sin seleccionar fechas
2. **Esperado**: Mensaje de error "Debe seleccionar fecha de inicio y fin"

### Test 3: Múltiples Filtros
**Objetivo**: Combinar varios filtros

1. Reporte de clientes:
   - Estado: activo
   - KYC: aprobado
   - Con cuentas: Sí
2. **Esperado**: Solo clientes que cumplan todos los criterios

### Test 4: Exportación
**Objetivo**: Verificar formato CSV

1. Generar cualquier reporte
2. Exportar a CSV
3. Abrir en Excel/LibreOffice
4. **Esperado**: 
   - Encabezados correctos
   - Datos formateados
   - Sin errores de codificación

### Test 5: Navegación entre Reportes
**Objetivo**: Cambiar entre reportes sin recargar

1. Generar reporte de transacciones
2. Cambiar a reporte de clientes
3. Generar reporte de clientes
4. Volver a transacciones
5. **Esperado**: Contenido se actualiza sin errores

## Verificaciones de Interfaz

### Visual
- ✅ Color corporativo #db8e5e presente
- ✅ Cards estadísticas con gradientes
- ✅ Badges de estado con colores apropiados
- ✅ Tablas responsive
- ✅ Iconos Bootstrap correctos

### Responsive
1. Reducir tamaño de ventana
2. **Verificar**:
   - ✅ Tablas se ajustan
   - ✅ Cards se apilan verticalmente
   - ✅ Filtros se reorganizan
   - ✅ Botones accesibles

### Interactividad
- ✅ Hover en tarjetas de selección
- ✅ Hover en filas de tabla
- ✅ Loading states visibles
- ✅ Transiciones suaves

## Problemas Conocidos y Soluciones

### Problema: "No hay transacciones"
**Causa**: Base de datos sin datos de prueba
**Solución**: Ejecutar scripts de prueba del backend

### Problema: Error 500 en reportes
**Causa**: Backend no está corriendo o error de permisos
**Solución**: 
1. Verificar que backend esté en puerto 3000
2. Verificar token de autenticación
3. Revisar permisos del usuario admin

### Problema: Fechas inválidas
**Causa**: Formato de fecha incorrecto
**Solución**: Usar formato YYYY-MM-DD en los inputs

### Problema: CSV no descarga
**Causa**: Bloqueador de popups o permisos del navegador
**Solución**: Permitir descargas desde localhost:8080

## Checklist de Prueba Completa

### Funcionalidad
- [ ] Login exitoso
- [ ] Navegación a reportes
- [ ] Generar reporte de transacciones
- [ ] Generar reporte de clientes
- [ ] Generar reporte de préstamos
- [ ] Generar reporte de morosidad
- [ ] Generar estado de cuenta
- [ ] Exportar cada tipo de reporte
- [ ] Aplicar filtros
- [ ] Cambiar entre reportes

### UI/UX
- [ ] Colores corporativos correctos
- [ ] Iconos apropiados
- [ ] Badges de estado
- [ ] Tablas responsive
- [ ] Cards estadísticas
- [ ] Botones funcionales
- [ ] Loading states

### Validación
- [ ] Campos obligatorios validados
- [ ] Mensajes de error claros
- [ ] Mensajes de éxito
- [ ] Manejo de casos sin datos

### Exportación
- [ ] CSV descarga correctamente
- [ ] Formato CSV válido
- [ ] Datos completos en CSV
- [ ] Nombre de archivo con fecha

## Métricas de Éxito

✅ **Criterios de Aceptación**:
- Todos los 5 reportes generan correctamente
- Filtros funcionan según especificación
- Exportación CSV funcional
- UI responsive y atractiva
- Sin errores en consola del navegador
- Mensajes de error/éxito apropiados

## Comandos Útiles

### Ver logs del backend
```bash
tail -f /home/lufi/Programacion/Bancavirtual/Backend/server.log
```

### Reiniciar backend
```bash
pkill -f "node server.js"
cd /home/lufi/Programacion/Bancavirtual/Backend
node server.js &
```

### Reiniciar frontend
```bash
pkill -f "python3 -m http.server"
cd /home/lufi/Programacion/Bancavirtual/Frontend
python3 -m http.server 8080 &
```

### Verificar puertos
```bash
netstat -tulpn | grep -E '(3000|8080)'
```

## Contacto y Soporte

Si encuentras algún problema durante las pruebas:
1. Verifica los logs del backend
2. Abre la consola del navegador (F12)
3. Revisa la pestaña Network para ver las peticiones
4. Documenta el error y los pasos para reproducirlo

---

**Última actualización**: 13 de Noviembre, 2025
**Versión**: 1.0
**Estado**: Listo para pruebas
