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
    <main className="flex flex-col w-[650px] gap-5 items-center justify-between bg-slate-900 p-10">
      {loading ? (
        <p className='text-white font-light'> Carregando.. </p>
      ) : (
        posts.map((post) => (
          <PostBlog key={post.id} post={post} onClick={() => handleClick(post.id)}/>
        ))
      )}

      <PaginationComponent currentPage={page} totalPages={totalPages}/>
    </main>
  )
}

export default Timeline