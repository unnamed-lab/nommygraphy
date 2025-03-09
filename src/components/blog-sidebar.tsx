import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";

interface PopularPost {
  title: string;
  slug: string;
  date: string;
}

const popularPosts: PopularPost[] = [
  {
    title: "10 Tips for Better Portrait Photography",
    slug: "/blog/10-tips-better-portrait-photography",
    date: "May 15, 2023",
  },
  {
    title: "Understanding Natural Light in Photography",
    slug: "/blog/understanding-natural-light",
    date: "June 3, 2023",
  },
  {
    title: "Essential Gear for Wedding Photography",
    slug: "/blog/essential-gear-wedding-photography",
    date: "July 22, 2023",
  },
  {
    title: "Color Theory for Photographers",
    slug: "/blog/color-theory-photographers",
    date: "August 10, 2023",
  },
];

export function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Vertical ad placement */}
      <AdUnit slot="1357908642" format="rectangle" responsive={false} />

      <div className="bg-muted/30 p-6 rounded-xl">
        <h3 className="text-lg font-medium mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.slug}>
              <Link
                href={post.slug}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Second vertical ad placement */}
      <AdUnit
        slot="9753124680"
        format="rectangle"
        responsive={false}
        className="mt-8"
      />
    </div>
  );
}
