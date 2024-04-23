FROM oven/bun:latest as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun bundle

FROM oven/bun:latest as production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/bun.lockb /app/.env ./
RUN bun install --frozen-lockfile --production

EXPOSE 3001

CMD bun prisma db push || true && bun startServer
