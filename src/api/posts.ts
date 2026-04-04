import type { Comment, CommentsResponse, Post, PostsResponse, UserResponse } from "@/types";

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

export async function getTotalPosts(): Promise<number> {
    const response = await fetch(`${BASE_URL}/posts?limit=1`)
    const data: PostsResponse = await response.json()
    return data.total
}

export async function updatePost(id: number, data: Partial<Post>): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()
}

export async function getCommentsForPost(id: number, limit: number, skip: number): Promise<CommentsResponse> {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments?limit=${limit}&skip=${skip}`)
    return response.json()
}

export async function getComments(id: number): Promise<Comment[]> {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments`)
    const data: CommentsResponse = await response.json()
    return data.comments ?? []
}

export async function deletePost(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
    })
    return response.json()
}

export async function getUser(id: number): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/users/${id}`)
    return response.json()
}

export async function getPostsByUserId(userId: number, limit: number, skip: number): Promise<PostsResponse> {
    const response = await fetch(`${BASE_URL}/posts/user/${userId}?limit=${limit}&skip=${skip}`)
    return response.json()
}