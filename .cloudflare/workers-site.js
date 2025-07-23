// Este archivo se utiliza para configurar Workers cuando se despliega en Cloudflare Pages

import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * La función que maneja las solicitudes entrantes
 * @param {Request} request
 * @param {Object} env - Variables de entorno y bindings
 * @param {Object} ctx - Contexto de ejecución
 */
export default {
  async fetch(request, env, ctx) {
    try {
      // Obtener la URL de la solicitud
      const url = new URL(request.url)
      const pathname = url.pathname

      // Opciones para servir activos estáticos
      const options = {
        // Personalizar el comportamiento de caché
        cacheControl: {
          // Tiempo de caché en el navegador (en segundos)
          browserTTL: 60 * 60 * 24, // 1 día
          // Tiempo de caché en el edge (en segundos)
          edgeTTL: 60 * 60 * 24 * 7, // 7 días
          // Forzar a que los activos se sirvan desde el caché
          bypassCache: false,
        },
        // Personalizar el manejo de errores
        mapRequestToAsset: req => {
          // Servir index.html para rutas que no corresponden a archivos
          const url = new URL(req.url)
          if (!url.pathname.includes('.')) {
            url.pathname = '/index.html'
            return new Request(url.toString(), req)
          }
          return req
        },
      }

      // Servir el activo desde KV
      return await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      }, options)

    } catch (e) {
      // Si ocurre un error, devolver una respuesta de error
      return new Response('Error al servir el contenido: ' + e.message, {
        status: 500,
      })
    }
  },
}