import { fetchBlogDetailsBySlug } from "@/lib/api/blogs.server";
import NotFound from "../not-found";
import BlogDetailClient from "./BlogDetailClient"; // adjust path

const Page = async ({ params }) => {
  const { slug } = await params; // ✅ fix here

  console.log("blog", slug);

  try {
    const { blog, tags, recommendedBlogs } = await fetchBlogDetailsBySlug(slug);
    

    return (
      <BlogDetailClient
        blog={blog}
        tags={tags}
        recommendedBlogs={recommendedBlogs}
      />
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default Page;
