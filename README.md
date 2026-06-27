# Delo

Веб-сервис для самозанятых и фрилансеров. Помогает вести клиента, заказ, согласование, оплату и документы в одном месте — убирает хаос из чатов и снижает риск споров.

## Что умеет

- Создавать клиентов и заказы
- Фиксировать состав работ, цену и сроки
- Отправлять клиенту публичную страницу заказа по ссылке
- Получать подтверждение условий от клиента
- Отмечать оплаты вручную
- Генерировать договор и акт выполненных работ в PDF
- Вести историю действий по каждому заказу

## Стек

| Слой        | Технология               |
| ----------- | ------------------------ |
| Framework   | Next.js 16 (App Router)  |
| Язык        | TypeScript               |
| Стили       | Tailwind CSS + shadcn/ui |
| БД          | PostgreSQL + Prisma      |
| Auth        | Auth.js v5 (NextAuth)    |
| Валидация   | Zod + react-hook-form    |
| Email       | Mailpit local + Resend   |
| PDF         | @react-pdf/renderer      |
| Таблицы     | @tanstack/react-table    |
| Уведомления | Sonner                   |
| Деплой      | Vercel + Neon            |

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить переменные окружения

Скопируй `.env.example` и заполни значения:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/delo"
AUTH_SECRET="your-secret"
EMAIL_FROM="Delo <noreply@delo.local>"
SMTP_HOST="localhost"
SMTP_PORT="1025"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Запустить локальную почту

В локальном окружении `APP_ENV=local` письма отправляются в Mailpit:

```bash
npm run mailpit:up
```

SMTP доступен на `localhost:1025`, интерфейс писем — [http://localhost:8025](http://localhost:8025).

### 4. Применить миграции БД

```bash
npx prisma migrate dev
```

### 5. Запустить dev-сервер

```bash
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

## Команды

```bash
npm run dev            # dev-сервер
npm run build          # production сборка
npm run mailpit:up     # локальная почта Mailpit
npm run lint           # ESLint
npm run format         # Prettier (запись)
npm run format:check   # Prettier (проверка)
npx prisma studio      # GUI для базы данных
npx prisma migrate dev --name <name>  # новая миграция
```

## Структура проекта

```
src/
├── app/
│   ├── (auth)/           # /login, /register
│   ├── (dashboard)/      # защищённый кабинет
│   │   ├── page.tsx      # дашборд
│   │   ├── clients/      # клиенты
│   │   └── orders/       # заказы
│   ├── order/[token]/    # публичная страница заказа для клиента
│   └── api/              # NextAuth, скачивание PDF
├── assets/
│   ├── fonts/
│   ├── images/
│   └── styles/
│       └── globals.css
├── actions/              # Server Actions
├── components/
│   ├── ui/               # shadcn/ui
│   ├── layout/
│   ├── clients/
│   ├── orders/
│   └── public/
├── config/               # auth, db, env
├── utils/                # reusable helpers
└── types/
prisma/
└── schema.prisma
```

## Ветки

| Ветка  | Назначение |
| ------ | ---------- |
| `main` | production |
| `dev`  | разработка |

Фичи разрабатываются в отдельных ветках от `dev`, мёрджатся в `dev`, затем в `main` при релизе.
