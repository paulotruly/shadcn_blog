import { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import type { Post } from "../types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Settings2, PencilIcon, TrashIcon, ThumbsUp, ThumbsDown, FileText } from "lucide-react"
import { deletePost, getPostsByUserId } from '../api/posts'
import PaginationComponent from '@/components/Pagination'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from '@tanstack/react-router'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import { useAuth } from '@/context/AuthContext'

function DashboardPosts() {
  const { userDetails } = useAuth()
  const navigate = useNavigate()

  const POST_PER_PAGE = 15

  const search = useSearch({ from: '/dashboard/posts' })
  const page = search.page ?? 1
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const totalPages = Math.ceil(totalPosts / POST_PER_PAGE)

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return
    const postIdToDelete = postToDelete.id
    setIsDeleting(true)
    await deletePost(postToDelete.id)
    setPosts(currentPosts => currentPosts.filter(p => p.id !== postIdToDelete))
    setDeleteDialogOpen(false)
    setPostToDelete(null)
    setIsDeleting(false)
  }

  useEffect(() => {
    async function fetchPosts() {
      if (!userDetails?.id) return
      setLoading(true)
      const skip = (page - 1) * POST_PER_PAGE
      const data = await getPostsByUserId(userDetails.id, POST_PER_PAGE, skip)
      setPosts(data.posts)
      setTotalPosts(data.total)
      setLoading(false)
    }
    
    fetchPosts()
  }, [page, userDetails?.id])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/50">
            <FileText size={20} className="text-slate-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Posts</h1>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800/50 bg-slate-900/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800/50 hover:bg-transparent">
              <TableHead className="text-slate-400 font-medium">ID</TableHead>
              <TableHead className="text-slate-400 font-medium">Título</TableHead>
              <TableHead className="text-slate-400 font-medium hidden lg:table-cell">Conteúdo</TableHead>
              <TableHead className="text-slate-400 font-medium hidden xl:table-cell">Tags</TableHead>
              <TableHead className="text-slate-400 font-medium">Reações</TableHead>
              <TableHead className="text-slate-400 font-medium hidden md:table-cell">Views</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Carregando posts...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post.id} className="border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                  <TableCell className="font-mono text-slate-500">{post.id}</TableCell>
                  <TableCell className="font-medium text-slate-200 max-w-[200px] truncate">
                    {post.title.length > 30 
                      ? post.title.slice(0, 30) + '...' 
                      : post.title}
                  </TableCell>

                  <TableCell className="text-slate-400 max-w-[200px] truncate hidden lg:table-cell">
                    {post.body.length > 35 
                      ? post.body.slice(0, 35) + '...' 
                      : post.body}
                  </TableCell>

                  <TableCell className="hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-block bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs border border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-400 text-sm"> 
                        <ThumbsUp size={14} /> {post.reactions.likes} 
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-sm"> 
                        <ThumbsDown size={14} /> {post.reactions.dislikes} 
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-slate-500 hidden md:table-cell">{post.views}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-200 hover:bg-slate-800">
                          <Settings2 size={16} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200 w-40" align="end">
                        <DropdownMenuItem className="focus:bg-slate-700 focus:text-slate-100 cursor-pointer" onClick={() => navigate({to: '/dashboard/posts/$id/edit', params: {id: post.id}})}>
                          <PencilIcon size={15} className="mr-2" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem className="focus:bg-red-900/30 focus:text-red-400 cursor-pointer text-red-400" onClick={() => handleDeleteClick(post)}>
                          <TrashIcon size={15} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <FileText size={32} className="text-slate-700" />
                    <p className="text-slate-500">Nenhum post encontrado.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        
      <div className="flex justify-center">
        <PaginationComponent currentPage={page} totalPages={totalPages} route="/dashboard/posts" />
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        postTitle={postToDelete?.title || ""}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default DashboardPosts
