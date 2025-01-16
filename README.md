# Installation Guide

This guide provides step-by-step instructions to install the project on different platforms.

## Installation

1. **Install PHP and Composer**
   - Install on Windows:
     ```cmd
     Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
     ```
   - Install on MacOs:
     ```cmd
     /bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"
     ```
   - Install on Linux:
     ```cmd
     /bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
     ```

3. **Clone Repository and Install Dependencies**
   - Open a terminal and navigate to your desired project directory.
     ```cmd
     git clone https://github.com/tetekecoak/laravel_inertia.git
     cd laravel_inertia
     ```
   - Install dependencies:
     ```cmd
     composer install && npm install
     ```

4. **Setup Environment**
   - Copy `.env.example` to `.env`:
     ```cmd
     cp .env.example .env
     ```
   - Generate an application key:
     ```cmd
     php artisan key:generate
     ```
5. **Setup Database**
   - Change environtment database  to `.env`:
     ```cmd
         DB_HOST={your database host}
         DB_PORT={your database port}
         DB_DATABASE={your database name}
         DB_USERNAME={your database username}
         DB_PASSWORD={your database password}
     ```
   - Migrate database:
     ```cmd
     php artisan migrate
     php artisan app:generate-permission
     ```

6. **Serve Application**
   - Run the development server:
     ```cmd
     composer run dev
     ```
   - Visit `http://localhost:8000` in your browser.
     
7. **(Optional) Serve Application Octane use frankenphp**
   - Install frankenphp:
     ```cmd
     php artisan octane:install --server frankenphp --force
     ```
   - Run the development server:
     ```cmd
     composer run dev:octane
     ```
   - Visit `http://localhost:8000` in your browser.

---

## Getting Started

You are now ready to use the application on your platform of choice!

### Login to the Website
- **Email**: `admin@admin.com`
- **Password**: `admin`

Visit the application in your browser and log in using the above credentials to explore its features.

---

## Additional Information

### Template UI
The project uses **Flowbite React** for its UI components. Flowbite is a library of accessible and customizable React components built on Tailwind CSS.

To explore Flowbite React, visit the [Flowbite React Documentation](https://flowbite-react.com/).

### Icons
The project utilizes **React Icons** for a consistent and scalable icon set. React Icons provides a collection of popular icon libraries, making it easy to integrate icons into the application.

For more details, visit the [React Icons Documentation](https://react-icons.github.io/react-icons/).
