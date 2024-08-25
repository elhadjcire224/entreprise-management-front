import Loader from "@/components/loader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useBusinessSector from "@/hooks/useBusinessSector"
import { useCompanyRegistration } from "@/hooks/useCompanyRegistration"
import { CompanyFormType, companyFormSchema } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

export default function CompanyForm({setOpenDialog}:{setOpenDialog:(open:boolean)=>void}) {
  const { sectors, isLoading: sectorsLoading, error: sectorsError } = useBusinessSector()
  const { registerCompany, isLoading: isRegistering, errors: registerErrors } = useCompanyRegistration()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formValues, setFormValues] = useState<CompanyFormType | null>(null)

  const form = useForm<CompanyFormType>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      firstNames: "",
      lastName: "",
      position: "",
      email: "",
      phone: "",
      yearOfCreation: new Date().getFullYear(),
      city: "",
      municipality: "",
      businessSectorId: "",
    }
  })

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.forEach((error) => {
        form.setError(error.field as keyof CompanyFormType, {
          type: "manual",
          message: error.message,
        });
      });
    }
  }, [registerErrors, form]);

  const handleFormSubmit = (values: CompanyFormType) => {
    setFormValues(values)
    setShowConfirmDialog(true)
  }

  const handleConfirm = async () => {
    if (!formValues) return

    try {
      const result = await registerCompany({
        basicInfo: {
          companyName: formValues.companyName,
          firstNames: formValues.firstNames,
          lastName: formValues.lastName,
          position: formValues.position,
          email: formValues.email,
          phone: formValues.phone,
          yearOfCreation: formValues.yearOfCreation,
          municipality: formValues.municipality,
          city: formValues.city,
          businessSectorId: parseInt(formValues.businessSectorId),
        },
        rccmFile: formValues.rccm as File,
        paymentProofFile: formValues.paymentProof as File,
      })

      if (result.success) {
        setShowSuccessDialog(true)
        form.reset()
      } else {
        toast.error("Une erreur est survenue lors de l'enregistrement")
      }
    } finally {
      setShowConfirmDialog(false)
    }
  }

  const handleCancel = () => {
    setShowConfirmDialog(false)
    setFormValues(null)
    toast.info("Soumission annulée")
  }

  const renderFormFields = () => {
    const fields = [
      { name: "companyName", label: "Nom de l'entreprise", type: "text" },
      { name: "firstNames", label: "Prénom du représentant", type: "text" },
      { name: "lastName", label: "Nom du représentant", type: "text" },
      { name: "position", label: "Fonction du représentant", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Téléphone", type: "text" },
      { name: "yearOfCreation", label: "Année de création", type: "number" },
      { name: "city", label: "Ville", type: "text" },
      { name: "municipality", label: "Commune", type: "text" },
    ];

    return fields.map((field) => (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name as keyof CompanyFormType}
        render={({ field: fieldProps }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input
                type={field.type}
                {...fieldProps}
                onChange={field.type === "number"
                  ? (e) => fieldProps.onChange(parseInt(e.target.value))
                  : fieldProps.onChange
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {renderFormFields()}
            <FormField
              disabled={sectorsLoading || !!sectorsError}
              control={form.control}
              name="businessSectorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secteur d'activité</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.id} value={sector.id.toString()}>{sector.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rccm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RCCM</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentProof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preuve de paiement</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button variant={"destructive"} onClick={() => setOpenDialog(false)}>Annuler</Button>
            <Button type="submit" disabled={form.formState.isSubmitting || isRegistering}>
              {isRegistering && <Loader />}
              Soumettre
            </Button>
          </DialogFooter>
        </form>
      </Form>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer l'enregistrement</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir enregistrer ces informations ? En cliquant sur Oui, vous attestez être la personne ayant le pouvoir ou le mandat d'enregistrer la société.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Non</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Oui</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enregistrement réussi</AlertDialogTitle>
            <AlertDialogDescription>
              Mme/M. {formValues?.firstNames} {formValues?.lastName}, votre demande d'enregistrement de votre société {formValues?.companyName} à {formValues?.municipality} a été enregistrée. Vous recevrez votre attestation après validation de nos services.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
