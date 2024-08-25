import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company_register')({
  component: () => CompanyRegister
})

function CompanyRegister() {

}
