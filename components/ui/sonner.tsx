"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  // IMPORTANT:
  // Replace '64px' with the actual height of your application's header.
  // For example, if your header has a Tailwind class like 'h-20', its height is 80px.
  const headerHeight = '64px'; // Example: for a header with h-16

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right" // Keeps it at the top-right corner
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          // This line pushes the toaster container down from the top of the viewport
          top: headerHeight,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }