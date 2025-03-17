# MovieBooker

MoviieBooker is a movie reservation system featuring a **NestJS API** with **JWT authentication**, **TMDB integration**, **reservation slots**, **pagination**, and **secured endpoints**. The API is documented using **Swagger**, and the frontend is built with **React** and **TailwindCSS**.

## Technologies Used

### Backend:
- **NestJS** (Node.js framework)
- **Prisma** (ORM)
- **PostgreSQL** (Database, Dockerized)
- **JWT** (Authentication)
- **Swagger** (API Documentation)
- **TMDB API** (Movie Data Integration)

### Frontend:
- **React**
- **TailwindCSS**

### DevOps & Tooling:
- **Docker & Docker Compose**
- **.env Configuration**
- **Prisma Migrations**

---

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/) or npm

---

## Environment Variables Configuration

## Running the Project

### 1. Start the Database (Docker)
```sh
docker-compose up -d
```
This will start a **PostgreSQL** instance for your application.

### 2. Backend Setup
```sh
cd movie-booker
cp .env.example .env
npm install
npx prisma migrate dev
npm run start
```
The NestJS API will now run on `http://localhost:5000`.

### 3. Frontend Setup

The front is Dockerized

```sh
cd frontend
cp .env.example .env
cp .env.example .env.local

```
The frontend will now run on `http://localhost:5173"` (default Vite port).

---

## API Documentation
Once the backend is running, you can access the **Swagger API Documentation** at:
[http://localhost:5000/api](http://localhost:5000/api)

---

## Useful Commands

### Docker
- `docker-compose up -d` → Start database
- `docker-compose down` → Stop database

### Backend (not secure auth)
- `npm run start` → Start backend in dev mode
- `npx prisma db push` → Apply database 

### Frontend
- `npm run dev` → Start the frontend

---

---

## Contributors
- **Your Name** - *Enstso*

---


