# 🚗 Garcillantas — Landing Page

> Sitio web corporativo y tienda en línea para **Garcillantas**, empresa especializada en la venta y servicio de llantas y neumáticos en Colombia.

---

## 📋 Descripción

Landing page dinámica con catálogo de productos, blog, servicios y servitecas, construida con **Astro 5**, integrada con **Contentful CMS** como fuente de contenido.

---

## ✨ Características principales

- 🔍 **Búsqueda avanzada de llantas** por medida, rin, marca y temporada
- 🛒 **Catálogo interactivo** con filtros, paginación y vista rápida de producto
- 📝 **Blog** administrado desde Contentful CMS
- 🏪 **Directorio de servitecas** con información de ubicación, horarios y servicios
- 🔧 **Páginas de servicios** con galería e información detallada
- 🎯 **Formulario de registro / CTA** con captura de leads en Astro DB
- 📍 **Mapa de estaciones de servicio** integrado
- 🔔 **WhatsApp flotante** con popup de contacto
- 📢 **Promociones dinámicas** desde CMS
- 🗺️ **Sitemap XML** y **robots.txt** optimizados para SEO

---

## 🏗️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Astro 5](https://astro.build) | Framework principal (SSR) |
| [Contentful](https://www.contentful.com) | CMS headless para productos, blog, servicios y servitecas |
| [Astro DB](https://docs.astro.build/en/guides/astro-db/) | Base de datos para registros de leads |
| TypeScript | Tipado estático en todo el proyecto |
| Vanilla CSS | Estilos sin dependencias externas |

---

## 📁 Estructura del proyecto

```text
/
├── db/
│   ├── config.ts          # Esquema de la tabla Registrations (Astro DB)
│   └── seed.ts            # Datos de prueba para desarrollo
├── public/
│   ├── fonts/             # Tipografías locales
│   ├── icons/             # Íconos SVG
│   ├── images/            # Imágenes estáticas
│   ├── videos/            # Videos de fondo
│   ├── documents/         # PDFs y fichas técnicas
│   ├── robots.txt         # Configuración para crawlers
│   ├── sitemap.xml        # Sitemap para SEO
│   └── site.webmanifest   # Metadatos PWA
├── src/
│   ├── assets/            # Assets procesados por Astro
│   ├── components/        # Componentes reutilizables (.astro)
│   │   ├── Hero.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   ├── QuickViewProduct.astro
│   │   ├── TireSearch.astro
│   │   ├── AdvancedSearch.astro
│   │   ├── CatalogFilters.astro
│   │   ├── ServiceStations.astro
│   │   ├── WhatsAppBtnPopup.astro
│   │   └── ... (38 componentes en total)
│   ├── content/           # Colecciones de contenido locales
│   ├── layouts/           # Layouts base de las páginas
│   ├── lib/
│   │   └── contentful.ts  # Cliente y tipos de Contentful
│   ├── pages/
│   │   ├── index.astro         # Página principal
│   │   ├── nosotros.astro      # Acerca de nosotros
│   │   ├── busqueda.astro      # Búsqueda global
│   │   ├── politica-de-datos.astro
│   │   ├── blog/               # Listado y detalle de artículos
│   │   ├── catalogo/           # Catálogo y detalle de productos
│   │   ├── servicios/          # Listado y detalle de servicios
│   │   ├── servitecas/         # Listado y detalle de servitecas
│   │   └── api/register/       # API endpoint para captura de leads
│   ├── styles/            # Estilos globales
│   └── types/             # Tipos TypeScript compartidos
├── astro.config.mjs       # Configuración de Astro + Vercel adapter
├── tsconfig.json
└── package.json
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=tu_space_id
CONTENTFUL_ACCESS_TOKEN=tu_delivery_access_token
CONTENTFUL_MANAGEMENT_TOKEN=tu_management_token  # solo para migraciones

# Astro DB (se configura automáticamente en Vercel)
ASTRO_DB_REMOTE_URL=tu_db_remote_url
ASTRO_DB_APP_TOKEN=tu_db_app_token
```

> **Nota:** Las variables `CONTENTFUL_SPACE_ID` y `CONTENTFUL_ACCESS_TOKEN` son **obligatorias** para arrancar el proyecto. Sin ellas, el servidor arrojará un error al iniciar.

---

## 🚀 Comandos disponibles

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` (modo remoto con Astro DB) |
| `npm run build` | Genera el build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run migrate` | Ejecuta migraciones de Contentful |
| `npm run astro ...` | Ejecuta comandos CLI de Astro (`astro add`, `astro check`, etc.) |

---

## 🗄️ Base de datos (Astro DB)

El proyecto usa **Astro DB** para almacenar registros de leads capturados mediante el formulario de la landing. La tabla `Registrations` contiene:

| Campo | Tipo | Descripción |
|---|---|---|
| `registerId` | `number` (PK) | ID autoincremental |
| `fullName` | `text` | Nombre completo |
| `email` | `text` | Correo electrónico |
| `phone` | `text` | Teléfono de contacto |
| `registrationDate` | `date` | Fecha de registro (default: `NOW`) |

---

## 📦 Modelos de Contentful

El CMS gestiona los siguientes tipos de contenido:

| Content Type | Descripción |
|---|---|
| `product` | Productos del catálogo con variantes (ancho, rin, precio, stock) |
| `tires` | Llantas con marca, diseño, tallas y rines disponibles |
| `pageBlogPost` | Artículos del blog con autor, imagen destacada y SEO |
| `services` | Servicios ofrecidos con galería, beneficios y ubicaciones |
| `serviceStation` | Servitecas con dirección, teléfono, horarios y mapa |
| `promotions` | Promociones activas con imagen y descripción |

---

## 🌐 Páginas del sitio

| Ruta | Descripción |
|---|---|
| `/` | Página principal con hero, catálogo destacado, servicios y CTA |
| `/catalogo` | Catálogo completo con filtros avanzados y paginación |
| `/catalogo/busqueda` | Búsqueda dentro del catálogo |
| `/catalogo/[slug]` | Detalle de producto |
| `/blog` | Listado de artículos del blog |
| `/blog/[slug]` | Artículo individual |
| `/servicios` | Listado de servicios |
| `/servicios/[serviceId]` | Detalle de servicio |
| `/servitecas` | Mapa y listado de servitecas |
| `/servitecas/[stationId]` | Detalle de serviteca |
| `/nosotros` | Página institucional |
| `/politica-de-datos` | Política de privacidad y datos |
| `/busqueda` | Búsqueda global del sitio |

---

## 🚢 Despliegue

El proyecto está configurado para desplegarse en **Vercel** usando el adaptador oficial de Astro:

1. Conecta el repositorio a un proyecto de Vercel.
2. Agrega las variables de entorno en el dashboard de Vercel.
3. Vercel detectará automáticamente Astro y usará el adaptador SSR.
4. Cada push a `main` desplegará automáticamente una nueva versión.

El sitio usa:
- **Vercel Analytics** — Métricas de visitas en tiempo real.
- **Speed Insights** — Monitoreo de Core Web Vitals.

---

## 🤝 Contribución

1. Haz un fork del repositorio.
2. Crea una rama descriptiva: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y confirma: `git commit -m 'feat: descripción del cambio'`
4. Envía tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto es de uso **privado y comercial** para Garcillantas. Todos los derechos reservados.

---

<p align="center">
  Hecho con ❤️ por <a href="https://www.aticux.com">Aticux S.A.S</a>
</p>
