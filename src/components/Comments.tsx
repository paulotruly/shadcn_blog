import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Comment } from "@/types"
import { Heading3, ThumbsUp } from "lucide-react"

interface CommentsProps {
    comments: Comment[]
}

export default function Comments({ comments }: CommentsProps) {
    if (comments.length === 0) {
        return (
            <p className="flex justify-center pt-5 text-md font-light text-slate-500">No comments yet.</p>
        )
    }
    return (
        <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-md font-light text-slate-500">
                Comments ({comments.length})
            </h3>
            {comments.map((comment) => (
                <Card key={comment.id} className="bg-slate-700 border-slate-500 border">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-white">
                                {comment.user.fullName}
                            </span>
                            <span className="text-slate-400 text-sm">
                                @{comment.user.username}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-200">{comment.body}</p>
                        <span className="flex justify-end gap-2 text-slate-400 text-sm mr-1 mt-3 mb-1">
                            {comment.likes} <ThumbsUp  size={16} className="inline" />
                        </span>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
