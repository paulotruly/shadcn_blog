import '../index.css'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import type { Post } from "../types"
import { ThumbsDown, ThumbsUp } from 'lucide-react'

interface PostProps {
    post: Post
    onClick?: () => void
}

function PostBlog({post, onClick}: PostProps) {
  return (
    <Card className='h-auto w-[600px] bg-slate-800 p-5 border-slate-600 border text-white hover:bg-slate-700 hover:cursor-pointer transition-colors' onClick={onClick}>
        <CardHeader className='mt-3'>
            <CardTitle className='font-bold text-lg'> {post.title} </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col justify-between items-start flex-1 gap-5'>
            <p> {post.body} </p>

            <div className='flex flex-row gap-5'>
                {post.tags.map((tag) => (
                    <span key={tag} className='bg-slate-500 text-white text-[12px] rounded-full py-1 px-3'> 
                        {tag}
                    </span>
                ))}
            </div>
        </CardContent>

        <CardFooter className='flex justify-between h-auto'>
            <div className='flex flex-row justify-center items-center gap-3'>
                <ThumbsUp  size={16} className="inline" /> <span> {post.reactions.likes} </span>
                <ThumbsDown  size={16} className="inline" /> <span> {post.reactions.dislikes} </span>
            </div>

            <div className='text-slate-500'>
                <p> Views <span> {post.views} </span> </p>
            </div>
        </CardFooter>
    </Card>
  )
}

export default PostBlog
