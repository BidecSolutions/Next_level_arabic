import { cookies } from "next/headers";

export async function fetchProduct(productSlug) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}listings/${productSlug}/show`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  const data = await res.json();
  return data.data;
}

// export async function fetchProductsForCategory(categoryId, page = 1) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;
//   let url = categoryId
//     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?category_id=${categoryId}&status=1&page=${page}`
//     : `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?page=${page}`;
//   const res = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch products');
//   const data = await res.json();
//   return data;
// }
export async function fetchProductsForCategory(categoryId, search = "", city = "", page = 1) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?status=1&page=${page}`;
  
  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }
  
  if (search !== "") {
    url += `&search=${encodeURIComponent(search)}`;
  }

  if (city !== "") {
    url += `&city=${encodeURIComponent(city)}`;
  }

  console.log(url)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data;
}


// export async function fetchAllListings(categoryId, categoryIdFilter, search) {
//   try {
//     const url = categoryId
//       ? `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?category_id=${categoryId}&status=1`
//       : `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?status=1`;
//     const res = await fetch(url, {
//       headers: { 'Content-Type': 'application/json' },
//       cache: 'no-store',
//     });
//     if (!res.ok) throw new Error('Failed to fetch listings: ' + res.status);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return [];
//   }
// }
export async function fetchAllListings(categoryId, categoryIdFilter, search, city) {
  try {
    const params = new URLSearchParams();

    // Apply category from URL param or filter param
    const category = categoryIdFilter || categoryId;
    if (category) params.set("category_id", category);

    params.set("status", "1");

    if (search) params.set("search", search);

    if (city) params.set("city", city);

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?${params.toString()}`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch listings: ' + res.status);
    return await res.json();
  } catch (error) {
    console.error("fetchAllListings error:", error);
    return { data: { data: [] } }; // Return fallback structure
  }
}


export async function fetchListingsByReservePrice(reservePrice) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}listings?reserve_price=${reservePrice}&status=1`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch listings: ' + res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
} 