# LZR API Template — Instruções para IA

> **Engineering Handbook v2.3** — Toda alteração de regra segue `governance.md` (versionar → propagar → enforcement)
> Este arquivo é lido automaticamente pelo Claude Code antes de qualquer tarefa.

## Idioma
- **SEMPRE** responder em português brasileiro (pt-BR)
- Código e nomes de variáveis em inglês

## Referências autoritativas

| Documento | URL | O que define |
|-----------|-----|-------------|
| **Engineering Handbook v2.3** | https://code.lzrtechnologies.com | Arquitetura, padrões de código, CI/CD, segurança, governança |

Em caso de dúvida entre o que está no código e o que está nesses documentos, **o documento vence**.

---

## Tooling LZR (v2.3)

- **Package manager**: `pnpm` (nunca `npm` ou `yarn`) — o lockfile é `pnpm-lock.yaml`
- **Node**: `>=20.0.0`
- **Git hooks ativos** via Husky:
  - `pre-commit`: `lint-staged` (ESLint + Prettier nos arquivos staged)
  - `commit-msg`: `commitlint` (Conventional Commits)
  - `pre-push`: `pnpm typecheck && pnpm test`
- **Gate zero-warnings** antes de qualquer commit/PR: `pnpm typecheck && pnpm lint && pnpm test && pnpm build` precisam terminar com **0 erros e 0 warnings**

## Stack

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| fastify | ^5 | Framework HTTP |
| zod | ^3 | Validação |
| pino | ^9 | Logging estruturado |
| typescript | ^5.6 | Linguagem |
| vitest | ^2 | Testes |

---

## Arquitetura

### Estrutura de pastas (feature-based)
```
src/
├── features/
│   ├── bids/
│   │   ├── bids.service.ts
│   │   ├── bids.controller.ts
│   │   ├── bids.types.ts
│   │   ├── bids.validation.ts
│   │   └── __tests__/
│   └── companies/
├── shared/
│   ├── utils/
│   ├── types/
│   └── middleware/
├── config/
└── index.ts
```

### Padrões obrigatórios

- **Result Pattern** — `ok(data)` / `fail(error)`, nunca throw para erros de negócio
- **Zod** para validação de toda entrada externa (API, forms, env vars)
- **RFC 9457** para respostas de erro
- **Logging estruturado** via Pino (JSON, com trace_id, tenant_id)
- **Zero `any`** — usar `unknown` + type guard

### TypeScript
- `strict: true` — sem exceções
- Named exports (nunca default)
- Barrel exports por feature (`index.ts`)

### Commits
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `security:`

---

## Regras de código

- **JSDoc obrigatório** em métodos públicos de service
- **Comentários explicativos** — decisões de arquitetura, trade-offs, workarounds, regras de negócio
- **Paginação obrigatória** — todo `getAll()` usa `.limit()` ou paginação cursor-based
- **Testes** — feature nova = teste novo
- **Segurança** — NUNCA logar senhas, tokens, CPF/CNPJ. Variáveis sensíveis em `.env.local`

---

## Governança de Regras (v2.3)

**REGRA PERPÉTUA**: Toda criação/edição/remoção de regra DEVE ser refletida em TODAS as fontes (7 passos).

> Referência: `Elementos-reutilizaveis/knowledge/frontend/governance.md`
