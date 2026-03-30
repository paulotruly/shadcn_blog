import Timeline from "./Timeline"
import Navbar from "./components/Navbar"
import { useSearch } from "@tanstack/react-router"

function Home() {
  const search = useSearch({from: '/'})
  const page = search.page ?? 1

  return (
    <>
      <Navbar />
      
      <div className="flex flex-row justify-between min-h-screen">
        <div className="flex-1 min-h-screen bg-slate-950"> </div>
        <Timeline page={page}/>
        <div className="flex-1 min-h-screen bg-slate-950">  </div>
      </div>
    </>
  )
}

export default Home