import './index.css'
import PostBlog from './PostBlog'
import { getPosts } from './api/posts'
import type { Post as PostType } from './types'
import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts(10, 0)
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <main className="flex flex-col gap-5 items-center min-h-screen p-10 bg-slate-950">
      {loading ? (
        <p className='text-white font-light'> Carregando.. </p>
      ) : (
        posts.map((post) => (
          <PostBlog key={post.id} post={post} />
        ))
      )}
    </main>
  )
}

export default App