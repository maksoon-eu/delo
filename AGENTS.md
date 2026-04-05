<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Agent behaviour

- При обнаружении нового соглашения, breaking change или паттерна, которого ещё нет в этом файле — **сразу добавить его в `AGENTS.md`**.
- После завершения любой задачи обязательно запускать `npm run format && npm run lint && npm run typecheck` — оба вместе, без исключений.
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
├── hooks/               # кастомные React-хуки (useLocalStorage и т.д.)
├── constants/           # все константы приложения (index.ts)
├── types/               # чистые TypeScript-интерфейсы без Zod (index.ts)
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

- Обработчики событий передавать ссылкой, без лишней обёртки:

```tsx
// ✓ правильно
onClick={handleSubmit}
onClick={toggleTheme}

// ✗ неправильно
onClick={() => handleSubmit()}
onClick={() => toggleTheme()}
```

- Если обработчик требует аргументов или содержит несколько операций — выносить в именованную функцию внутри компонента, не инлайнить.
- Для повторяющихся start/stop-обработчиков анимации иконок по ref использовать `startAnimatedIcon()` и `stopAnimatedIcon()` из `src/lib/utils.ts`, а не дублировать логику доступа к `ref.current` в компонентах.

- `'use client'` только там, где реально нужно (формы, хуки, события)
- Server Components по умолчанию — не добавлять `'use client'` без причины

### Data fetching

- Данные загружаются в Server Components, передаются в клиентские как пропсы
- Мутации — исключительно через Server Actions в `src/actions/`
- Валидация через Zod-схему и на клиенте (react-hook-form), и на сервере (Server Action)

### Database

- Prisma client — только через singleton из `src/lib/db.ts`
- Никогда не импортировать `PrismaClient` напрямую

### Formatting helpers

- Форматирование цен — только через `formatPrice(value: number)` из `src/lib/utils.ts`
- Форматирование дат — только через `formatDate(date: Date, fmt?)` из `src/lib/utils.ts` (по умолчанию `'d MMM yyyy'`, локаль `ru` встроена)
- Никогда не использовать `toLocaleString('ru-RU', ...)`, `format(date, ..., { locale: ru })` напрямую в компонентах и константах
- Метки статусов оплаты — из `PAYMENT_STATUS_LABELS` в `src/constants/index.ts`

```ts
// ✓ правильно
import { formatPrice, formatDate } from '@/lib/utils';
formatPrice(order.price); // → '1 500 ₽'
formatDate(order.createdAt); // → '5 апр 2026'
formatDate(order.deadline, 'd MMMM yyyy'); // → '5 апреля 2026'

// ✗ неправильно
price.toLocaleString('ru-RU') + ' ₽';
format(date, 'd MMM yyyy', { locale: ru });
```

### Formatting

- Форматирование — **Prettier** (`.prettierrc` в корне): `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`
- `prettier-plugin-tailwindcss` — автоматически сортирует Tailwind-классы, не менять порядок вручную
- Перед коммитом: `npm run format` — форматирует все файлы; `npm run format:check` — проверка без изменений
- Весь генерируемый код должен соответствовать этим правилам без ручного форматирования

### Styles

- Глобальные стили — `src/styles/globals.css`
- Утилита `cn()` из `src/lib/utils.ts` для conditional classnames
- Не писать inline styles — только Tailwind классы
- SVG/image backgrounds подключать отдельным CSS-классом на layout/контейнер, а не через inline styles и не через цветовые токены темы

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
- `--background`, `--card`, `--sidebar` и другие семантические токены должны содержать только цветовые значения; `url(...)` и `background` shorthand в них не класть

### Schemas and Types

- `src/schemas/` — Zod-схемы и выведенные из них типы через `z.infer<>` (например `LoginSchema`, `RegisterInput`)
- `src/types/index.ts` — чистые TypeScript-интерфейсы без зависимости от Zod (`AnimatedIconHandle`, `NavItem` и т.д.)
- Никогда не объявлять схемы локально внутри компонентов или action-файлов — только в `src/schemas/`
- Типы пропсов компонента (`*Props`) оставлять в файле самого компонента
- Общие и переиспользуемые типы, не привязанные к одному компоненту, выносить в `src/types/index.ts`
- В Zod v4 `z.ZodIssueCode` устарел — в `ctx.addIssue()` использовать строковые literal-коды (`'custom'`, `'invalid_type'` и т.д.)

### Constants

- `src/constants/index.ts` — глобальные константы приложения: ключи localStorage, опции select, метки статусов, магические числа/строки. Импортировать через `@/constants`
- Компонентно-специфические данные (колонки таблиц, `defaultValues` форм) выносить в `constants.tsx` рядом с компонентом — не в глобальный `src/constants/index.ts`
- Никогда не объявлять ни те ни другие локально внутри компонентов

### Components

- Один файл — один компонент. Никогда не объявлять два и более компонентов в одном файле
- Вспомогательный компонент, нужный только одному — выносить в отдельный файл рядом
- Для nested-модалок на `@base-ui/react/dialog` `Dialog.Backdrop` по умолчанию не рендерится. Для вложенного диалога нужно ставить `forceRender`, а слои разводить отдельно: базовые модалки ниже dropdown (`z-[40]`), вложенные выше (`z-[60]`). Использовать валидные Tailwind-классы вида `z-[60]`, не `z-60`

### Comments

- Не добавлять декоративные JSX-комментарии вида `{/* Nav */}`, `{/* Logo */}`, `{/* Toggle */}` — структура кода должна быть самодокументируемой
- Комментарии только там, где логика неочевидна

### SSR и гидрация

**Проблема:** клиентские хуки (localStorage, тема, медиа-запросы) возвращают разные значения на сервере и на клиенте → hydration mismatch.

**Правило:** использовать `useSyncExternalStore` с тремя аргументами: `subscribe`, `getSnapshot` (клиент), `getServerSnapshot` (сервер).

```ts
// ✓ правильно — useIsClient
useSyncExternalStore(
  () => () => {},
  () => true,
  () => false
);

// ✓ правильно — useLocalStorage
useSyncExternalStore(
  subscribe,
  () => localStorage.getItem(key),
  () => initialValue
);

// ✗ неправильно — вызывает hydration mismatch
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

// ✗ неправильно — читает localStorage при SSR
useState(() => localStorage.getItem(key));
```

- `getServerSnapshot` всегда возвращает стабильное значение (initialValue, false, null и т.д.)
- `getSnapshot` (клиент) читает из внешнего хранилища
- Все хуки, зависящие от браузерных API, реализовывать через `useSyncExternalStore`
- Скрытие элементов до гидрации: `useIsClient()` из `src/hooks/use-is-client.ts`

**Куки vs localStorage:**

| Использовать       | Когда                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| `useCookieStorage` | состояние влияет на серверный рендер (layout, sidebar, размеры)        |
| `useLocalStorage`  | клиентские данные, которые не влияют на первый рендер (черновики, кэш) |

Для SSR-safe чтения куки на сервере: `cookies()` из `next/headers` → передать как `defaultValue` пропс в клиентский компонент.

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

### Button

- Единственная кнопка в проекте — `Button` из `src/components/ui/actions/icon-button.tsx`
- Принимает пропы: `Icon`, `isLoading`, `tooltip`, `mode`, `variant`, `size` и все стандартные HTML-атрибуты кнопки
- `mode="icon"` — иконочная кнопка без текста, автоматически применяет `size="icon"`
- **Правило**: если кнопка рендерит только иконку (без текста рядом) — обязательно передавать `tooltip` с описанием действия

### Async actions: loading state и обработка ошибок

Для любого асинхронного действия из клиентского компонента использовать хук `useAsyncAction` из `src/hooks/use-async-action.ts`.

**Правила:**

- Обработчик объявлять именованной функцией отдельно, затем передавать в `useAsyncAction`
- Внутри функции никогда не вызывать `toast.error` — вместо этого `throw new Error(message)`
- Хук перехватывает throw и показывает `toast.error(e.message)` — единственное место для error-тостов
- Если нужен side effect перед ошибкой (напр. `startLockout`) — выполнить его до `throw`
- `toast.success` при необходимости вызывается внутри функции напрямую — это не ошибка
- `isLoading` и спиннер на кнопке — из хука, не через `useState` вручную
- Если action, вызванный через `useAsyncAction`, должен навигировать пользователя, не делать `redirect()` или `signOut({ redirectTo })` внутри Server Action: они бросают `NEXT_REDIRECT`. В таких кейсах делать `redirect: false` и выполнять `router.push()` / `router.refresh()` в клиентском обработчике

```tsx
// ✓ правильно
async function onSubmit(data: LoginInput) {
  const { error, retryAfter } = await loginUser(data);

  if (error) {
    if (retryAfter) startLockout(retryAfter); // side effect до throw
    throw new Error(error); // хук покажет toast.error
  }

  router.push('/');
}

const [execute, isLoading] = useAsyncAction(onSubmit);

// В JSX:
// <form onSubmit={handleSubmit(execute)}>
// <Button isLoading={isLoading} />

// ✗ неправильно — toast внутри функции и ручной useState
async function onSubmit() {
  setIsLoading(true);
  try {
    if (error) toast.error(error); // не так
  } finally {
    setIsLoading(false);
  }
}
```

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
- Низкоуровневые form-контролы (`Input`, `Textarea`, `Select`, `Combobox`, `Label`) хранить в `src/components/ui/form/primitives/`
- Form-aware обёртки и составные поля (`FormInput`, `FormSelect`, `FormTextarea`, `FormCombobox`, `FormDateInput`, `SelectInput`) хранить в `src/components/ui/form/fields/`
- Поля форм — через компонент `FormInput` из `src/components/ui/form/fields/form-input.tsx`
- Для `<select>` **внутри RHF-формы** использовать `FormSelect` из `src/components/ui/form/fields/form-select.tsx` (принимает `control`, `name`, `label`, `options`)
- Для standalone `<select>` **вне формы** (фильтры, настройки) использовать `SelectInput` из `src/components/ui/form/fields/select-input.tsx` (принимает `value`, `onValueChange`, `options`) — не раскрывать `Select/SelectTrigger/SelectContent/SelectItem` вручную
- Для auth-форм всегда задавать явные `autocomplete`-значения (`username`, `current-password`, `new-password`, `email`, `name`) и использовать настоящий `<label htmlFor=...>`: без этого браузеры и password manager хуже распознают логин и могут не предлагать сохранение данных
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

### EmptyList

Для любого списка, который может быть пустым, использовать обёртку `EmptyList` из `src/components/ui/feedback/empty-list.tsx`:

```tsx
<EmptyList items={items} message="Нет элементов">
  {/* содержимое, отображаемое когда список не пуст */}
</EmptyList>
```

- Не проверять `items.length === 0` вручную в компоненте — делегировать `EmptyList`

### DetailItem

Для отображения пар метка/значение в `<dl>`-списках использовать `DetailItem` из `src/components/ui/data/detail-item.tsx`:

```tsx
<dl className="...">
  <DetailItem label="Клиент">{order.clientName}</DetailItem>
  {order.clientEmail && <DetailItem label="Email">{order.clientEmail}</DetailItem>}
</dl>
```

- Не дублировать паттерн `<div><dt>...</dt><dd>...</dd></div>` вручную

### TanStack Table + React Compiler

`useReactTable()` несовместим с React Compiler — возвращает функции, которые нельзя безопасно мемоизировать. Предупреждение `react-hooks/incompatible-library` оставляем как есть — не подавлять ни `'use no memo'`, ни `eslint-disable`.

### Github

- Перед выполненем задачи - переключиться на ветку dev подтянуть последние изменения
- Создать от dev ветку формата `id из кликапа-название-задачи`
- Работать в этой ветке

<!-- END:nextjs-agent-rules -->
