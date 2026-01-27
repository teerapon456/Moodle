#!/bin/bash
set -e

echo "=========================================="
echo "  Moodle Docker Entrypoint"
echo "=========================================="

# Wait for MySQL to be ready
echo "[1/4] Waiting for MySQL..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    # Check if MySQL is ready AND the database exists
    if mysql -h"mysql" -u"${DB_USER:-moodle}" -p"${DB_PASSWORD:-moodle_password}" --skip-ssl -e "SELECT 1 FROM DUAL" "${DB_NAME:-moodle}" 2>/dev/null; then
        echo "      MySQL is ready and database '${DB_NAME:-moodle}' is accessible!"
        break
    fi
    echo "      Attempt $attempt/$max_attempts - MySQL not ready, waiting..."
    sleep 5
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    echo "      ERROR: MySQL did not become ready in time"
    exit 1
fi

# Set permissions for moodledata
echo "[2/4] Setting moodledata permissions..."
chown -R www-data:www-data /var/www/moodledata
chmod -R 777 /var/www/moodledata

# Skip html permissions - volume mount from host, too many files
echo "[3/4] Skipping html permissions (volume mount)..."

# Check if config.php exists
echo "[4/4] Checking Moodle configuration..."
if [ -f /var/www/html/config.php ]; then
    echo "      config.php found - Moodle is configured"
else
    echo "      WARNING: config.php not found!"
    echo "      Please copy config.php to moodle/html/ folder"
fi

echo "=========================================="
echo "  Starting Apache Web Server"
echo "=========================================="
exec "$@"
