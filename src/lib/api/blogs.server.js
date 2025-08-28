// blogs.server.js
import axios from "axios";
// Fetch categories
export async function getBlogCategories() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-categories`);
    const filteredCategories = res.data.data.filter(
      (cat) => cat?.status === 1 && cat?.show_on_homepage !== 2
    );
    return filteredCategories;
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    throw error;
  }
}

// Fetch blogs for a category slug
export async function getBlogsByCategorySlug(slug) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs/category_wise/${slug}`);
    const filteredBlogs = res.data.data.filter((blog) => blog.status === 1);
    return filteredBlogs;
  } catch (error) {
    console.error("Blogs Fetch Error:", error);
    throw error;
  }
}

export async function fetchBlogsAPI(page = 1, category = null, tag = null, existingBlogs = []) {
  try {
    let url;
    if (category && typeof category !== "object") {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs/category_wise/${category}`;
    } else if (tag) {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-tags/blog-list-using-blog-tag-slug/${tag}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs`;
    }

    const response = await axios.get(url, { params: { page } });

    let newBlogs;
    if (tag && typeof response.data === "string" && response.data.startsWith("3")) {
      const jsonString = response.data.slice(1);
      const parsedResponse = JSON.parse(jsonString);
      newBlogs = parsedResponse?.data || [];
    } else {
      newBlogs = response.data?.data || [];
    }

    const updatedBlogs = page === 1 ? newBlogs : [...existingBlogs, ...newBlogs];
    const uniqueBlogs = updatedBlogs.filter(
      (newBlog, index, self) => index === self.findIndex((blog) => blog.id === newBlog.id)
    );

    return {
      blogs: uniqueBlogs,
      hasMore: newBlogs.length > 0 && newBlogs.length >= 1,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("No Blogs available");
  }
}


export const fetchTagsAPI = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-tags/1`
  );
  return response.data.data.filter((item) => item.status !== 2) || [];
};

export const fetchCategoriesAPI = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-categories`
  );
  return response.data.data.filter((item) => item.status !== 2) || [];
};

export const fetchTopPostsAPI = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs`
  );
  return response.data.data.slice(0, 5);
};

export async function fetchBlogDetailsBySlug(slug) {
  if (!slug) throw new Error("Slug is required");

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs/showBySlug`,
      { slug: `${slug}/` }
    );

    console.log("API Response:", response.data);

    const blogData = response.data?.data?.blog; // ✅ Corrected path

    if (response.data.status === "success" && blogData) {
      // Safe parse tags
      let tags = [];
      if (blogData.blogTagArray) {
        try {
          tags = typeof blogData.blogTagArray === "string"
            ? JSON.parse(blogData.blogTagArray)
            : blogData.blogTagArray;
        } catch (parseError) {
          console.warn("Invalid tag JSON:", parseError);
        }
      }

      return {
        blog: blogData,
        tags,
        recommendedBlogs: response.data.data?.recommended_blogs || [],
      };
    } else {
      throw new Error(
        `Blog not found or invalid response: ${JSON.stringify(response.data)}`
      );
    }
  } catch (err) {
    console.error("Error fetching blog details:", err.message);
    throw err;
  }
}