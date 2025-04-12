// app/sanity/lib/queries.ts
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    "author": author->name,
    publishedAt
  }`;
  
  export const POST_QUERY = `*[_type == "post" && lower(slug.current) == lower($slug)][0] {
    title,
    slug,
    "author": author->name,
    publishedAt,
    body
  }`;
  
  export const POST_SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`;
  
  export const PREV_NEXT_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug
  }`;