"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ImageIcon, Upload, Settings, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps {
  isCollapsed?: boolean
}

export function DashboardNav({ isCollapsed }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Gallery",
      href: "/dashboard/gallery",
      icon: ImageIcon,
    },
    {
      title: "Upload",
      href: "/dashboard/upload",
      icon: Upload,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  if (isCollapsed) {
    return (
      <div className="flex items-center">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="h-5 w-5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
            {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        )
      })}
    </nav>
  )
}

