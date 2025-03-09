import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <DashboardNav isCollapsed={true} />
            <h1 className="text-xl font-bold">Nonygraphy Admin</h1>
          </div>
          <UserAccountNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

