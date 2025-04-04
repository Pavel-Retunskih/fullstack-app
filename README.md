
# 🚀 Fullstack App

## 📦 Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/Pavel-Retunskih/fullstack-app
cd fullstack-app
```

### 2. Установка зависимостей

#### Установка `concurrently` (для удобного параллельного запуска Front и Back):

```bash
npm install
```

#### Установка зависимостей фронтенда и бэкенда:

```bash
npm run install:all
```

---

## 🐳 Запуск проекта

> Убедитесь, что установлен и запущен **Docker Desktop**.

### 1. Запуск контейнера с базой данных:

```bash
docker compose up
```

### 2. Запуск фронтенда и бэкенда:

```bash
npm run start:all
```

---

## 🔗 Доступ к проекту

- **Frontend:** [http://localhost:5173/](http://localhost:5173/)
- **Админка БД (pgAdmin):** [http://localhost:5050/](http://localhost:5050/)

**Данные для входа в pgAdmin:**

- Логин: `admin@admin.com`
- Пароль: `root`

---

## 📌 Стек технологий

| Технология       | Описание                                        |
|------------------|--------------------------------------------------|
| ⚛️ React         | Библиотека для создания UI                      |
| ⚡ Vite           | Молниеносный сборщик проектов                   |
| 🟦 TypeScript     | Надёжная статическая типизация                  |
| 🔥 RTK Query      | Эффективная работа с API на базе Redux Toolkit |
| 🛠️ NestJS        | Серверная часть на TypeScript (Node.js)        |
| 🐘 PostgreSQL     | Реляционная СУБД (в контейнере Docker)         |
| 🐳 Docker         | Контейнеризация приложения и базы данных       |

---

## 📁 Структура репозитория (упрощённо)

```
fullstack-app/
├── client/        # Фронтенд (React + Vite)
├── server/        # Бэкенд (NestJS)
├── docker-compose.yml
├── package.json
└── README.md
```

---

