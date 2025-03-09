import Image from "next/image";
import { TeamSection } from "@/components/team-section";
import { ProcessSection } from "@/components/process-section";
import { AdUnit } from "@/components/ad-unit";
import { RelatedServicesAd } from "@/components/related-services-ad";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            About <span className="font-medium">Nommygraphy</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            {`Our story, our passion, and our commitment to capturing life's most precious moments.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg"
              alt="About Nommygraphy"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-light">
              Our <span className="font-medium">Story</span>
            </h2>
            <p className="text-muted-foreground">
              {`Nommygraphy was born from a deep passion for visual storytelling. What began as a personal journey to
              capture life's fleeting moments has evolved into a dedicated photography studio committed to excellence.`}
            </p>
            <p className="text-muted-foreground">
              {`Founded in 2015, we've had the privilege of documenting countless precious memories for our clients - from
              intimate weddings to breathtaking landscapes, from personal portraits to commercial projects.`}
            </p>
            <p className="text-muted-foreground">
              {`Our philosophy is simple: every moment has its own unique beauty, and our mission is to preserve that
              beauty through the art of photography. We believe in creating images that not only capture what something
              looks like, but also how it feels.`}
            </p>
            <h2 className="text-3xl font-light pt-4">
              Our <span className="font-medium">Approach</span>
            </h2>
            <p className="text-muted-foreground">
              {`We approach each project with fresh eyes and an open heart. Whether we're shooting a wedding, a portrait
              session, or a landscape, we seek to find the authentic emotion and beauty in every scene.`}
            </p>
            <p className="text-muted-foreground">
              {`Our work is characterized by a blend of technical precision and artistic vision. We pay meticulous
              attention to lighting, composition, and timing, while also bringing a creative perspective that transforms
              ordinary scenes into extraordinary images.`}
            </p>
          </div>
        </div>

        {/* Tasteful rectangular ad between sections */}
        <div className="my-16 flex justify-center">
          <AdUnit
            slot="2468135790"
            format="rectangle"
            responsive={false}
            className="mx-auto"
          />
        </div>

        <ProcessSection />

        {/* Related services ad integration */}
        <RelatedServicesAd />

        <TeamSection />
      </section>
    </main>
  );
}
