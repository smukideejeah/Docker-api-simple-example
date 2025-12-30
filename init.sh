#!/bin/sh
set -e

echo "Waiting for database..."
echo "Running migrations..."
npx sequelize-cli db:migrate
node build/config/seed.js

exec npm run start