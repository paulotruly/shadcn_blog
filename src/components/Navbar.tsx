import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="group flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors">
            blog
          </span>
        </Link>

        <Link to="/login">
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all duration-200"
          >
            Entrar
          </Button>
        </Link>
        
      </div>
    </nav>
  )
}

export default Navbar
