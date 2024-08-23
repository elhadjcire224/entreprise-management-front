import CompanyForm from '@/components/company_form'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <Home />,
})

function Home() {
   return (
      <div className="flex min-h-[100dvh] flex-col dark:bg-background dark:text-foreground">
        <header className="bg-primary px-4 py-3 md:px-6 md:py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="#" className="flex items-center" >
              <MountainIcon className="h-6 w-6 text-primary-foreground" />
              <span className="ml-2 text-lg font-bold text-primary-foreground">Enregistrez.com</span>
            </Link>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="hidden md:inline-flex rounded-full px-6 py-3 font-medium transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-background dark:text-primary-foreground dark:hover:bg-primary/20"
              >
                <Link  to='/login'> Connexion</Link>
              </Button>
              <Button className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80">
                <Link  to='/register'>S'enregistrer</Link>
              </Button>
              <Button>
                <Link  to='/admin'> Administrer</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="bg-primary py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
                  Enregistrez votre entreprise en quelques clics
                </h1>
                <p className="mt-4 text-lg text-primary-foreground">
                  Simplifiez le processus d'enregistrement de votre entreprise avec notre plateforme en ligne rapide et
                  sécurisée.
                </p>
                <div className="mt-8">
                <CompanyForm/>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-background py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Pourquoi choisir Enregistrez.com ?
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col items-start">
                    <CheckIcon className="h-8 w-8 text-primary" />
                    <h3 className="mt-2 text-lg font-medium text-foreground">Rapide et facile</h3>
                    <p className="mt-2 text-muted-foreground">
                      Enregistrez votre entreprise en quelques minutes seulement.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <ShieldIcon className="h-8 w-8 text-primary" />
                    <h3 className="mt-2 text-lg font-medium text-foreground">Sécurité garantie</h3>
                    <p className="mt-2 text-muted-foreground">
                      Vos informations sont protégées avec nos mesures de sécurité avancées.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <BriefcaseIcon className="h-8 w-8 text-primary" />
                    <h3 className="mt-2 text-lg font-medium text-foreground">Assistance dédiée</h3>
                    <p className="mt-2 text-muted-foreground">
                      Notre équipe d'experts est là pour vous guider à chaque étape.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <RocketIcon className="h-8 w-8 text-primary" />
                    <h3 className="mt-2 text-lg font-medium text-foreground">Démarrez rapidement</h3>
                    <p className="mt-2 text-muted-foreground">
                      Commencez à faire des affaires dès que votre entreprise est enregistrée.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-muted px-4 py-6 md:px-6 md:py-8">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <MountainIcon className="h-6 w-6 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium text-muted-foreground">Enregistrez.com</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline" >
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline" >
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline" >
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    )
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
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
