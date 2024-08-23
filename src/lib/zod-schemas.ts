import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  firstNames: z.string().min(1, "Le(s) prénom(s) est/sont requis"),
  lastName: z.string().min(1, "Le nom de famille est requis"),
  position: z.string().min(1, "La position est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  yearOfCreation: z.number({required_error: "L'année est requise"}).int().min(1800, "L'année doit être valide").max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  municipality: z.string().min(1, "La commune est requise"),
  city: z.string().min(1, "La ville est requise"),
  businessSectorId: z.string({required_error: "Le secteur est requis"}),
});

export type CompanyFormData = z.infer<typeof companySchema>;
