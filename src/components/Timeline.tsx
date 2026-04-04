import '../index.css'
import PostBlog from './PostBlog'
import { getPostsWithTotal } from '../api/posts'
import type { Post as PostType } from '../types'
import { useEffect, useState } from 'react'
import PaginationComponent from './Pagination'
import { useNavigate } from '@tanstack/react-router'


interface TimelineProps{
  page: number
}

function Timeline({page}: TimelineProps) {
  const [totalPosts, setTotalPosts] = useState(0)
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const totalPages = Math.ceil(totalPosts / 10)

  const handleClick = (id: number) => {
    navigate({ to: `/post/${id}`, params: { id } })
  }

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const skip = (page - 1) * 10
      const data = await getPostsWithTotal(10, skip)
      setPosts(data.posts)
      setTotalPosts(data.total)
      setLoading(false)
    }
    fetchPosts()
  }, [page])

  return (
    <main className="flex flex-col w-full max-w-[720px] gap-6 items-center py-12 px-4">

      {/* Posts */}
      <div className="flex flex-col w-full justify-center items-center gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
            <p className='text-slate-500 text-sm'>Carregando posts...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostBlog key={post.id} post={post} onClick={() => handleClick(post.id)}/>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className='text-slate-500'>Nenhum post encontrado.</p>
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="mt-4">
        <PaginationComponent currentPage={page} totalPages={totalPages}/>
      </div>
    </main>
  )
}

export default Timeline
