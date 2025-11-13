# 🎨 FRONTEND - BANCO VIRTUAL

## 📁 Estructura del Proyecto

```
Frontend/
├── index.html                    # Página de login
├── shared/                       # Recursos compartidos
│   ├── css/                     # Estilos globales
│   ├── js/                      # Scripts compartidos (api.js, auth.js, utils.js)
│   └── img/                     # Imágenes y logos
│
├── admin/                        # SECCIÓN ADMINISTRADOR
│   ├── dashboard.html           # Dashboard principal admin
│   ├── css/                     # Estilos específicos admin
│   ├── js/                      # Scripts admin
│   ├── usuarios/                # Gestión de usuarios
│   ├── clientes/                # Gestión de clientes
│   ├── cuentas/                 # Gestión de cuentas
│   ├── prestamos/               # Gestión de préstamos
│   ├── transferencias/          # Gestión de transferencias
│   ├── parametros/              # Parámetros del sistema
│   ├── permisos/                # Gestión de permisos
│   └── reportes/                # Reportes y estadísticas
│
└── cliente/                      # SECCIÓN CLIENTE
    ├── dashboard.html           # Dashboard principal cliente
    ├── css/                     # Estilos específicos cliente
    ├── js/                      # Scripts cliente
    ├── depositar/               # Realizar depósitos
    ├── retirar/                 # Realizar retiros
    ├── pagar/                   # Realizar pagos
    ├── movimientos/             # Ver historial
    └── perfil/                  # Ver/editar perfil
```

## 🔐 Autenticación

El sistema de autenticación valida credenciales con el backend y redirige según el rol del usuario:
- **Admin** → `/admin/dashboard.html`
- **Cliente** → `/cliente/dashboard.html`

## 🛠️ Tecnologías

- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript Vanilla
- Fetch API

## 🚀 Inicio

1. Abrir `index.html` en el navegador
2. Asegurarse de que el backend esté corriendo en `http://localhost:3000`

## 📚 Credenciales de Prueba

Ver archivo `CREDENCIALES.md` en la raíz del proyecto.
