FROM dunglas/frankenphp
 
RUN install-php-extensions \
    bcmath \
    ctype \
    fileinfo \
    json \
    mbstring \
    openssl \
    pdo \
    tokenizer \
    xml \
    redis \
    zip \
    # Add other PHP extensions here...
    && rm -rf /var/lib/apt/lists/*
 
COPY . /app
 
ENTRYPOINT ["php", "artisan", "octane:frankenphp"]