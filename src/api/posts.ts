import type { Post, PostsResponse } from "@/types";

const BASE_URL = "https://dummyjson.com"

export async function getPosts(limit = 10, skip = 10): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`)
    const data: PostsResponse = await response.json()
    return data.posts
}

export async function getPost(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`)
    return response.json()
}

export async function getPostsWithTotal(limit: number = 10, skip: number = 0): Promise<PostsResponse> {
    const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`)
    const data: PostsResponse = await response.json()
    return data
}