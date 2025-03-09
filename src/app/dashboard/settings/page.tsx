import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Settings | Nonygraphy",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />
      <div className="grid gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <DashboardNav />
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}

