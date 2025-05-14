set -e

cd /var/www

if [ ! -d "vendor" ]; then
  echo "Installing composer dependencies..."
  composer install
fi

echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h"$DB_HOST" --silent; do
  sleep 2
done

echo "Running artisan commands..."
php artisan queue:table
php artisan migrate --force
php artisan storage:link || true

exec "$@"