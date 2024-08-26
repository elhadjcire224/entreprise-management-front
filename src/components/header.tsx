import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/contexts/AuthProvider"


import { Link } from "@tanstack/react-router"
import { Package2Icon, PowerIcon } from "lucide-react"

export default function Header() {
  const {logout,user} = useAuthContext()
  return (<header className="flex h-16 items-center justify-between border-b border-muted border-2 px-6 dark:border-muted/40">
          <Link to="/" className="flex items-center gap-2" >
            <Package2Icon className="h-6 w-6" />
            <span className="font-semibold">Acme Inc</span>
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">

                <span className="font-semibold">{user.name}</span>
                  <div>{user.email}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <PowerIcon className="h-5 w-5" />
              </Button>
            </div>
          )}


        </header>
  )
}
