import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, MoreHorizontal, Trash2, UserPlus } from "lucide-react"
import { useState } from 'react'
import { toast } from "react-hot-toast"

import { CompanyDataTableType, companyStatus } from "@/lib/company/company_types"
import { CompanyValidationModal } from "./compagnieValidation"
import { AssignValidatorModal } from "./company_assignation"

interface ActionCellProps {
  company: CompanyDataTableType
}

export function ActionCell({ company }: ActionCellProps) {
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/companies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["companies"]})
      toast.success("Entreprise supprimée avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'entreprise")
    },
  })

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?")) {
      deleteMutation.mutate(company.id)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem disabled={company.status !== companyStatus.PENDING} onClick={() => setIsValidationModalOpen(true)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Valider
          </DropdownMenuItem>
          <DropdownMenuItem disabled={company.status !== companyStatus.PENDING} onClick={() => setIsAssignModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assigner un validateur
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompanyValidationModal
        companyId={company.id}
        isOpen={isValidationModalOpen}
        onOpenChange={setIsValidationModalOpen}
      />

      <AssignValidatorModal
        companyId={company.id}
        isOpen={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
      />
    </>
  )
}
