import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./page.module.css";
import mdxComponents from "../components/MDXComponents";
import matter from "gray-matter";
import LitLogHeader from "../components/react/LogHeader";
import ReleaseSection from "@/components/react/ReleaseSection";

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LitLogHeader />
        <div>
          {mdxContents.map((item, index) => (
            <div key={index} className={styles.mdxContent}>
              <ReleaseSection
                date={item.frontmatter.date}
                tag={item.frontmatter.tag}
              >
                <MDXRemote source={item.content} components={mdxComponents} />
              </ReleaseSection>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
