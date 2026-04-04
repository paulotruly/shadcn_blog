import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoaderData, useNavigate } from '@tanstack/react-router'
import Comments from "@/components/Comments"
import { ThumbsDown, ThumbsUp, ArrowLeft, Eye } from "lucide-react"

function PostPage() {
    const { post, comments = [] } = useLoaderData({from: '/post/$id'})
    const navigate = useNavigate()
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        
        {/* Botão voltar */}
        <div className="max-w-[680px] mx-auto mb-8">
            <button 
            onClick={() => navigate({ to: '/' })}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Voltar para timeline</span>
            </button>
        </div>

        {/* Post principal */}
        <Card className='max-w-[680px] mx-auto bg-slate-900/50 border-slate-800 text-slate-200'>
            <CardHeader className='pb-4'>
                <CardTitle className='font-bold text-2xl text-slate-100 leading-tight'> 
                    {post.title} 
                </CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col justify-between items-start flex-1 gap-6'>
                <p className="text-slate-300 leading-relaxed text-base"> 
                    {post.body} 
                </p>

                <div className='flex flex-wrap gap-2'>
                    {post.tags.map((tag: string) => (
                        <span 
                            key={tag} 
                            className='bg-slate-800/80 text-slate-400 text-xs font-medium rounded-full py-1.5 px-3 border border-slate-700/50' 
                        > 
                            #{tag}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className='flex justify-between items-center pt-6 mt-4 border-t border-slate-800'>
                <div className='flex items-center gap-6'>
                    <span className='flex items-center gap-2 text-slate-400'>
                        <ThumbsUp size={16} /> 
                        <span className="font-medium">{post.reactions.likes}</span>
                    </span>
                    <span className='flex items-center gap-2 text-slate-400'>
                        <ThumbsDown size={16} /> 
                        <span className="font-medium">{post.reactions.dislikes}</span>
                    </span>
                </div>

                <div className='flex items-center gap-2 text-slate-500'>
                    <Eye size={16} />
                    <span className="text-sm">{post.views} visualizações</span>
                </div>
            </CardFooter>
        </Card>

        {/* Comments */}
        <div className="max-w-[680px] mx-auto mt-8">
            <Comments comments={comments} />
        </div>
    </div>
  )
}

export default PostPage
