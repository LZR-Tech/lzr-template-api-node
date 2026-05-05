# lzr-template-api-node

Template oficial para APIs em **TypeScript/Node** da LZR Technologies.

Baseado no [Engineering Handbook v2.3](https://code.lzrtechnologies.com).

## Stack

| Tecnologia | Função |
|------------|--------|
| **TypeScript** | Linguagem (strict mode, zero any) |
| **Fastify** | Framework HTTP |
| **Zod** | Validação de schemas |
| **Pino** | Logging estruturado (JSON) |
| **Vitest** | Testes unitários e integração (cobertura ≥80%) |
| **ESLint + Prettier** | Linting e formatação (@lzr/configs) |
| **CommitLint + Husky + lint-staged** | Conventional commits + hooks ativos |
| **pnpm** | Package manager (padrão LZR) |

## Quick Start

### 1. Criar projeto a partir deste template

Recomendado: use `/new-project <nome> api` no Claude Code para automatizar todos os passos abaixo.

Manualmente:

```bash
gh repo create meu-projeto --template LZR-Tech/lzr-template-api-node --private --clone
cd meu-projeto
```

### 2. Instalar dependências

```bash
pnpm install
```

> **Pré-requisitos**: Node.js >= 20 e pnpm >= 9. Instale o pnpm com `corepack enable` (recomendado) ou `npm i -g pnpm`.

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
# Edite .env.local com suas configurações
```

### 4. Rodar em desenvolvimento

```bash
pnpm dev
# Server running on http://0.0.0.0:3000
```

### 5. Verificar

```bash
curl http://localhost:3000/api/v1/health
```

## Estrutura de pastas

```
src/
├── config/          # Configurações (env, logger)
│   ├── env.ts       # Validação de env vars (Zod)
│   └── logger.ts    # Logger estruturado (Pino)
├── features/        # Features organizadas por domínio
│   └── health/      # Exemplo: health check
│       ├── health.controller.ts
│       └── index.ts
├── shared/          # Código compartilhado
│   ├── middleware/   # Middlewares globais
│   │   └── error-handler.ts  # RFC 9457
│   ├── types/        # Types globais
│   │   ├── error.ts  # AppError + Problem Details
│   │   ├── result.ts # Result Pattern
│   │   └── index.ts
│   └── utils/        # Utilitários
└── index.ts          # Entry point (bootstrap)
```

## Criando uma nova feature

```bash
mkdir -p src/features/companies
```

```
src/features/companies/
├── companies.controller.ts   # Rotas
├── companies.service.ts      # Lógica de negócio
├── companies.types.ts        # Types e schemas Zod
├── companies.validation.ts   # Validações de input
├── __tests__/                # Testes da feature
│   └── companies.test.ts
└── index.ts                  # Barrel export
```

## Padrões do Handbook

| Padrão | Implementação |
|--------|---------------|
| **Zero any** | TSConfig strict + ESLint rule |
| **Result Pattern** | `ok(data)` / `fail(error)` em `shared/types` |
| **RFC 9457** | Error handler retorna Problem Details |
| **Zod validation** | Todo input externo validado |
| **Structured logging** | Pino JSON com trace_id |
| **Feature-based** | Código organizado por domínio |
| **Barrel exports** | `index.ts` em cada feature |

## Git Hooks (Husky)

Os hooks vêm ativos por padrão neste template:

| Hook | O que roda |
|------|-----------|
| `pre-commit` | `lint-staged` (ESLint + Prettier nos arquivos staged) |
| `commit-msg` | `commitlint` (Conventional Commits) |
| `pre-push` | `pnpm typecheck && pnpm test` |

Em primeira instalação, `pnpm install` já executa `prepare: husky` automaticamente.

## Scripts

| Script | O que faz |
|--------|-----------|
| `pnpm dev` | Dev server com hot reload |
| `pnpm build` | Compila TypeScript |
| `pnpm start` | Roda build em produção |
| `pnpm typecheck` | Verifica tipos |
| `pnpm lint` | Roda ESLint |
| `pnpm lint:fix` | ESLint com auto-fix |
| `pnpm format` | Prettier auto-format |
| `pnpm format:check` | Prettier dry-run |
| `pnpm test` | Roda testes |
| `pnpm test:watch` | Vitest em watch mode |
| `pnpm test:coverage` | Testes com cobertura (≥80%) |

## Referência

- [LZR Engineering Handbook v2.3](https://code.lzrtechnologies.com)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)
