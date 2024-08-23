import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCompanyRegistration } from '../hooks/useCompanyRegistration';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "./ui/use-toast";

const currentYear = new Date().getFullYear();

const companySchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis"),
  representativeFirstName: z.string().min(1, "Le prénom du représentant est requis"),
  representativeLastName: z.string().min(1, "Le nom du représentant est requis"),
  representativePosition: z.string().min(1, "La position du représentant est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  yearOfCreation: z.number().int().min(1800, "L'année doit être valide").max(currentYear, "L'année ne peut pas être dans le futur"),
  municipality: z.string().min(1, "La commune est requise"),
  city: z.string().min(1, "La ville est requise"),
  businessSectorId: z.string().min(1, "Le secteur d'activité est requis"),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyForm() {
  const { register,control, handleSubmit, formState: { errors }, setError } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema)
  });
  const { toast } = useToast();
  const { registerCompany, isLoading, error } = useCompanyRegistration();
  const [rccmFile, setRccmFile] = useState<File | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApiErrors = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err: any) => {
        setError(err.field as keyof CompanyFormData, {
          type: "manual",
          message: err.message
        });
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de l'entreprise.",
        variant: "destructive",
      });
    }
  };

  const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
    if (!rccmFile || !paymentProofFile) {
      toast({
        title: "Erreur",
        description: "Veuillez uploader tous les fichiers requis.",
        variant: "destructive",
      });
      return;
    }

    try {
      setProgress(0);
      const registrationData = {
        basicInfo: {
          ...data,
          businessSectorId: Number(data.businessSectorId)
        },
        rccmFile,
        paymentProofFile
      };

      await registerCompany(registrationData);

      toast({
        title: "Succès",
        description: "Votre entreprise a été enregistrée avec succès.",
      });
      setIsDialogOpen(false);
    } catch (err) {
      handleApiErrors(err);
    }
  };

  const updateProgress = (stage: number) => {
    setProgress(stage * 33); // 3 stages, so each stage is 33%
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Enregistrer une entreprise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Enregistrez votre entreprise</DialogTitle>
          <DialogDescription>Remplissez le formulaire pour enregistrer votre entreprise.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'entreprise</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="representativeFirstName">Prénom du représentant</Label>
              <Input id="representativeFirstName" {...register("representativeFirstName")} />
              {errors.representativeFirstName && <p className="text-red-500">{errors.representativeFirstName.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="representativeLastName">Nom du représentant</Label>
              <Input id="representativeLastName" {...register("representativeLastName")} />
              {errors.representativeLastName && <p className="text-red-500">{errors.representativeLastName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="representativePosition">Position du représentant</Label>
              <Input id="representativePosition" {...register("representativePosition")} />
              {errors.representativePosition && <p className="text-red-500">{errors.representativePosition.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearOfCreation">Année de création</Label>
              <Input id="yearOfCreation" type="number" {...register("yearOfCreation", { valueAsNumber: true })} />
              {errors.yearOfCreation && <p className="text-red-500">{errors.yearOfCreation.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipality">Commune</Label>
              <Input id="municipality" {...register("municipality")} />
              {errors.municipality && <p className="text-red-500">{errors.municipality.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" {...register("city")} />
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>
              <div className="space-y-2">
                          <Label htmlFor="businessSectorId">Secteur d'activité</Label>
                          <Controller
                            name="businessSectorId"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un secteur" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Technologies</SelectItem>
                                  <SelectItem value="2">Finance</SelectItem>
                                  <SelectItem value="3">Santé</SelectItem>
                                  <SelectItem value="4">Éducation</SelectItem>
                                  <SelectItem value="5">Agriculture</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.businessSectorId && <p className="text-red-500">{errors.businessSectorId.message}</p>}
                        </div>

          </div>
          <div className="space-y-2">
            <Label htmlFor="rccmFile">RCCM</Label>
            <Input id="rccmFile" type="file" onChange={(e) => setRccmFile(e.target.files?.[0] || null)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentProofFile">Preuve de paiement</Label>
            <Input id="paymentProofFile" type="file" onChange={(e) => setPaymentProofFile(e.target.files?.[0] || null)} />
          </div>
          {isLoading && <Progress value={progress} className="w-full" />}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Enregistrement en cours...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
