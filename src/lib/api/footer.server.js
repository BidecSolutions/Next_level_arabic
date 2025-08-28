import axios from "axios";

export async function getPopularSearches() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/popular-searches/show-popular-search-in-footer/1`
    );

    const filtered = res.data.data.filter(
      (item) => item.status === 1 && item.show_footer === 1
    );

    return filtered;
  } catch (err) {
    console.error("Footer nav fetch error", err);
    return [];
  }
}
