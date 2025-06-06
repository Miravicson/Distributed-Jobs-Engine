FROM node:22-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN node --version && \
  npm --version && \
  pnpm --version

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME

RUN apt-get update && apt-get install -y openssl

FROM base AS builder

WORKDIR /workspace

COPY package.json ./
COPY pnpm*.yaml ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY eslint.config.mjs ./
COPY webpack.*.config.js ./


COPY apps/auth ./apps/auth
COPY libs/graphql ./libs/graphql
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/prisma ./libs/prisma

RUN pnpm install --frozen-lockfile

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx build auth


FROM base AS runner

WORKDIR /app

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/auth/package.json ./apps/auth/package.json
COPY --from=builder /workspace/libs/graphql/package.json ./libs/graphql/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/apps/auth/prisma ./apps/auth/prisma
COPY --from=builder /workspace/libs/prisma/package.json ./libs/prisma/package.json
COPY --from=builder /workspace/pnpm*.yaml ./

# Set production environment
ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prefer-offline --prod

COPY --from=builder /workspace/node_modules/@prisma-clients/auth/ ./node_modules/@prisma-clients/auth/
COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/auth/main"]

