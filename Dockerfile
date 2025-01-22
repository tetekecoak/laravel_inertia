FROM dunglas/frankenphp

RUN install-php-extensions \
    bcmath \
    ctype \
    curl \
    dom \
    filter \
    hash \
    session \
    fileinfo \
    json \
    mbstring \
    openssl \
    pdo \
    tokenizer \
    xml \
    redis \
    zip \
    pdo_mysql \
    # Add other PHP extensions here...
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the app files into the container
COPY . /app

# Set the entrypoint to run your artisan command
ENTRYPOINT ["frankenphp", "php-server", "-r", "public/"]
