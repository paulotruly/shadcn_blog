import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Comment } from "@/types"
import { MessageCircle, Heart } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

interface CommentsProps {
    comments: Comment[]
}

export default function Comments({ comments }: CommentsProps) {
    if (comments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
                <MessageCircle size={32} className="text-slate-700" />
                <p className="text-slate-600 text-sm">Nenhum comentário ainda.</p>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-6">
            
            {/* Header dos comentários */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/50">
                <MessageCircle size={18} className="text-slate-500" />
                <h3 className="text-slate-300 font-medium">
                    Comentários 
                    <span className="text-slate-500 font-normal ml-2">({comments.length})</span>
                </h3>
            </div>

            {/* Lista de comentários */}
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <Card key={comment.id} className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700/50 transition-colors">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 border border-slate-700/50">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} />
                                    <AvatarFallback className="bg-slate-800 text-slate-400 text-xs">
                                        {comment.user.fullName?.charAt(0) || '?'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-200 text-sm">
                                        {comment.user.fullName}
                                    </span>
                                    <span className="text-slate-500 text-xs">
                                        @{comment.user.username}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <p className="text-slate-300 text-sm leading-relaxed">{comment.body}</p>
                            
                            <div className="flex items-center gap-1.5 mt-4 text-slate-500">
                                <Heart size={14} />
                                <span className="text-xs">{comment.likes}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
