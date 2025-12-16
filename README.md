# API REST de Productos

API REST de ejemplo desarrollada con **Express**, **TypeScript** y **MySQL**, utilizada en un entorno **Docker** completamente containerizado.

> 💡 **Este es un proyecto de ejemplo** diseñado como **base educativa** para aprender o como punto de partida para tus propios proyectos.

## 📋 Descripción

Esta es una API REST que proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar productos. La aplicación está completamente containerizada usando Docker Compose, con dos servicios:
- **Aplicación** (Express/Node.js) en el puerto 4500
- **Base de datos** (MySQL 9.5) en el puerto 3306

### Características destacadas:
- ✅ **Estructura modular y limpia** - Fácil de entender y modificar
- ✅ **Sin middlewares predefinidos** - Agrega los tuyos propios según necesites
- ✅ **Totalmente containerizado** - Funciona en cualquier máquina con Docker
- ✅ **TypeScript** - Código tipado y seguro
- ✅ **ORM Sequelize** - Interacción con MySQL de forma elegante

## 🏗️ Arquitectura

```
API REST (Express)
├── Routes/
│   └── V1/
│       └── /products (CRUD de productos)
├── Controllers/
│   └── Products.controller (Lógica de negocio)
├── Models/
│   └── Products (Modelo Sequelize)
└── Config/
    ├── Database (Conexión MySQL)
    └── Env (Variables de entorno)
```

## 📦 Requisitos

- Docker
- Docker Compose
- Node.js 24.11.1 (solo si se ejecuta localmente sin Docker)
- npm o yarn

## 🚀 Inicio Rápido

### Con Docker Compose (Recomendado)

1. **Clonar o descargar el proyecto**

2. **Ejecutar los servicios**
   ```bash
   docker compose up -d
   ```
   
   Esto levantará:
   - MySQL en `localhost:3306`
   - API REST en `localhost:4500`

3. **Verificar que la aplicación está corriendo**
   ```bash
   curl http://localhost:4500
   # Respuesta: "Hello World!"
   ```

4. **Detener los servicios**
   ```bash
   docker compose down
   ```

### Localmente (sin Docker)

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   
   Crear archivo `.env` en la raíz:
   ```
   PORT=4500
   DB_USER=gql
   DB_PASSWORD=gql2025
   DB_NAME=products
   DB_HOST=localhost
   DB_PORT=3306
   ```

3. **Compilar el código TypeScript**
   ```bash
   npm run build
   ```

4. **Iniciar la aplicación**
   ```bash
   npm start
   ```

5. **Modo desarrollo con recarga automática**
   ```bash
   npm run watch
   ```

## 🧩 Extensibilidad - Agrega tus Propios Middlewares

Este API **no incluye middlewares predefinidos** para que tengas total libertad de agregar los tuyos propios según tus necesidades. Aquí te muestran cómo hacerlo:

### Ejemplo: Agregar un middleware de autenticación

1. Crea un archivo `src/middlewares/auth.ts`:
```typescript
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // Validar token aquí...
  next();
}
```

2. Úsalo en tus rutas (`src/Routes/V1/Products.route.ts`):
```typescript
import { authMiddleware } from '../../middlewares/auth.js';

ProductsRoute.post('/', authMiddleware, createProduct);
```

### Middleware de logging ejemplo:
```typescript
export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path}`);
  next();
}
```

Luego en `src/index.ts`:
```typescript
import { loggingMiddleware } from './middlewares/logging.js';
app.use(loggingMiddleware);
```

## 🗄️ Variables de Entorno

Las variables se cargan desde el archivo `.env`:

| Variable | Valor por defecto | Descripción |
|----------|------------------|-------------|
| `PORT` | 3000 | Puerto de la aplicación |
| `DB_USER` | root | Usuario de MySQL |
| `DB_PASSWORD` | (vacío) | Contraseña de MySQL |
| `DB_NAME` | test | Nombre de la base de datos |
| `DB_HOST` | localhost | Host de MySQL |
| `DB_PORT` | 3306 | Puerto de MySQL |

## 📡 Endpoints de la API

### Base URL
```
http://localhost:4500
```

### Rutas disponibles

#### Raíz
- `GET /` → "Hello World!"
- `GET /v1` → "V1 API Root"

#### Productos (V1)
- `GET /v1/products` → Obtener todos los productos
- `GET /v1/products/:id` → Obtener producto por ID
- `POST /v1/products` → Crear nuevo producto
- `PUT /v1/products/:id` → Actualizar producto
- `DELETE /v1/products/:id` → Eliminar producto

### Modelo de Producto

```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 99.99,
  "stock": 50,
  "isActive": true
}
```

### Ejemplos de Uso

#### Obtener todos los productos
```bash
curl http://localhost:4500/v1/products
```

#### Crear un producto
```bash
curl -X POST http://localhost:4500/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 1299.99,
    "stock": 10
  }'
```

#### Obtener producto por ID
```bash
curl http://localhost:4500/v1/products/1
```

#### Actualizar producto
```bash
curl -X PUT http://localhost:4500/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Actualizada",
    "price": 1199.99,
    "stock": 8,
    "isActive": true
  }'
```

#### Eliminar producto
```bash
curl -X DELETE http://localhost:4500/v1/products/1
```

## 🔧 Scripts Disponibles

```bash
npm start          # Ejecutar la aplicación compilada
npm run build      # Compilar TypeScript a JavaScript
npm run watch      # Modo desarrollo con tsx watch
npm run lint       # Revisar código con ESLint
npm run lint:fix   # Corregir automáticamente problemas de ESLint
```

## 📊 Stack Tecnológico

| Herramienta | Versión | Propósito |
|------------|---------|----------|
| **Express** | 5.2.1 | Framework web |
| **TypeScript** | 5.9.3 | Tipado de JavaScript |
| **Sequelize** | 6.37.7 | ORM para MySQL |
| **MySQL** | 9.5 | Base de datos |
| **Cors** | 2.8.5 | Manejo de CORS |
| **Dotenv** | 17.2.3 | Gestión de variables de entorno |
| **ESLint** | 9.39.2 | Linter |
| **tsx** | 4.21.0 | Ejecución de TypeScript |

## 🐳 Estructura del Docker Compose

### Servicio `db` (MySQL)
- **Imagen:** mysql:9.5.0
- **Puerto:** 3306:3306
- **Usuario:** gql
- **Contraseña:** gql2025
- **Base de datos:** products
- **Volumen:** `mysql_data` (persistencia de datos)
- **Health Check:** Verifica conectividad cada 10 segundos

### Servicio `app` (Aplicación)
- **Build:** Dockerfile local
- **Puerto:** 4500:4500
- **Dependencia:** Espera a que MySQL esté saludable
- **Reinicio:** Automático en caso de fallo

## 📂 Estructura del Proyecto

```
graph02/
├── src/                      # Código fuente TypeScript
│   ├── index.ts             # Punto de entrada
│   ├── config/
│   │   ├── env.ts           # Gestor de variables de entorno
│   │   └── database.ts      # Conexión y configuración de Sequelize
│   ├── Controllers/
│   │   └── Products.controller.ts  # Lógica de negocio
│   ├── Models/
│   │   └── products.model.ts       # Definición del modelo
│   └── Routes/
│       ├── index.ts         # Rutas principales
│       └── V1/
│           ├── index.ts     # Rutas V1
│           └── Products.route.ts   # Rutas de productos
├── build/                    # Código compilado (generado)
├── Dockerfile               # Configuración del contenedor
├── docker-compose.yml       # Definición de servicios
├── package.json             # Dependencias del proyecto
├── tsconfig.json           # Configuración de TypeScript
├── eslint.config.ts        # Configuración de ESLint
└── README.md               # Este archivo
```

## 🔄 Flujo de Conexión a la Base de Datos

1. La aplicación se inicia en el puerto 4500
2. Se intenta conectar a MySQL (máx. 5 intentos con intervalo de 5 segundos)
3. Una vez conectado, Sequelize sincroniza el esquema (`alter: true`)
4. Las tablas se crean o actualizan automáticamente
5. La API queda lista para recibir solicitudes

## 🎓 Casos de Uso - Usa Este Proyecto Como Base

Este API es perfecto para:

### Aprendizaje
- 📚 Aprender patrones de arquitectura REST
- 📚 Entender cómo funciona Docker y Docker Compose
- 📚 Practicar TypeScript en un contexto real
- 📚 Trabajar con Sequelize y bases de datos MySQL
- 📚 Implementar operaciones CRUD

### Como Base para Tus Proyectos
- 🚀 Reemplaza el modelo `Products` con tu entidad (Users, Orders, etc.)
- 🚀 Agrega los middlewares que necesites (autenticación, validación, etc.)
- 🚀 Expande las rutas según tus requisitos
- 🚀 Personaliza los controladores con tu lógica de negocio
- 🚀 Mantén la estructura modular para fácil mantenimiento

## 🛑 Detención y Limpieza

```bash
# Detener los servicios
docker compose down

# Detener y eliminar volúmenes (elimina los datos de la BD)
docker compose down -v

# Ver logs de la aplicación
docker compose logs app

# Ver logs de la base de datos
docker compose logs db
```

## ⚙️ Configuración Adicional

### Para cambiar el puerto de la aplicación
En `docker-compose.yml`:
```yaml
ports:
  - "NUEVO_PUERTO:4500"  # Cambiar NUEVO_PUERTO
```

### Para cambiar las credenciales de MySQL
En `docker-compose.yml`:
```yaml
environment:
  - MYSQL_USER=nuevo_usuario
  - MYSQL_PASSWORD=nueva_contraseña
```

También actualizar en `src/config/env.ts` o en el archivo `.env`.

## 🐛 Solución de Problemas

### Error: `Cannot connect to database`
- Verifica que MySQL está corriendo: `docker compose ps`
- Revisa los logs: `docker compose logs db`
- Asegúrate de que el puerto 3306 está disponible

### Error: `Port 4500 already in use`
Cambiar el puerto en `docker-compose.yml` o detener el servicio que lo usa.

### Error en compilación TypeScript
Ejecuta `npm run lint:fix` para corregir problemas automáticamente.

## 📝 Notas

- El código se compila automáticamente con Docker
- Los datos de MySQL se persisten en un volumen Docker
- CORS está habilitado para todas las fuentes
- El logger de Sequelize está deshabilitado (configurable en `database.ts`)

## 📄 Licencia

ISC

---

## 👨‍💻 Créditos

**Código:** Hecho por **smukideejeah** 🎁 *Un regalo para cualquiera que lo quiera usar*

**README:** Documentación generada con IA

---

**Desarrollado con ❤️ en TypeScript y Express**
