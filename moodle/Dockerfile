FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libonig-dev \
    libsodium-dev \
    libldap2-dev \
    unzip \
    git \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure ldap \
    && docker-php-ext-install -j$(nproc) \
    gd \
    intl \
    mysqli \
    pdo_mysql \
    zip \
    soap \
    exif \
    opcache \
    sodium \
    ldap \
    mbstring

# Enable Apache modules
RUN a2enmod rewrite headers

# PHP configuration for Moodle
RUN echo "max_input_vars = 5000" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/moodle.ini

# OPcache configuration
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=10000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.revalidate_freq=60" >> /usr/local/etc/php/conf.d/opcache.ini

# Copy Apache VirtualHost configuration
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

# Create moodledata directory
RUN mkdir -p /var/www/moodledata \
    && chown -R www-data:www-data /var/www/moodledata \
    && chmod -R 777 /var/www/moodledata

WORKDIR /var/www/html

# Copy Moodle source files into container
COPY html/ /var/www/html/

# Copy config.php to html folder
COPY config.php /var/www/html/config.php

# Set proper permissions for Moodle files
RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
