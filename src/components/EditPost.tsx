import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Save, ThumbsDown, ThumbsUp, X, Plus } from 'lucide-react'
import type { Post } from "../types"
import { updatePost } from '../api/posts'

interface PostProps {
    post?: Post
}
function EditPost({ post }: PostProps) {

    const [editedPost, setEditedPost] = useState<Post | null>(null)
    const [newTag, setNewTag] = useState('')
    const [saving, setSaving] = useState(false)

    if (!post) {
        return (
            <p className="text-white">Carregando...</p>
        )
    }

    const displayPost = editedPost || post

    function handleCancel() {
        setEditedPost(null)
        setNewTag('')
    }

    function handleChange(field: 'title' | 'body', value: string) {
        setEditedPost((prev) => {
            return ({...prev || post, [field]: value} as Post)
        })
    }

    function handleAddTag() {
        if (!newTag.trim()) return
        setEditedPost((prev) => {
            const base = prev || post
            if (!base) return prev
            return {
                ...base,
                tags: [...base.tags, newTag.trim()]
            } as Post
        })
        setNewTag('')
    }

    function handleRemoveTag(tagToRemove: string) {
        if (!post) return

        setEditedPost((prev) => {
            const base = prev || post
            return {
                ...base,
                tags: base.tags.filter(tag => tag !== tagToRemove)
            } as Post
        })
    }

    async function handleSave() {
        if (!editedPost || !post) return
        setSaving(true)
        const updated = await updatePost(post.id, editedPost)
        setEditedPost(updated)
        setSaving(false)
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4">
            <Card className='w-full max-w-2xl bg-slate-800 p-6 border-slate-600 text-white shadow-xl rounded-xl'>
                <CardHeader className='pb-6 border-b border-slate-700'>
                    <Input
                        value={editedPost?.title ?? post.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Título do post"
                        className='font-bold text-xl bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                    />
                </CardHeader>

                <CardContent className='flex flex-col gap-6 pt-6'>
                    <textarea
                        value={editedPost?.body ?? post.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        placeholder="Conteúdo do post"
                        className='w-full h-40 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder:text-slate-400 resize-none'
                    />

                    <div className='flex flex-col gap-3'>
                        <label className='text-sm text-slate-400'>Tags</label>

                        <div className='flex flex-row flex-wrap gap-2 mb-3'>
                            {displayPost.tags.map((tag) => (
                                <span key={tag} className='bg-slate-600 hover:bg-slate-700 text-white text-sm rounded-full py-1.5 px-3 flex items-center gap-1.5'>
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className='hover:text-red-300 transition-colors'
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className='flex gap-2'>
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                placeholder="Adicionar nova tag"
                                className='bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                            />

                            <Button onClick={handleAddTag} variant='secondary' size='sm'>
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className='flex gap-6 text-slate-400'>
                        <span className='flex items-center gap-1.5'>
                            <ThumbsUp size={18} className="text-slate-400" />
                            {displayPost.reactions.likes} likes
                        </span>
                        <span className='flex items-center gap-1.5'>
                            <ThumbsDown size={18} className="text-slate-400" />
                            {displayPost.reactions.dislikes} dislikes
                        </span>
                    </div>
                </CardContent>

                <CardFooter className='flex justify-end gap-3 pt-6 border-t border-slate-700'>

                    <Button
                        onClick={handleCancel}
                        variant='outline'
                        className='border-slate-600 text-slate-300 hover:bg-slate-700'
                    >
                        <X size={16} className='mr-2' />
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSave}
                        className='bg-slate-600 hover:bg-slate-700'
                        disabled={saving}
                    >
                        <Save size={16} className='mr-2' />
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditPost
