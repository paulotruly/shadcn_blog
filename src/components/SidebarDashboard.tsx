import { Link, useNavigate, Outlet } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar"
import { FileText, LogOut, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { removeToken } from "@/lib/cookies"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  { label: "Posts", icon: FileText, to: "/dashboard/posts" },
]

function SidebarDashboard() {
  const { userDetails, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    removeToken()
    navigate({ to: "/login" })
  }

  return (
    <SidebarProvider className="!bg-slate-950">
      <Sidebar variant="inset" className="bg-slate-900 border-r border-slate-800/50 w-64">
        
        <SidebarHeader className="border-b border-slate-800/50">
          <div className="flex items-center gap-3 px-4 py-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/50">
              <LayoutDashboard size={18} className="text-slate-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">Dashboard</h2>
              <p className="text-xs text-slate-500">Gerenciamento</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-slate-900">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 data-[active=true]:bg-slate-800 data-[active=true]:text-slate-100">
                      <Link to={item.to}>
                        <item.icon size={18} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-slate-800/50 p-4">
          <div className="flex items-center gap-3">
            
            <Avatar className="h-9 w-9 border border-slate-700/50">
              <AvatarImage src={userDetails?.image} alt={userDetails?.firstName} />
              <AvatarFallback className="bg-slate-800 text-slate-300 text-sm">
                {userDetails?.firstName?.charAt(0) || userDetails?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {userDetails?.firstName} {userDetails?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                @{userDetails?.username}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
              title="Sair"
            >
              <LogOut size={18} className="text-slate-500 group-hover:text-slate-300" />
            </button>
          </div>
        </SidebarFooter>

      </Sidebar>

      <SidebarInset className="!bg-slate-950 min-h-screen">
        <div className="p-8 bg-slate-950 min-h-screen">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarDashboard
