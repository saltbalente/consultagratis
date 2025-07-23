# Consulta Gratis - Landing Page

## Descripción
Landing page para consultas gratuitas con enlaces de WhatsApp.

## Despliegue en Cloudflare Pages

### Requisitos previos
- Cuenta en Cloudflare
- Node.js instalado
- Dominio configurado en Cloudflare (para usar dominio personalizado)

### Solución al error "Missing entry-point to Worker script or to assets directory"

Si encuentras este error al desplegar en Cloudflare:
```
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

Este proyecto ya incluye la configuración necesaria para resolver este problema:

1. El archivo `wrangler.jsonc` está configurado con:
   - `main` establecido a `./.cloudflare/workers-site.js` (punto de entrada del Worker)
   - `assets.directory` establecido a `./` (directorio de assets)
   - `site.bucket` establecido a `./` (directorio raíz del sitio)
   - `site.entry-point` establecido a `./index.html` (página principal)

2. El archivo `.cloudflare/workers-site.js` proporciona la configuración avanzada para el Worker que maneja las solicitudes y sirve los archivos estáticos.

3. El archivo `.cloudflare/pages.toml` configura el entorno de compilación para Cloudflare Pages.

4. El archivo `package.json` incluye la dependencia `@cloudflare/kv-asset-handler` necesaria para el Worker.

### Pasos para desplegar

#### Opción 1: Despliegue directo desde GitHub
1. Inicia sesión en tu cuenta de Cloudflare
2. Ve a la sección "Pages"
3. Haz clic en "Create a project"
4. Selecciona "Connect to Git"
5. Conecta tu repositorio de GitHub y selecciona el repositorio "consultagratis"
6. En la configuración de compilación:
   - Deja el comando de compilación como `npm run build` (o déjalo en blanco)
   - Establece el directorio de salida como `/`
   - En "Environment variables" (opcional), puedes agregar `NODE_VERSION=18.0.0`
7. Haz clic en "Save and Deploy"
8. Para configurar el dominio personalizado:
   - Ve a la sección "Custom domains" del proyecto
   - Haz clic en "Set up a custom domain"
   - Ingresa `consulta.amarredeamorfuertes.com` y sigue las instrucciones

#### Opción 2: Despliegue usando Wrangler CLI
1. **Instalar dependencias**
   ```bash
   npm install
   ```
   
   O instalar Wrangler globalmente:
   ```bash
   npm install -g wrangler
   ```

2. **Iniciar sesión en Cloudflare**
   ```bash
   npx wrangler login
   ```
   
   O si lo instalaste globalmente:
   ```bash
   wrangler login
   ```

3. **Desplegar el sitio**
   ```bash
   npm run deploy
   ```
   
   Este comando ejecuta el script `deploy.sh` que automatiza todo el proceso de despliegue, incluyendo:
   - Verificación de dependencias
   - Instalación de paquetes necesarios
   - Verificación de autenticación en Cloudflare
   - Despliegue con la configuración correcta
   
   Alternativamente, puedes usar:
   ```bash
   npm run deploy:wrangler
   ```
   
   O directamente con Wrangler especificando el directorio de assets:
   ```bash
   npx wrangler deploy --assets=./
   ```

### Configuración del dominio personalizado

Este proyecto está configurado para desplegarse en el dominio personalizado `consulta.amarredeamorfuertes.com`. Para configurar este dominio:

1. **Configuración DNS en Cloudflare**
   - Asegúrate de que el dominio `amarredeamorfuertes.com` esté configurado en tu cuenta de Cloudflare
   - Agrega un registro CNAME con la siguiente configuración:
     - Tipo: `CNAME`
     - Nombre: `consulta`
     - Contenido: `consultagratis.pages.dev` (o el dominio asignado por Cloudflare Pages)
     - Proxy activado (nube naranja)

2. **Verificación del dominio en Cloudflare Pages**
   - En tu proyecto de Cloudflare Pages, ve a la sección "Custom domains"
   - Haz clic en "Set up a custom domain"
   - Ingresa `consulta.amarredeamorfuertes.com`
   - Sigue las instrucciones para verificar la propiedad del dominio

3. **Archivos ya configurados para el dominio personalizado**
   - `wrangler.jsonc`: Incluye `custom_domain` y `route` configurados para el dominio
   - `_redirects`: Contiene reglas de redirección específicas para el dominio
   - `robots.txt` y `sitemap.xml`: Actualizados para usar el dominio personalizado

> **Nota**: El archivo `.cloudflare/dns-config.json` contiene la configuración DNS recomendada para referencia.

### Archivos de configuración

- **package.json**: Configuración de npm y scripts
  - Scripts disponibles:
    - `npm start`: Inicia un servidor local en el puerto 8000
    - `npm run deploy`: Despliega el sitio en Cloudflare Pages
    - `npm run preview`: Inicia un servidor de vista previa local usando Wrangler
    - `npm run check`: Verifica la configuración de Cloudflare
  - Dependencias de desarrollo: wrangler

- **wrangler.jsonc**: Configuración principal para Wrangler
  - Nombre del proyecto: `consultagratis`
  - Directorio de assets: `./` (directorio raíz)
  - Fecha de compatibilidad: `2025-07-23`
  - Dominio personalizado: `consulta.amarredeamorfuertes.com`

- **.cloudflare/pages.json**: Configuración específica para Cloudflare Pages
  - No requiere comando de construcción
  - Directorio de publicación: directorio raíz

- **_headers**: Configuración de encabezados HTTP
  - Encabezados de seguridad (CSP, X-Frame-Options, etc.)
  - Configuración de caché para diferentes tipos de archivos

- **_redirects**: Configuración de redirecciones
  - Redirección de HTTP a HTTPS
  - Redirección de www a non-www

## Estructura del proyecto

### Archivos principales
- `index.html`: Página principal
- `styles.css`: Estilos principales
- `whatsapp-fix.css`: Correcciones específicas para los iconos de WhatsApp
- `script.js`: JavaScript del sitio
- Imágenes y recursos multimedia

### Archivos de configuración
- `package.json`: Configuración de npm y scripts
- `wrangler.jsonc`: Configuración para Cloudflare Wrangler con entry-point y assets
- `.cloudflare/pages.json`: Configuración específica para Cloudflare Pages
- `.cloudflare/pages.toml`: Configuración adicional para Cloudflare Pages
- `.cloudflare/workers-site.js`: Configuración avanzada para Workers en Cloudflare Pages
- `.cloudflare/dns-config.json`: Configuración DNS para el dominio personalizado
- `deploy.sh`: Script de automatización para el despliegue en Cloudflare Pages
- `cloudflare-check.js`: Script para verificar la configuración de Cloudflare
- `.gitignore`: Archivos y directorios ignorados por Git
- `.gitattributes`: Configuración de atributos de Git para manejo de archivos

### Archivos SEO y rendimiento
- `robots.txt`: Instrucciones para robots de motores de búsqueda
- `sitemap.xml`: Mapa del sitio para motores de búsqueda
- `_headers`: Configuración de encabezados HTTP
- `_redirects`: Configuración de redirecciones

## Contacto
Número de WhatsApp para consultas: +13033068798