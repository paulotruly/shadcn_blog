import Timeline from "./Timeline"
import { useSearch } from "@tanstack/react-router"

function Home() {
  const search = useSearch({from: '/'})
  const page = search.page ?? 1

  return (
    <div className="flex flex-row justify-between min-h-screen">
      <div className="flex-1 min-h-screen bg-pink-400"> </div>
      <Timeline page={page}/>
      <div className="flex-1 min-h-screen bg-purple-400">  </div>
    </div>
  )
}

export default Home