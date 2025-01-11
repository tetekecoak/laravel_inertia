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
     copy .env.example .env
     ```
   - Generate an application key:
     ```cmd
     php artisan key:generate
     ```

5. **Serve Application**
   - Run the development server:
     ```cmd
     composer run dev
     ```
   - Visit `http://localhost:8000` in your browser.

---

You are now ready to use the application on your platform of choice!

