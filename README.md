# Papra с русской локализацией

## Сборка Docker образа

```bash
git clone https://github.com/shoterpyhton/fork-papra-ru.git $ cd fork-papra-ru

docker build -f packages/docker/Dockerfile -t papra-ru:latest .
```

## Запуск

```bash
docker run -d \
  --name papra \
  --restart unless-stopped \
  --env APP_BASE_URL=http://localhost:1221 \
  --env AUTH_SECRET=secret \
  -p 1221:1221 \
  -v $(pwd)/papra-data:/app/app-data \
  papra-ru:latest
```

