# API REST de Productos

API REST de ejemplo desarrollada con **Express**, **TypeScript** y **MySQL**, utilizada en un entorno **Docker** completamente containerizado.

> 💡 **Este es un proyecto de ejemplo** diseñado como **base educativa** para aprender o como punto de partida para tus propios proyectos.

## 📋 Descripción

Esta es una API REST que proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar productos. La aplicación está completamente containerizada usando Docker Compose, con dos servicios:
- **Aplicación** (Express/Node.js) en el puerto 4500
- **Base de datos** (MySQL 9.5) en el puerto 3306

### Características destacadas:
- ✅ **Arquitectura en capas** - Separación clara: Routes → Middlewares → Controllers → Services → Models
- ✅ **Estructura modular** - Organización por features (modules/Products)
- ✅ **Migrations controladas** - Sequelize CLI para gestionar cambios de schema
- ✅ **Seeders incluidos** - 10 productos de ejemplo para testing
- ✅ **Tests automatizados** - Jest + Supertest con patrón AAA (Arrange, Act, Assert)
- ✅ **Husky pre-commit** - Lint y tests antes de cada commit
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
   Si haces modificaciones debes reconstruir el contenedor
   ```bash
   docker compose up -d --build
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
   Detener los servicios y eliminar los volúmenes de datos
   ```bash
   docker compose down -v
   ```

### Localmente (sin Docker)

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   
   Crear archivo `.env` a partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   O editar manualmente el archivo `.env` con tus variables:
   ```
   PORT=4500
   DB_HOST=localhost
   DB_USER=gql
   DB_PASSWORD=gql2025
   DB_NAME=products
   DB_PORT=3306
   ```
   
   > **Nota:** En Docker Compose, las variables de entorno se definen automáticamente en el servicio `app` del archivo `docker-compose.yml`. Si haces pruebas locales, debes crear el archivo `.env`.

3. **Ejecutar migraciones**
   ```bash
   npm run migrate
   ```

4. **Ejecutar seeders (opcional - datos de ejemplo)**
   ```bash
   npm run seed
   ```

5. **Compilar el código TypeScript**
   ```bash
   npm run build
   ```

6. **Iniciar la aplicación**
   ```bash
   npm start
   ```

7. **Modo desarrollo con recarga automática**
   ```bash
   npm run watch
   ```

8. **Ejecutar tests**
   ```bash
   npm test
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
npm run migrate    # Ejecutar migraciones
npm run undo-migrate # Deshacer migraciones
npm run seed       # Ejecutar seeders (datos de ejemplo)
npm run undo-seed  # Deshacer seeders
npm test           # Ejecutar tests con Jest
```

## 🧪 Tests Automatizados

El proyecto incluye **tests completos** usando **Jest** y **Supertest** con el patrón **AAA (Arrange, Act, Assert)**:

**Cobertura de tests:**
- ✅ `GET /v1/products` - Obtener todos los productos
- ✅ `GET /v1/products/:id` - Obtener producto por ID
- ✅ `POST /v1/products` - Crear producto (casos exitosos y validaciones)
- ✅ `PUT /v1/products/:id` - Actualizar producto
- ✅ `DELETE /v1/products/:id` - Eliminar producto

**Ejecutar tests:**
```bash
npm test                    # Ejecutar todos los tests
npm test -- --watch        # Modo watch (rerun en cambios)
npm test -- --coverage     # Ver cobertura de tests
```

**Ejemplo de test:**
```typescript
describe("POST /v1/products", () => {
  test('should create a new product and respond with status 201', async () => {
    // Arrange
    const newProduct = { name: "Test", stock: 100, price: 19.99 };
    const expectedStatus = 201;
    
    // Act
    const resp = await testServer.post('/v1/products').send(newProduct);
    
    // Assert
    expect(resp.status).toBe(expectedStatus);
    expect(resp.body).toHaveProperty("id");
  });
});
```

> **Nota:** Los tests se ejecutan automáticamente antes de cada commit gracias a **Husky**.

## 📋 Migraciones con Sequelize

Las migraciones permiten versionar cambios en la base de datos de forma controlada y reproducible:

**Migración actual:**
- `sequelize/migrations/20251229081417-products.cjs` - Crea tabla Products con campos DECIMAL para precios

**Crear nueva migración:**
```bash
npx sequelize-cli migration:generate --name nombre-migracion
```

**Ejecutar migraciones:**
```bash
npm run migrate         # Aplicar migraciones pendientes
npm run undo-migrate   # Deshacer última migración
```

## 🌱 Seeders - Datos de Ejemplo

Los seeders permiten poblar la BD con datos iniciales para testing y desarrollo:

**Seeder actual:**
- `sequelize/seeders/20251229080542-first-products.cjs` - Inserta 10 productos de ejemplo

**Crear nuevo seeder:**
```bash
npx sequelize-cli seed:generate --name nombre-seeder
```

**Ejecutar seeders:**
```bash
npm run seed         # Ejecutar todos los seeders
npm run undo-seed   # Deshacer último seeder
```

> **Nota en Docker:** Los seeders se ejecutan automáticamente si no hay productos en la BD (verificado en `init.sh`).

## 📊 Stack Tecnológico

| Herramienta | Versión | Propósito |
|------------|---------|----------|
| **Express** | 5.2.1 | Framework web |
| **TypeScript** | 5.9.3 | Tipado de JavaScript |
| **Sequelize** | 6.37.7 | ORM para MySQL |
| **Jest** | 30.2.0 | Framework de testing |
| **Supertest** | 7.1.4 | Testing de APIs HTTP |
| **Husky** | 9.1.7 | Git hooks |
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
│   │   ├── database.ts      # Conexión y configuración de Sequelize
│   │   └── seed.ts         # Script para seedear la BD
│   ├── middlewares/         # Middlewares personalizados
│   │   ├── exampleSection.middleware.ts     # Ejemplo: middleware de sección
│   │   └── exampleEndpoint.middleware.ts    # Ejemplo: middleware de endpoint
│   ├── modules/             # Funcionalidades organizadas por feature (Domain-driven design)
│   │   └── Products/        # Módulo de Productos
│   │       ├── Products.controller.ts      # Manejador de request/response
│   │       ├── Products.route.V1.ts        # Definición de rutas V1
│   │       ├── products.model.ts           # Modelo Sequelize
│   │       ├── Services/                   # Lógica de negocio
│   │       │   ├── createProduct.ts
│   │       │   ├── getAllProducts.ts
│   │       │   ├── getProductById.ts
│   │       │   ├── updateProduct.ts
│   │       │   ├── deleteProduct.ts
│   │       │   ├── createTestProduct.ts    # Helper para tests
│   │       │   ├── deleteTestProduct.ts    # Limpieza de tests
│   │       │   └── index.ts
│   │       └── TestControllers/            # Tests de API
│   │           ├── GetAllProducts.test.ts
│   │           ├── GetProductById.test.ts
│   │           ├── CreateProduct.test.ts
│   │           ├── UpdateProduct.test.ts
│   │           └── DeleteProduct.test.ts
│   ├── Routes/              # Rutas de la aplicación
│   │   ├── index.ts         # Rutas principales
│   │   └── V1.ts            # Rutas V1
│   └── shared/              # Código compartido entre módulos
│       ├── types/           # Tipos TypeScript globales
│       └── utils/           # Utilidades (TestServer, etc)
│           └── TestServer.ts   # Servidor para tests
├── sequelize/                  # Configuración de migraciones y seeders
│   ├── config.cjs              # Configuración de BD por entorno
│   ├── migrations/             # Migraciones de BD
│   │   └── 20251229081417-products.cjs
│   └── seeders/                # Seeders para datos de ejemplo
│       └── 20251229080542-first-products.cjs
├── build/                    # Código compilado (generado por tsc)
├── coverage/                 # Reporte de cobertura de tests
├── .husky/                   # Configuración de Git hooks
│   ├── _/
│   └── pre-commit            # Hook: corre lint y tests
├── Dockerfile               # Configuración del contenedor
├── docker-compose.yml       # Definición de servicios (app + db)
├── .dockerignore            # Archivos ignorados en Docker build
├── .env.example             # Variables de entorno de ejemplo
├── .sequelizerc             # Configuración de Sequelize CLI
├── jest.config.ts          # Configuración de Jest
├── init.sh                 # Script de inicialización (Docker)
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
- Los tests se ejecutan automáticamente antes de cada commit (pre-commit hook)
- Las migraciones se aplican automáticamente al iniciar en Docker
- Los seeders se ejecutan si la BD no tiene datos

## ⚠️ Notas Importantes sobre Variables de Entorno

### En Docker Compose
- Las variables de entorno están **definidas en `docker-compose.yml`**
- Se aplican automáticamente al servicio `app`
- **No necesitas crear `.env`** para usar Docker

### Para desarrollo local (sin Docker)
- **Debes crear un archivo `.env`** en la raíz del proyecto
- Copia desde `.env.example`: `cp .env.example .env`
- Asegúrate de que MySQL esté corriendo en `localhost:3306`
- Luego ejecuta migraciones: `npm run migrate`

### Para ejecutar tests
- Los tests necesitan BD vacía o con datos de prueba
- Los tests se limpian automáticamente después de ejecutar (`afterAll`)
- Verifica que tienes MySQL corriendo localmente

## 🏱 Configuración Recomendada para Empezar

### Opción 1: Con Docker (Más fácil) 👋
```bash
# Simplemente:
docker compose up

# Los seeders se ejecutan automáticamente
# Accede a http://localhost:4500
```

### Opción 2: Localmente (Aprende más)
```bash
# 1. Asegúrate que MySQL corre: mysql -u root -p
# 2. Crea .env
cp .env.example .env

# 3. Instala dependencias
npm install

# 4. Ejecuta migraciones
npm run migrate

# 5. Seedea la BD
npm run seed

# 6. Inicia en modo watch
npm run watch

# 7. En otra terminal, ejecuta tests
npm test
```

## 📄 Licencia

ISC

---

## 👨‍💻 Créditos

**Código:** Hecho por **smukideejeah** 🎁 *Un regalo para cualquiera que lo quiera usar*

**README:** Documentación generada con IA

---

**Desarrollado con ❤️ en TypeScript y Express**
