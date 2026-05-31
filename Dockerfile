# ─── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack (reads version from package.json packageManager field)
RUN corepack enable

# Copy manifest + lockfile first for better layer caching
COPY package.json pnpm-lock.yaml ./
COPY patches/ patches/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# ─── Production stage ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
COPY patches/ patches/

RUN pnpm install --frozen-lockfile --prod

# Copy compiled server and built frontend from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
