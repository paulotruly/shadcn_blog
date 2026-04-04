import '../index.css'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'
import type { Post } from "../types"
import { ThumbsDown, ThumbsUp, Eye } from 'lucide-react'

interface PostProps {
    post: Post
    onClick?: () => void
}

function PostBlog({post, onClick}: PostProps) {
  return (
    <Card 
      className='w-full max-w-[640px] bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700 hover:cursor-pointer transition-all duration-300 card-hover' 
      onClick={onClick}
    >
        <CardHeader className='pb-3'>
            <CardTitle className='font-semibold text-lg text-slate-100 leading-snug'> 
                {post.title} 
            </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col justify-between items-start flex-1 gap-4'>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3"> 
                {post.body} 
            </p>

            <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                    <span 
                        key={tag} 
                        className='bg-slate-800/80 text-slate-400 text-[11px] font-medium rounded-full py-1.5 px-3 border border-slate-700/50' 
                    > 
                        #{tag}
                    </span>
                ))}
            </div>
        </CardContent>

        <CardFooter className='flex justify-between items-center pt-4 border-t border-slate-800'>
            <div className='flex items-center gap-4 text-slate-500 text-sm'>
                <span className='flex items-center gap-1.5'>
                    <ThumbsUp size={14} /> 
                    <span className="text-slate-400">{post.reactions.likes}</span>
                </span>
                <span className='flex items-center gap-1.5'>
                    <ThumbsDown size={14} /> 
                    <span className="text-slate-400">{post.reactions.dislikes}</span>
                </span>
            </div>

            <div className='flex items-center gap-1.5 text-slate-500 text-sm'>
                <Eye size={14} />
                <span>{post.views}</span>
            </div>
        </CardFooter>
    </Card>
  )
}

export default PostBlog
