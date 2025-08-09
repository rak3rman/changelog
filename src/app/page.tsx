import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./page.module.css";
import mdxComponents from "../components/MDXComponents";
import matter from "gray-matter";
import LitLogHeader from "../components/react/LitLogHeader";
import LitReleaseSection from "@/components/react/LitReleaseSection";
import LitBackToTopButton from "@/components/react/LitBackToTopButton";

export default async function Home() {
  // Read MDX files from context directory
  const contextDir = path.join(process.cwd(), "context");
  const filenames = fs
    .readdirSync(contextDir)
    .filter((file) => file.endsWith(".mdx"));

  // Sort files if needed
  filenames.sort();

  // Read content from each file
  const mdxContents = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contextDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter
      const { content, data } = matter(fileContent);

      return {
        filename,
        content,
        frontmatter: data,
      };
    })
  );

  // Sort by date (newest first)
  mdxContents.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LitLogHeader />
        <div>
          {mdxContents.map((item, index) => (
            <div key={index} className={styles.mdxContent}>
              <LitReleaseSection
                date={item.frontmatter.date}
                tag={item.frontmatter.tag}
              >
                <MDXRemote source={item.content} components={mdxComponents} />
              </LitReleaseSection>
            </div>
          ))}
        </div>
        <div className={styles.endSection}>
          <div className={styles.endContent}>
            <span>You&apos;ve reached the end of the monolog.</span>
            <div className={styles.endQuote}>
              &ldquo;A journey of a thousand miles begins <br /> with a single
              step.&rdquo; — Lao Tzu
            </div>
          </div>
        </div>
      </main>
      <LitBackToTopButton />
    </div>
  );
}
