import React from "react";

import BlogHero from "@/components/BlogHero";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import styles from "./postSlug.module.css";
import COMPONENT_MAP from "@/helpers/mdx-components";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogpostData = await loadBlogPost(postSlug);

  if (!blogpostData) {
    return null;
  }

  const { frontmatter } = blogpostData;

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const blogpostData = await loadBlogPost(postSlug);

  if (!blogpostData) {
    notFound();
  }

  const { frontmatter, content } = blogpostData;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
