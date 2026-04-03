import { FastifyRequest, FastifyReply, FastifyPluginCallback } from 'fastify'
interface RateLimitOptions { max: number; windowMs: number }
const requests = new Map<string, number[]>()
export const rateLimitPlugin: FastifyPluginCallback<RateLimitOptions> = (fastify, opts, done) => {
  const { max = 60, windowMs = 60000 } = opts
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    const key = request.ip
    const now = Date.now()
    const timestamps = (requests.get(key) ?? []).filter((t) => now - t < windowMs)
    if (timestamps.length >= max) { reply.code(429).send({ error: 'Rate limit exceeded' }); return }
    timestamps.push(now)
    requests.set(key, timestamps)
  })
  done()
}
