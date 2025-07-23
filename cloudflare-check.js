#!/usr/bin/env node

/**
 * Script para verificar la configuración de Cloudflare
 * Este script valida que todos los archivos de configuración necesarios
 * estén presentes y correctamente configurados.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = process.cwd();
const REQUIRED_FILES = [
  'wrangler.jsonc',
  '.cloudflare/workers-site.js',
  '.cloudflare/pages.json',
  '.cloudflare/pages.toml',
  '.cloudflare/dns-config.json',
  'package.json',
  'index.html',
  '_headers',
  '_redirects',
  'robots.txt',
  'sitemap.xml'
];

console.log('🔍 Verificando configuración de Cloudflare Pages...');

// Verificar archivos requeridos
let missingFiles = [];
for (const file of REQUIRED_FILES) {
  const filePath = path.join(BASE_DIR, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error('❌ Faltan los siguientes archivos requeridos:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

// Verificar configuración de wrangler.jsonc
try {
  const wranglerContent = fs.readFileSync(path.join(BASE_DIR, 'wrangler.jsonc'), 'utf8');
  const wranglerConfig = JSON.parse(wranglerContent.replace(/\/\/.*/g, ''));
  
  if (!wranglerConfig.main || !wranglerConfig.main.includes('workers-site.js')) {
    console.error('❌ El archivo wrangler.jsonc no tiene configurado correctamente el punto de entrada (main).');
    process.exit(1);
  }
  
  if (!wranglerConfig.assets || !wranglerConfig.assets.directory) {
    console.error('❌ El archivo wrangler.jsonc no tiene configurado correctamente el directorio de assets.');
    process.exit(1);
  }
  
  if (!wranglerConfig.site || !wranglerConfig.site.bucket) {
    console.error('❌ El archivo wrangler.jsonc no tiene configurado correctamente el bucket del sitio.');
    process.exit(1);
  }
  
  if (!wranglerConfig.custom_domain || wranglerConfig.custom_domain !== 'consulta.amarredeamorfuertes.com') {
    console.warn('⚠️ El dominio personalizado no está configurado correctamente en wrangler.jsonc.');
  } else {
    console.log('✅ Dominio personalizado configurado correctamente en wrangler.jsonc.');
  }
  
  console.log('✅ Configuración de wrangler.jsonc correcta.');
} catch (error) {
  console.error(`❌ Error al verificar wrangler.jsonc: ${error.message}`);
  process.exit(1);
}

// Verificar package.json
try {
  const packageContent = fs.readFileSync(path.join(BASE_DIR, 'package.json'), 'utf8');
  const packageConfig = JSON.parse(packageContent);
  
  if (!packageConfig.dependencies || !packageConfig.dependencies['@cloudflare/kv-asset-handler']) {
    console.warn('⚠️ El archivo package.json no tiene la dependencia @cloudflare/kv-asset-handler.');
  }
  
  if (!packageConfig.scripts || !packageConfig.scripts.deploy) {
    console.warn('⚠️ El archivo package.json no tiene configurado el script de deploy.');
  }
  
  console.log('✅ Configuración de package.json correcta.');
} catch (error) {
  console.error(`❌ Error al verificar package.json: ${error.message}`);
  process.exit(1);
}

// Verificar workers-site.js
try {
  const workerContent = fs.readFileSync(path.join(BASE_DIR, '.cloudflare', 'workers-site.js'), 'utf8');
  if (!workerContent.includes('getAssetFromKV')) {
    console.warn('⚠️ El archivo workers-site.js podría no estar configurado correctamente.');
  }
  
  console.log('✅ Configuración de workers-site.js correcta.');
} catch (error) {
  console.error(`❌ Error al verificar workers-site.js: ${error.message}`);
  process.exit(1);
}

// Verificar robots.txt y sitemap.xml para el dominio personalizado
try {
  console.log('🔍 Verificando archivos SEO para el dominio personalizado...');
  
  const robotsContent = fs.readFileSync(path.join(BASE_DIR, 'robots.txt'), 'utf8');
  if (!robotsContent.includes('consulta.amarredeamorfuertes.com')) {
    console.warn('⚠️ El archivo robots.txt no está configurado para el dominio personalizado.');
  } else {
    console.log('✅ Archivo robots.txt configurado correctamente para el dominio personalizado.');
  }
  
  const sitemapContent = fs.readFileSync(path.join(BASE_DIR, 'sitemap.xml'), 'utf8');
  if (!sitemapContent.includes('consulta.amarredeamorfuertes.com')) {
    console.warn('⚠️ El archivo sitemap.xml no está configurado para el dominio personalizado.');
  } else {
    console.log('✅ Archivo sitemap.xml configurado correctamente para el dominio personalizado.');
  }
} catch (error) {
  console.error(`❌ Error al verificar archivos SEO: ${error.message}`);
}

// Verificar si wrangler está instalado
try {
  console.log('🔍 Verificando instalación de wrangler...');
  execSync('npx wrangler --version', { stdio: 'ignore' });
  console.log('✅ Wrangler está disponible a través de npx.');
} catch (error) {
  console.warn('⚠️ Wrangler no está disponible. Considera instalarlo con: npm install -g wrangler');
}

console.log('\n🎉 Verificación completada. El proyecto está listo para ser desplegado en Cloudflare Pages.');
console.log('\n📋 Comandos disponibles:');
console.log('   - npm run deploy       # Desplegar usando el script automatizado');
console.log('   - ./deploy.sh         # Desplegar directamente con el script');
console.log('   - npx wrangler deploy --assets=./ # Desplegar manualmente con wrangler');