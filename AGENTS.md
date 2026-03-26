<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Agent behaviour

- При обнаружении нового соглашения, breaking change или паттерна, которого ещё нет в этом файле — **сразу добавить его в `AGENTS.md`**.
- Это касается любых неожиданных поведений фреймворка, найденных ошибок типизации, исправлений конфигурации и договорённостей по коду.

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
├── styles/
│   └── globals.css
├── actions/             # Server Actions (мутации)
├── schemas/             # Zod-схемы + inferred типы (LoginSchema, RegisterInput и т.д.)
├── components/
│   ├── ui/              # shadcn/ui компоненты
│   ├── layout/
│   ├── clients/
│   ├── orders/
│   └── public/
├── lib/                 # auth.ts, db.ts, pdf.ts, utils.ts, env.ts
├── types/               # чистые TypeScript-интерфейсы без Zod
└── prisma/
    └── schema.prisma
```

---

## Conventions

### Next.js 16 breaking changes

- **Middleware переименован в Proxy**: файл `middleware.ts` → `proxy.ts`, именованный экспорт `export function middleware` → `export function proxy`. Default export работает без переименования.
- **`turbopack.root`** в `next.config.ts` — обязателен при наличии нескольких lockfile-ов в родительских директориях, иначе Next.js выбирает неверный workspace root.

### Next.js 15+ breaking changes

- `params` и `searchParams` в pages и route handlers — всегда `Promise`, нужно `await`:

```ts
// page.tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// route.ts
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

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

### Formatting

- Форматирование — **Prettier** (`.prettierrc` в корне): `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`
- `prettier-plugin-tailwindcss` — автоматически сортирует Tailwind-классы, не менять порядок вручную
- Перед коммитом: `npm run format` — форматирует все файлы; `npm run format:check` — проверка без изменений
- Весь генерируемый код должен соответствовать этим правилам без ручного форматирования

### Styles

- Глобальные стили — `src/styles/globals.css`
- Утилита `cn()` из `src/lib/utils.ts` для conditional classnames
- Не писать inline styles — только Tailwind классы

### Colors

Тема — **Violet** (light + dark). Все цвета — через семантические CSS-переменные, никаких хардкодов.

**Правила:**

- Никогда не использовать `violet-*`, `purple-*`, `gray-*` и другие палитровые классы напрямую
- Всегда использовать семантические токены:

| Токен                                        | Использование                            |
| -------------------------------------------- | ---------------------------------------- |
| `bg-background` / `text-foreground`          | Основной фон и текст страницы            |
| `bg-card` / `text-card-foreground`           | Поверхности: карточки, панели            |
| `bg-primary` / `text-primary-foreground`     | CTA-кнопки, акцентные элементы           |
| `text-primary`                               | Акцентный текст, ссылки                  |
| `bg-secondary` / `text-secondary-foreground` | Вторичные кнопки, теги, бейджи           |
| `bg-muted` / `text-muted-foreground`         | Приглушённый фон и вспомогательный текст |
| `bg-accent` / `text-accent-foreground`       | Hover-состояния, подсветка               |
| `bg-destructive` / `text-destructive`        | Ошибки, удаление                         |
| `border-border`                              | Разделители, обводки                     |
| `ring-ring`                                  | Фокус-кольца                             |
| `bg-sidebar` / `text-sidebar-foreground`     | Sidebar и его элементы                   |
| `bg-sidebar-primary`                         | Активный элемент sidebar                 |
| `bg-sidebar-accent`                          | Hover в sidebar                          |

- Для фонов с прозрачностью — `bg-primary/10`, `bg-muted/40` и т.д.
- Градиенты строить из тех же токенов: `from-secondary/70 to-background`
- В Tailwind v4 `bg-gradient-to-*` переименован в `bg-linear-to-*`

### Schemas and Types

- `src/schemas/` — Zod-схемы и выведенные из них типы через `z.infer<>` (например `LoginSchema`, `RegisterInput`)
- `src/types/` — чистые TypeScript-интерфейсы без зависимости от Zod
- Никогда не объявлять схемы локально внутри компонентов или action-файлов — только в `src/schemas/`

### Animations

Два инструмента — выбирай по контексту:

**`tw-animate-css`** — для входных анимаций, работает в Server Components, zero-JS:

- Появление страницы/секции: `animate-in fade-in-0 slide-in-from-bottom-4 duration-300`
- Появление модальных окон, поповеров: `animate-in fade-in-0 zoom-in-95 duration-200`
- Лёгкое появление вложенного контента: `animate-in fade-in-0 slide-in-from-bottom-2 duration-300`

**`motion/react`** — для интерактивных анимаций, только в `'use client'` компонентах:

- Stagger-списки (карточки заказов, клиентов)
- Enter/exit с `AnimatePresence`
- Drag, scroll-triggered и прочая логика

**`<AnimateIn>`** — переиспользуемый компонент из `src/components/ui/animate-in.tsx`, Server Component:

```tsx
// Варианты: 'fade' | 'slide-up' (по умолчанию) | 'slide-down' | 'zoom'
<AnimateIn variant="slide-up" className="...">
  {children}
</AnimateIn>
```

Правила:

- Для стандартных анимаций входа используй `<AnimateIn>` — не дублируй классы вручную
- Предпочитай `tw-animate-css` / `AnimateIn` — они проще, не требуют JS-бандла
- Переходи на `motion/react` только когда нужна интерактивность или `AnimatePresence`
- Анимируй **обёртку страницы** (layout или корневой div страницы), а не каждый элемент отдельно
- Не используй `transition-all` — только конкретные свойства (`transition-colors`, `transition-opacity`)
- Уважай `prefers-reduced-motion` — не добавляй анимации к критически важным UI-элементам без проверки

### Icons

- Иконки — библиотека [lucide-animated](https://lucide-animated.com), устанавливаются через shadcn CLI:
  ```bash
  npx shadcn add "@lucide-animated/icon-name" --path src/components/icons
  ```
- Все иконки живут в `src/components/icons/`
- Кнопки с иконками и лоадером — через компонент `IconButton` из `src/components/ui/icon-button.tsx`:
  ```tsx
  <IconButton type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
    Войти
  </IconButton>
  ```
- `Icon` — принимает компонент иконки (не элемент), hover-анимация управляется через ref автоматически
- Registry в `components.json` уже настроен: `"@lucide-animated": { "url": "https://lucide-animated.com/r/{name}.json" }`

### Forms

- Все формы через shadcn `Form` + `react-hook-form` + `zodResolver`
- Схемы и типы для форм брать из `src/schemas/`
- Поля форм — через компонент `FormInput` из `src/components/ui/form-input.tsx`
- Из `useForm` деструктурировать нужные методы явно, `form` оставлять для `<Form {...form}>`:

```tsx
const form = useForm<LoginInput>({ resolver: zodResolver(LoginSchema), defaultValues: {...} })
const { control, handleSubmit } = form

// <Form {...form}> — полный объект, т.к. FormProvider ожидает UseFormReturn
// control, handleSubmit — используются напрямую без form.control / form.handleSubmit
```

### Environment

- Все env-переменные — через `src/lib/env.ts` (валидация через @t3-oss/env-nextjs)
- Никогда не обращаться к `process.env` напрямую вне `env.ts`

### ClickUp

- После выполнения задачи — обновить соответствующую задачу в ClickUp:
  - Поменять статус задачи с **TO DO** → **IN PROGRESS** в начале работы
  - Перенести из **IN PROGRESS** → **READY TO TEST** после завершения
- Если задачи в ClickUp нет — создать её в **MVP Разработка** перед началом работы

<!-- END:nextjs-agent-rules -->
