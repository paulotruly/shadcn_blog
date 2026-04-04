import Timeline from "../components/Timeline"
import Navbar from "../components/Navbar"
import { useSearch } from "@tanstack/react-router"

function Home() {
  const search = useSearch({from: '/'})
  const page = search.page ?? 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <div className="flex justify-center">
        <Timeline page={page}/>
      </div>
    </div>
  )
}

export default Home
