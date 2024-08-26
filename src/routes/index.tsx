import CompanyRegistrationDialog from '@/components/company_registration_dialog'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <Home />,
})

 function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" >
          <MountainIcon className="h-6 w-6 text-primary-foreground" />
          <span className="sr-only">Enregistrement d'entreprises</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <Link
            to='/register'
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"

          >
            S'inscrire
          </Link>
          <Link
            to='/login'
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"

          >
            Connexion
          </Link>
          <Link
            to='/admin/companies'
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"

          >
            Administrer
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Enregistrez votre entreprise en quelques clics
              </h1>
              <p className="max-w-[600px] mx-auto text-lg md:text-xl">
                Notre plateforme simplifiée vous permet de créer votre entreprise rapidement et en toute sécurité.
              </p>
              <CompanyRegistrationDialog/>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <RocketIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Enregistrement rapide</h3>
                <p className="text-muted-foreground">Créez votre entreprise en quelques minutes seulement.</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Sécurité garantie</h3>
                <p className="text-muted-foreground">
                  Vos données sont protégées par nos systèmes de sécurité avancés.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <WalletIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Tarifs compétitifs</h3>
                <p className="text-muted-foreground">Des forfaits adaptés à tous les budgets d'entreprise.</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <UsersIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Assistance dédiée</h3>
                <p className="text-muted-foreground">Notre équipe est à votre écoute pour vous guider.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Enregistrement d'entreprises. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs text-muted-foreground hover:underline underline-offset-4" >
            Mentions légales
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:underline underline-offset-4" >
            Politique de confidentialité
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function ShieldIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}
