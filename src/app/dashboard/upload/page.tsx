import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UploadForm } from "@/components/upload-form"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Upload Photos | Nonygraphy",
  description: "Upload new photos to your gallery",
}

export default function UploadPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Upload Photos" text="Add new photos to your gallery collection." />
      <div className="grid gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <DashboardNav />
        <UploadForm />
      </div>
    </DashboardShell>
  )
}

