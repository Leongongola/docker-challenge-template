# Docker Challenge: Full-Stack Application

## Overview

This project is part of a Docker challenge for the Operating Systems and Cloud Computing course. The goal is to set up a full-stack application using Docker Compose, consisting of a Node.js backend, an Nginx web server, and a MariaDB database. The application demonstrates service orchestration and containerization, with an additional challenge to scale the Node.js service.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git**: For version control and cloning repositories.
- **Docker**: To build and run containers.
- **Docker Compose**: For managing multi-container applications.

## Repository Structure# docker-challenge-template

challenge3/
├── docker-compose.yml
├── node-service/
│ ├── app.js
│ ├── Dockerfile
│ ├── package.json
├── nginx/
│ └── default.conf
├── db/
│ └── init/
│ └── init.sql
└── .env

## Setup Instructions

1. **Clone the Repository:**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/eduluz1976/docker-challenge-template.git
   cd docker-challenge-template/challenge3
   ## 	2.	Create Environment Variables:
   Create a .env file in the challenge3 directory with the following content:
   ```

DB_ROOT_PASSWORD=root_password
DB_DATABASE=books_db
DB_USERNAME=user
DB_PASSWORD=password

## Configure Docker Compose:

The docker-compose.yml file defines the services for the application. Ensure it contains the following configuration:
version: '3.8'

services:
db:
image: mariadb:latest
environment:
MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
MYSQL_DATABASE: ${DB_DATABASE}
MYSQL_USER: ${DB_USERNAME}
MYSQL_PASSWORD: ${DB_PASSWORD}
ports: - "3306:3306"
volumes: - ./db/init:/docker-entrypoint-initdb.d

node-service:
build: ./node-service
environment:
DB_HOST: db
DB_USER: ${DB_USERNAME}
DB_PASS: ${DB_PASSWORD}
DB_NAME: ${DB_DATABASE}
ports: - "3000:3000"
depends_on: - db

nginx:
image: nginx:latest
ports: - "8080:80"
volumes: - ./nginx:/etc/nginx/conf.d
depends_on: - node-service
