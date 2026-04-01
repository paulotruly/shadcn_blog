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
import { Settings2 } from "lucide-react"
import { createColumnHelper } from "@tanstack/react-table"
import { getPostsWithTotal } from '../api/posts'
import PaginationComponent from '@/components/Pagination'

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
    cell: info => info.getValue().join(', '),
  }),

  columnHelper.accessor('reactions.likes', {
    header: () => 'Likes',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('reactions.dislikes', {
    header: () => 'Dislikes',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('views', {
    header: () => 'Views',
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('config', {
    header: () => null,
    cell: info => info.getValue(),
  }),
] as const

function DashboardPosts() {
  const POST_PER_PAGE = 15

  const search = useSearch({ from: '/dashboard/posts' })
  const page = search.page ?? 1
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const totalPages = Math.ceil(totalPosts / POST_PER_PAGE)

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
                  <TableCell>{post.tags.join(', ')}</TableCell>
                  <TableCell>{post.reactions.likes}</TableCell>
                  <TableCell>{post.reactions.dislikes}</TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell>
                    <Settings2 size={17} className='text-slate-300 cursor-pointer hover:text-slate-400 transition-colors'></Settings2>
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
    </div>
  )
}

export default DashboardPosts
