import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoaderData, useNavigate } from '@tanstack/react-router'
import Comments from "@/components/Comments"
import { ThumbsDown, ThumbsUp, ArrowLeft } from "lucide-react"

function PostPage() {
    const { post, comments = [] } = useLoaderData({from: '/post/$id'})
    const navigate = useNavigate()
    
  return (
    <div className="flex flex-col items-center bg-slate-900 min-h-screen p-5">
        <button 
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-slate-400 mb-5 self-start ml-[calc(50%-300px)]"
        >
            <ArrowLeft size={18} />
            Go back
        </button>

        <Card className='h-auto w-[600px] bg-slate-800 p-5 border-slate-600 border text-white'>
            <CardHeader className='mt-3'>
                <CardTitle className='font-bold text-lg'> {post.title} </CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col justify-between items-start flex-1 gap-5'>
                <p> {post.body} </p>

                <div className='flex flex-row gap-5'>
                    {post.tags.map((tag: string) => (
                        <span key={tag} className='bg-slate-500 text-white text-[12px] rounded-full py-1 px-3'> 
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className='flex justify-between h-auto'>
                <div className='flex flex-row gap-5'>
                    <p> <ThumbsUp  size={16} className="inline" /> <span> {post.reactions.likes} </span> </p>
                    <p> <ThumbsDown  size={16} className="inline" /> <span> {post.reactions.dislikes} </span> </p>
                </div>

                <div className='text-slate-500'>
                    <p> Views <span> {post.views} </span> </p>
                </div>
            </CardFooter>
        </Card>

        <div className="w-[600px]">
            <Comments comments={comments} />
        </div>
    </div>
  )
}

export default PostPage