import { Camera, Palette, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface RelatedServicesAdProps {
  className?: string
}

export function RelatedServicesAd({ className }: RelatedServicesAdProps) {
  const services = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Photography Equipment",
      description: "Professional cameras and lenses",
      link: "#",
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: "Video Production",
      description: "High-quality video services",
      link: "#",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Photo Editing",
      description: "Professional editing software",
      link: "#",
    },
  ]

  return (
    <div className={cn("my-8 rounded-xl border p-6", className)}>
      <div className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Sponsored Content</div>

      <h3 className="mb-4 text-lg font-medium">Photography Services You Might Like</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {services.map((service, index) => (
          <a
            key={index}
            href={service.link}
            className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {service.icon}
            </div>
            <h4 className="mb-1 font-medium group-hover:text-primary">{service.title}</h4>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

