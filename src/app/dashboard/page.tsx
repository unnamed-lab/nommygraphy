import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { GalleryDashboard } from "@/components/gallery-dashboard"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Dashboard | Nonygraphy",
  description: "Manage your photography content",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your photography content and gallery." />
      <div className="grid gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <DashboardNav />
        <GalleryDashboard />
      </div>
    </DashboardShell>
  )
}

