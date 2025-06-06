FROM node:22-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN node --version && \
  npm --version && \
  pnpm --version

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME

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


COPY apps/executor ./apps/executor
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/pulsar ./libs/pulsar

RUN pnpm install --frozen-lockfile

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx build executor


FROM base AS runner

WORKDIR /app

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/executor/package.json ./apps/executor/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/libs/pulsar/package.json ./libs/pulsar/package.json
COPY --from=builder /workspace/pnpm*.yaml ./

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prefer-offline --prod

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/executor/main"]

