# Papra с русской локализацией

## Сборка Docker образа

```bash
cd /home/brel0k/Загрузки/papra-main

docker build -f packages/docker/Dockerfile -t papra-ru:latest .
```

## Запуск

```bash
docker run -d \
  --name papra \
  --restart unless-stopped \
  --env APP_BASE_URL=http://95.174.126.145:1221 \
  --env AUTH_SECRET=2b206767d9dd026e77cfdcbc62612cd0407c358b37302bc37b70d8c70601da5f \
  -p 1221:1221 \
  -v $(pwd)/papra-data:/app/app-data \
  papra-ru:latest
```

## Выбор языка

После запуска откройте http://95.174.126.145:1221, войдите в аккаунт и выберите "Русский" в меню пользователя → Язык.
