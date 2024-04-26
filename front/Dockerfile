FROM oven/bun:latest as builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun bundle

FROM oven/bun:latest as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lockb .
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["bun", "startNode"]