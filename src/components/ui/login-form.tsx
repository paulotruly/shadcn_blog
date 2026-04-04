import { getToken, setToken } from "@/lib/cookies"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import type { AuthResponse } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowLeft, LogIn } from "lucide-react"

export function LoginForm({

  className,
  ...props
}: React.ComponentProps<"div">) {

  const token = getToken()

  const { login, fetchUserDetails } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [token, navigate])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
    })

    const data: AuthResponse = await response.json()

    if (response.ok) {
      login(data)
      fetchUserDetails(data.id)
      setToken(data.accessToken)
      navigate({ to: '/dashboard' })
    } else {
      console.error("Login failed: ", data)
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white", className)} {...props}>
        
        {/* Botão voltar */}
        <button 
          onClick={() => navigate({ to: '/' })}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Voltar</span>
        </button>

      <div className="w-full max-w-[400px] px-4">
        
        {/* Card de login */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-slate-100">Login</CardTitle>
            <CardDescription className="text-slate-500">
              Use suas credenciais para acessar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="username" className="text-slate-400">Usuário</FieldLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  placeholder="seu nome de usuário"
                  className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-slate-500 focus:ring-slate-500/20"
                  required
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="password" className="text-slate-400">Senha</FieldLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-slate-500 focus:ring-slate-500/20"
                  required
                />
              </Field>
              
              <Button 
                type="submit" 
                className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 font-medium transition-colors mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn size={18} />
                    Entrar
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Dica */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Demo: use <span className="text-slate-500">adrianf</span> / <span className="text-slate-500">adrianf</span>
        </p>
      </div>
    </div>
  )
}
