import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { useNavigate } from "@tanstack/react-router"

function Navbar() {
  const navigate = useNavigate()

  const goToLoginPage = () => {
      navigate({ to: "/login" })
    }

  return (
    <nav className="flex flex-row justify-between items-center h-24 px-8 min-w-full bg-slate-400">
      
      <h1 className="text-3xl font-bold font-ti text-slate-800"> blog </h1>

      <Link to="/login">
        <Button onClick={goToLoginPage}>Login</Button>
      </Link>
      
    </nav>
  )
}

export default Navbar
