'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  const { children, ...rest } = props
  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>
}
