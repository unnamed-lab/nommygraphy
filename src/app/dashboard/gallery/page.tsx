import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { GalleryManager } from "@/components/gallery-manager"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Gallery Management | Nonygraphy",
  description: "Manage your photography gallery",
}

export default function GalleryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Gallery Management" text="Upload, edit, and organize your photography gallery." />
      <div className="grid gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <DashboardNav />
        <GalleryManager />
      </div>
    </DashboardShell>
  )
}

