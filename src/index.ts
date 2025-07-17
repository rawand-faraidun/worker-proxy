import { Env } from '@lib/types'
import { appendHeaders, cloneHeaders, removeHeaders } from '@lib/utils'

/**
 * worker api
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // url
      const url = new URL(request.url)
      const targetUrl = new URL(`${url.pathname}${url.search}`, env.PROXY_URL)

      // proxy request
      const proxyRequest = new Request(targetUrl, request)
      Object.entries(cloneHeaders).forEach(([key, value]) =>
        proxyRequest.headers.set(value, proxyRequest.headers.get(key) ?? request.headers.get(key) ?? '')
      )
      Object.entries(appendHeaders).forEach(([key, value]) => proxyRequest.headers.set(key, value))
      removeHeaders.forEach(item => proxyRequest.headers.delete(item))

      // proxy response
      const response = await fetch(proxyRequest)
      const proxyResponse = new Response(response.body, response)
      Object.entries(cloneHeaders).forEach(([key, value]) =>
        proxyResponse.headers.set(value, proxyResponse.headers.get(key) ?? request.headers.get(key) ?? '')
      )
      Object.entries(appendHeaders).forEach(([key, value]) => proxyResponse.headers.set(key, value))
      removeHeaders.forEach(item => proxyResponse.headers.delete(item))

      return proxyResponse
    } catch (error: any) {
      console.error({ message: error?.message, error })
      return new Response('Internal Server Error', { status: 500 })
    }
  }
}
