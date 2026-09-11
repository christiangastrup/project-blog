import RSS from "rss";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
export async function GET() {
  const blogPosts = await getBlogPostList();
  const feed = new RSS({
    title: BLOG_TITLE,
    site_url: "http://localhost:3000",
    feed_url: "http://localhost:3000/rss.xml",
    description: "The blog of Chrisitan G. Astrup",
  });
  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `http://localhost:3000/${post.slug}`,
      date: post.publishedOn,
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
