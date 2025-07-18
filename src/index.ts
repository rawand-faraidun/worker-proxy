import { Env } from '@lib/types'
import { appendHeaders, removeHeaders } from '@lib/utils'

/**
 * worker api
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // url
      const url = new URL(request.url)
      const targetUrl = new URL(url.pathname, env.PROXY_URL)

      // proxy request
      const proxyRequest = new Request(targetUrl, request)
      Object.entries(appendHeaders).forEach(([key, value]) => proxyRequest.headers.set(key, value))
      removeHeaders.forEach(item => proxyRequest.headers.delete(item))

      // proxy response
      const response = await fetch(proxyRequest)
      const proxyResponse = new Response(response.body, response)
      Object.entries(appendHeaders).forEach(([key, value]) => proxyResponse.headers.set(key, value))

      return response
    } catch (error: any) {
      console.error({ message: error?.message, error })
      return new Response('Internal Server Error', { status: 500 })
    }
  }
}
