import Timeline from "./Timeline"

function Home() {
  return (
    <div className="flex flex-row justify-between min-h-screen">
      <div className="flex-1 min-h-screen bg-pink-400"> </div>
      <Timeline/>
      <div className="flex-1 min-h-screen bg-purple-400">  </div>
    </div>
  )
}

export default Home