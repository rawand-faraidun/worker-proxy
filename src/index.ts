/**
 * worker api
 */
export default {
  async fetch(): Promise<Response> {
    return new Response('Hello world!', { status: 200 })
  }
}
