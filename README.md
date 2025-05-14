# 📦 WebStick Test Project (Laravel + Next.js + Docker)

Добро пожаловать! Этот проект использует **Laravel (backend)** и **Next.js (frontend)**, работающие в Docker. Всё запускается следующим образом:



## 🚀 Запуск

```bash
git clone https://github.com/hryhorii-kadaner/laravel-test-project.git
```

```
cd laravel-test-project
```

### Прежде чем запускать проект запустите Docker

После запуска Docker-a в директории склонированного репозитория введите команду
```bash
docker-compose up --build
```

После успешного завершения сборки, необходимо зайти в PHP контейнер введя команду
```bash
docker-compose exec php bash
```

Далее нужно будет последовательно ввести следующие команды

```bash
composer install
```

```bash
php artisan queue:table
```

```bash
php artisan migrate --force
```


```bash
php artisan storage:link || true
```

### В случае успешного выполнения всех вышеперечисленных инструкций, надеюсь, можно перейти на клиент сайта по следующему URL адресу

```url
http://localhost:3000
```

### Сервер работает по URL
```url
http://localhost
```