# API REST de Productos

API REST de ejemplo desarrollada con **Express**, **TypeScript** y **MySQL**, utilizada en un entorno **Docker** completamente containerizado.

> 💡 **Este es un proyecto de ejemplo** diseñado como **base educativa** para aprender o como punto de partida para tus propios proyectos.

## 📋 Descripción

Esta es una API REST que proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar productos. La aplicación está completamente containerizada usando Docker Compose, con dos servicios:
- **Aplicación** (Express/Node.js) en el puerto 4500
- **Base de datos** (MySQL 9.5) en el puerto 3306

### Características destacadas:
- ✅ **Arquitectura en capas** - Separación clara: Routes → Middlewares → Controllers → Services → Models
- ✅ **Capa de servicios** - Lógica de negocio separada de los controladores
- ✅ **Middlewares de ejemplo** - Incluye ejemplos funcionales para aprender
- ✅ **Totalmente containerizado** - Funciona en cualquier máquina con Docker
- ✅ **TypeScript** - Código tipado y seguro
- ✅ **ORM Sequelize** - Interacción con MySQL de forma elegante
- ✅ **Manejo de errores robusto** - Status codes y mensajes personalizados

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas** limpia y escalable:

```
API REST (Express)
├── Routes/              # Definición de endpoints
│   └── V1/
│       └── /products   # Rutas CRUD de productos
├── Middlewares/         # Middlewares personalizados (ejemplos incluidos)
│   ├── exampleSection  # Se aplica a toda una sección de rutas
│   └── exampleEndpoint # Se aplica a endpoints específicos
├── Controllers/         # Manejo de Request/Response
│   └── Products        # Validación y orquestación
├── Services/            # Lógica de negocio
│   └── Products/       # Operaciones CRUD encapsuladas
│       ├── create
│       ├── getAll
│       ├── getById
│       ├── update
│       └── delete
├── Models/              # Definición de esquemas
│   └── Products        # Modelo Sequelize
└── Config/              # Configuración
    ├── Database        # Conexión MySQL
    └── Env             # Variables de entorno
```

### Flujo de una petición:
1. **Route** recibe la petición
2. **Middleware** procesa/valida (opcional)
3. **Controller** valida entrada y coordina
4. **Service** ejecuta lógica de negocio
5. **Model** interactúa con la base de datos
6. **Controller** envía respuesta al cliente

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

## 🧩 Middlewares - Ejemplos Incluidos

El proyecto incluye **dos middlewares de ejemplo** para que veas cómo funcionan y puedas crear los tuyos:

### 1. Middleware de Sección (`exampleSection.middleware.ts`)
Se aplica a **todas las rutas** de una sección específica (ej: `/v1/products`):

```typescript
import { NextFunction, Request, Response } from "express";

export default async function(req: Request, res: Response, next: NextFunction){
    // Ejemplo: log del método y URL
    console.log("Example section middleware executed in: ", req.method, req.url);
    next();
}
```

**Uso en** [src/Routes/V1/index.ts](src/Routes/V1/index.ts):
```typescript
V1Router.use('/products', exampleSectionMiddleware, ProductsRoute);
```

### 2. Middleware de Endpoint (`exampleEndpoint.middleware.ts`)
Se aplica a **un endpoint específico** (ej: `GET /v1/products`):

```typescript
import { NextFunction, Request, Response } from "express";

export default async function(req: Request, res: Response, next: NextFunction){
    // Ejemplo: log del acceso con timestamp
    console.log(`Example endpoint accessed at ${new Date().toISOString()}`);
    next();
}
```

**Uso en** [src/Routes/V1/Products.route.ts](src/Routes/V1/Products.route.ts):
```typescript
ProductsRoute.get('/', exampleEndpointMiddleware, getAllProducts);
```

### Crea tus propios Middlewares

Puedes agregar middlewares para:
- 🔐 **Autenticación**: Validar JWT, API keys, sesiones
- ✅ **Validación**: Verificar estructura de datos con Zod, Joi, etc.
- 📝 **Logging**: Registrar requests, errores, métricas
- 🚦 **Rate Limiting**: Limitar peticiones por IP/usuario
- 🛡️ **Seguridad**: Helmet, CORS personalizado, sanitización

**Ejemplo de middleware de autenticación:**
```typescript
// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // Validar token aquí (JWT, API Key, etc.)
  try {
    // const decoded = jwt.verify(token, SECRET);
    // req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
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
│   ├── index.ts             # Punto de entrada de la aplicación
│   ├── config/              # Configuración
│   │   ├── env.ts           # Gestor de variables de entorno
│   │   └── database.ts      # Conexión y configuración de Sequelize
│   ├── middlewares/         # Middlewares personalizados
│   │   ├── exampleSection.middleware.ts     # Ejemplo: middleware de sección
│   │   └── exampleEndpoint.middleware.ts    # Ejemplo: middleware de endpoint
│   ├── Routes/              # Definición de rutas
│   │   ├── index.ts         # Rutas principales
│   │   └── V1/
│   │       ├── index.ts     # Rutas V1 (con middleware de sección)
│   │       └── Products.route.ts   # Endpoints de productos
│   ├── Controllers/         # Coordinación y validación
│   │   └── Products.controller.ts  # Maneja req/res de productos
│   ├── services/            # Lógica de negocio
│   │   └── products/        # Servicios de productos
│   │       ├── getAllProducts.ts   # Obtener todos los productos
│   │       ├── getProductById.ts   # Obtener producto por ID
│   │       ├── createProduct.ts    # Crear nuevo producto
│   │       ├── updateProduct.ts    # Actualizar producto
│   │       └── deleteProduct.ts    # Eliminar producto
│   └── models/              # Modelos de datos
│       └── products.model.ts       # Definición del modelo Product
├── build/                    # Código compilado (generado por tsc)
├── Dockerfile               # Configuración del contenedor
├── docker-compose.yml       # Definición de servicios (app + db)
├── .dockerignore            # Archivos ignorados en Docker build
├── package.json             # Dependencias del proyecto
├── tsconfig.json           # Configuración de TypeScript
├── eslint.config.ts        # Configuración de ESLint
└── README.md               # Este archivo
```

### Ventajas de esta estructura:
- 🎯 **Separación de responsabilidades**: Cada capa tiene un propósito claro
- 🧪 **Fácil de testear**: Los servicios se pueden testear independientemente
- 🔧 **Mantenible**: Cambios en una capa no afectan a las demás
- 📈 **Escalable**: Agregar nuevos recursos es simple y consistente

## 🔄 Flujo de Conexión a la Base de Datos

1. La aplicación se inicia en el puerto 4500
2. Se intenta conectar a MySQL (máx. 5 intentos con intervalo de 5 segundos)
3. Una vez conectado, Sequelize sincroniza el esquema (`alter: true`)
4. Las tablas se crean o actualizan automáticamente
5. La API queda lista para recibir solicitudes

> Nota: `alter: true` en `sequelize.sync()` está activado para aprendizaje y desarrollo. No lo uses en producción porque puede alterar esquemas en caliente y bloquear tablas; usa migraciones controladas en su lugar.

## 🎓 Casos de Uso - Usa Este Proyecto Como Base

Este API es perfecto para:

### Aprendizaje
- 📚 Aprender **arquitectura en capas** y separación de responsabilidades
- 📚 Entender cómo funciona **Docker y Docker Compose**
- 📚 Practicar **TypeScript** en un contexto real
- 📚 Trabajar con **Sequelize** ORM y bases de datos MySQL
- 📚 Implementar operaciones **CRUD** completas
- 📚 Aprender a crear y usar **middlewares** en Express
- 📚 Ver **patrones de diseño** en acción (Service Layer, Controller)

### Como Base para Tus Proyectos
- 🚀 **Duplica la estructura** para nuevos recursos (ej: Users, Orders)
- 🚀 **Reemplaza el modelo** `Products` con tus propias entidades
- 🚀 **Agrega middlewares** personalizados (autenticación, validación, rate limiting)
- 🚀 **Expande los servicios** con lógica de negocio compleja
- 🚀 **Agrega validaciones** con Zod, Joi o class-validator
- 🚀 **Integra testing** (Jest, Supertest) manteniendo la estructura
- 🚀 **Mantén la arquitectura limpia** al escalar tu proyecto

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
