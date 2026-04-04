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
import { Settings2, PencilIcon, TrashIcon, ThumbsUp, ThumbsDown } from "lucide-react"
import { createColumnHelper } from "@tanstack/react-table"
import { deletePost, getPostsWithTotal } from '../api/posts'
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

const columnHelper = createColumnHelper<Post>()

const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('title', {
    header: () => 'Título',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('body', {
    header: () => 'Conteúdo',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('userId', {
    header: () => 'User ID',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('tags', {
    header: () => 'Tags',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('reactions', {
    header: () => 'Reactions',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('views', {
    header: () => 'Views',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('views', {
    header: () => null,
    cell: info => info.getValue(),
  }),
] as const

function DashboardPosts() {
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
    setIsDeleting(true)
    await deletePost(postToDelete.id)
    setPosts(posts.filter(p => p.id !== postToDelete.id)) // não entendi isso
    setDeleteDialogOpen(false)
    setPostToDelete(null)
    setIsDeleting(false)
  }

  useEffect(() => {
    async function fetchPosts() {
        setLoading(true)
        const skip = (page - 1) * POST_PER_PAGE
        const data = await getPostsWithTotal(POST_PER_PAGE, skip)
        setPosts(data.posts)
        setTotalPosts(data.total)
        setLoading(false)
    }
    fetchPosts()
  }, [page]) 

  return (
    <div className="w-full overflow-x-auto">
      <Table className='text-slate-400 text-md mb-5'>
        
        <TableHeader className='bg-slate-400 text-slate-900'>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={`column-${index}`}>
                {typeof column.header === 'function' 
                  ? (column.header as (() => string))() 
                  : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Carregando posts...
              </TableCell>
            </TableRow>
          ) : (
            posts.length > 0 ? (
              posts.map((post) => (
                <TableRow className='hover:bg-slate-300/10'  key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>
                    {post.title.length > 30 
                      ? post.title.slice(0, 30) + '...' 
                      : post.title}
                  </TableCell>

                  <TableCell>
                    {post.body.length > 35 
                      ? post.body.slice(0, 35) + '...' 
                      : post.body}
                  </TableCell>

                  <TableCell>{post.userId}</TableCell>

                  <TableCell>{post.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-slate-700 text-slate-200 px-2 py-1 rounded-full text-xs mr-1">
                      {tag}
                    </span>
                  ))}</TableCell>

                  <TableCell>
                    <div className="flex items-center">
                      <span className='w-20'> <ThumbsUp  size={16} className="inline" /> {post.reactions.likes} </span>
                      <span> <ThumbsDown size={16} className="inline" /> {post.reactions.dislikes} </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>{post.views}</TableCell>


                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="data-[state=open]:bg-slate-700/50">
                          <Settings2 size={17} className='text-slate-400 hover:text-slate-200 transition-colors' />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className='bg-slate-800 border-slate-700 text-slate-200 w-40' align="end">
                        <DropdownMenuItem className="focus:bg-slate-700 focus:text-white cursor-pointer" onClick={() => navigate({to: '/dashboard/posts/$id/edit', params: {id: post.id}})}>
                          <PencilIcon size={15} className='mr-2' />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem className="focus:bg-slate-700 focus:text-white cursor-pointer text-destructive focus:text-destructive" onClick={() => handleDeleteClick(post)}>
                          <TrashIcon size={15} className='mr-2' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum post encontrado.
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
        
      <PaginationComponent currentPage={page} totalPages={totalPages} route='/dashboard/posts' />

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
