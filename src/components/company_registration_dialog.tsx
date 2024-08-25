import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"
import CompanyForm from "./company_registration_form"


export default function CompanyRegistrationDialog() {
  const [openDialog, setOpenDialog] = useState(false)


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>J'enregistrer mon entreprise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Enregistrez votre entreprise</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour créer votre entreprise.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm setOpenDialog={ setOpenDialog} />
      </DialogContent>
    </Dialog>
  )
}
