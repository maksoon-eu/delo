<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

# Project: Delo

Веб-сервис для самозанятых и фрилансеров — управление клиентами, заказами, оплатами и документами.

---

## Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL + Prisma
- Auth.js v5 (NextAuth)
- Zod + react-hook-form + @hookform/resolvers
- Resend (email)
- @react-pdf/renderer (PDF)
- @tanstack/react-table
- date-fns
- sonner
- nuqs

---

## File structure

```
src/
├── app/
│   ├── (auth)/          # login, register — без dashboard layout
│   ├── (dashboard)/     # защищённые роуты с sidebar
│   ├── order/[token]/   # публичная страница заказа (без авторизации)
│   └── api/             # только NextAuth и PDF download
├── assets/
│   ├── fonts/
│   ├── images/
│   └── styles/
│       └── globals.css
├── actions/             # Server Actions (мутации)
├── components/
│   ├── ui/              # shadcn/ui компоненты
│   ├── layout/
│   ├── clients/
│   ├── orders/
│   └── public/
├── lib/                 # auth.ts, db.ts, pdf.ts, utils.ts, env.ts
├── types/
└── prisma/
    └── schema.prisma
```

---

## Conventions

### Naming

- Папки и файлы — kebab-case (`order-form.tsx`, `activity-log.tsx`)
- Компоненты внутри файлов — PascalCase
- Server Actions — camelCase (`createOrder`, `updateClient`)

### Imports

- Не импортировать `React` как дефолтный импорт — используем именованные импорты:

```tsx
// ✓ правильно
import { useState, useEffect, ComponentProps } from 'react'

// ✗ неправильно
import React from 'react'
React.useState(...)
React.ComponentProps<...>
```

### Components

- Деструктурировать пропсы **внутри тела компонента**, а не в аргументе функции:

```tsx
// ✓ правильно
export default function OrderCard(props: OrderCardProps) {
  const { order, onStatusChange } = props
  ...
}

// ✗ неправильно
export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  ...
}
```

- `'use client'` только там, где реально нужно (формы, хуки, события)
- Server Components по умолчанию — не добавлять `'use client'` без причины

### Data fetching

- Данные загружаются в Server Components, передаются в клиентские как пропсы
- Мутации — исключительно через Server Actions в `src/actions/`
- Валидация через Zod-схему и на клиенте (react-hook-form), и на сервере (Server Action)

### Database

- Prisma client — только через singleton из `src/lib/db.ts`
- Никогда не импортировать `PrismaClient` напрямую

### Styles

- Глобальные стили — `src/assets/styles/globals.css`
- Утилита `cn()` из `src/lib/utils.ts` для conditional classnames
- Не писать inline styles — только Tailwind классы

### Forms

- Все формы через shadcn `Form` + `react-hook-form` + `zodResolver`
- Zod-схемы выносить в отдельную константу рядом с формой или в `types/`

### Environment

- Все env-переменные — через `src/lib/env.ts` (валидация через @t3-oss/env-nextjs)
- Никогда не обращаться к `process.env` напрямую вне `env.ts`

### ClickUp

- После выполнения задачи — обновить соответствующую задачу в ClickUp:
  - Перенести задачу из **📋 Бэклог** → **🔨 В работе** в начале работы
  - Перенести из **🔨 В работе** → **✅ Готово** после завершения
- Если задачи в ClickUp нет — создать её в **📋 Бэклог** перед началом работы
- Пространство: `🚀 MVP Разработка` в воркспейсе ClickUp

<!-- END:nextjs-agent-rules -->
