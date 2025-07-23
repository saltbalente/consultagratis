#!/bin/bash

# Script para desplegar el sitio en Cloudflare Pages

echo "🚀 Iniciando despliegue en Cloudflare Pages..."
echo "📝 Dominio configurado: consulta.amarredeamorfuertes.com"

# Verificar la configuración antes de desplegar
echo "🔍 Verificando la configuración..."
node ./cloudflare-check.js

# Verificar si la verificación fue exitosa
if [ $? -ne 0 ]; then
    echo "❌ La verificación de configuración falló. Corrige los errores antes de continuar."
    echo "   Puedes ejecutar 'npm run check' para ver los detalles."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado. Por favor, instala Node.js y npm."
    exit 1
fi

# Verificar si wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "⚙️ Wrangler no está instalado globalmente. Usando npx..."
    WRANGLER_CMD="npx wrangler"
else
    WRANGLER_CMD="wrangler"
fi

# Instalar dependencias si node_modules no existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar si el usuario está autenticado en Cloudflare
echo "🔑 Verificando autenticación en Cloudflare..."
$WRANGLER_CMD whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "🔒 Iniciando sesión en Cloudflare..."
    $WRANGLER_CMD login
fi

# Desplegar el sitio
echo "🌩️ Desplegando el sitio en Cloudflare Pages..."
$WRANGLER_CMD deploy --assets=./

if [ $? -eq 0 ]; then
    echo "✅ ¡Despliegue completado con éxito!"
    echo "🌐 Tu sitio estará disponible en https://consultagratis.pages.dev"
else
    echo "❌ Error durante el despliegue. Revisa los mensajes anteriores."
fi