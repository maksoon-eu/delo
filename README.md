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
| Email       | Resend                   |
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

Скопируй `.env.local.example` и заполни значения:

```bash
cp .env.local.example .env.local
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/delo"
AUTH_SECRET="your-secret"
RESEND_API_KEY="your-resend-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Применить миграции БД

```bash
npx prisma migrate dev
```

### 4. Запустить dev-сервер

```bash
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

## Команды

```bash
npm run dev            # dev-сервер
npm run build          # production сборка
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
├── lib/                  # auth, db, pdf, utils, env
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
