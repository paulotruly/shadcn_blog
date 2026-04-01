import { useLoaderData } from '@tanstack/react-router'
import EditPost from '@/components/EditPost'

function DashboardEditPostPage() {
    const post = useLoaderData({from: '/dashboard/posts/$id/edit'})

  return (
    <div>
        <EditPost post={post}/>
    </div>
  )
}

export default DashboardEditPostPage
