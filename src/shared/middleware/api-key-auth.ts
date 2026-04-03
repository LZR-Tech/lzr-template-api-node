import { createHash } from 'node:crypto'
import { FastifyRequest, FastifyReply } from 'fastify'
export interface ApiKeyContext { keyId: string; name: string; scopes: string[] }
export function hashApiKey(key: string): string { return createHash('sha256').update(key).digest('hex') }
export function createApiKeyAuth(
  lookupKey: (hash: string) => Promise<{ id: string; name: string; scopes: string[]; isActive: boolean; expiresAt: string | null } | null>,
  requiredScope?: string
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const apiKey = request.headers['x-api-key'] as string | undefined
    if (!apiKey) { reply.code(401).send({ error: 'X-API-Key header required' }); return }
    const record = await lookupKey(hashApiKey(apiKey))
    if (!record) { reply.code(401).send({ error: 'Invalid API key' }); return }
    if (!record.isActive) { reply.code(403).send({ error: 'API key deactivated' }); return }
    if (record.expiresAt && new Date(record.expiresAt) < new Date()) { reply.code(403).send({ error: 'API key expired' }); return }
    if (requiredScope && !record.scopes.includes('*') && !record.scopes.includes(requiredScope)) { reply.code(403).send({ error: 'Insufficient scope' }); return }
    ;(request as any).apiKey = { keyId: record.id, name: record.name, scopes: record.scopes } satisfies ApiKeyContext
  }
}
