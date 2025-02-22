FROM oven/bun:latest as base
WORKDIR /app

COPY . .

ENV NODE_ENV=production
RUN bun install --frozen-lockfile

EXPOSE 8080
ENTRYPOINT ["bun", "run", "start"]

