export interface Reactions {
    likes: number
    dislikes: number
}

export interface Post {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    reactions: Reactions
    views: number
}

export interface PostsResponse {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface PublicUser {
  id: number;
  username: string;
  fullName: string;

}
export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: PublicUser;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  image: string
}