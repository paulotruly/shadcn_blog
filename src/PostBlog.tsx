import './index.css'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card'
import type { Post } from "./types"

interface PostProps {
    post: Post
}

function PostBlog({post}: PostProps) {
  return (
    <Card className='h-[400px] w-[600px] bg-slate-800 p-5 border-slate-600 border text-white'>
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
            <div className='flex flex-row gap-5'>
                <p> Likes <span> {post.reactions.likes} </span> </p>
                <p> Dislikes <span> {post.reactions.dislikes} </span> </p>
            </div>

            <div className='text-slate-500'>
                <p> Views <span> {post.views} </span> </p>
            </div>
        </CardFooter>
    </Card>
  )
}

export default PostBlog
