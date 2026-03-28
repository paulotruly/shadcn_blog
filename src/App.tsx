import './index.css'
import PostBlog from './PostBlog'
import { getPosts, getPostsWithTotal } from './api/posts'
import type { Post as PostType } from './types'
import { useEffect, useState } from 'react'
import PaginationComponent from './components/Pagination'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)

  const totalPages = Math.ceil(totalPosts / 10)

  useEffect(() => {
    async function fetchPosts() {
      const skip = (currentPage - 1) * 10
      const data = await getPostsWithTotal(10, skip)
      setPosts(data.posts)
      setTotalPosts(data.total)
      setLoading(false)
    }
    fetchPosts()
  }, [currentPage])

  return (
    <main className="flex flex-col gap-5 items-center min-h-screen p-10 bg-slate-950">
      {loading ? (
        <p className='text-white font-light'> Carregando.. </p>
      ) : (
        posts.map((post) => (
          <PostBlog key={post.id} post={post} />
        ))
      )}

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
    </main>
  )
}

export default App