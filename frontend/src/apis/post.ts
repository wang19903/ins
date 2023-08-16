import { getJwtToken, getUser } from "./auth";
import { request } from "../utils/request";

export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files.image", image);
  formData.append("data", JSON.stringify({ description }));

  await fetch("/api/posts", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`
    }
  });
}

/**
 *
 * @param {string} filters
 * @returns
 */
export async function loadPosts(filters = "") {
  const response = await request(
    "/api/posts?populate=*" + (filters && `&${filters}`)
  );
  // console.log(response, "loadPosts");
  // loadPostsLikedOrFavoredByMe("likes");
  // loadPostsLikedOrFavoredByMe("favors");
  //? return undefined 不是報錯
  return response.data.map((post) => ({
    id: post?.id,
    ...post?.attributes,
    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
    user: {
      id: post?.attributes?.user?.data?.id,
      ...post?.attributes?.user?.data?.attributes
    }
  }));
}

export async function loadPostsByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`);
}

/**
 *
 * @param {"likes" | "favors"} type
 * @returns
 */
export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  //過濾用戶ID等於現在用戶ID
  // console.log(response, "loadPostsByMe");
  const response = await request(
    `/api/users/me?populate[${type}][populate][0]=image`
  );
  // console.log(response, "loadPostsLikedOrFavoredByMe");
  return response[type].map((post) => ({
    ...post,
    image: post?.image?.[0].url
  }));
}

export async function likePost(id) {
  const response = await request(`/api/posts/${id}/like`, {
    method: "PUT"
  });
  return response.data;
}

export async function favorPost(id) {
  const response = await request(`/api/posts/${id}/favor`, {
    method: "PUT"
  });
  return response.data;
}
