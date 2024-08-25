import * as z from "zod";
export const companyFormSchema = z.object({
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  firstNames: z.string().min(1, "Le prénom du représentant est requis"),
  lastName: z.string().min(1, "Le nom du représentant est requis"),
  position: z.string().min(1, "La fonction du représentant est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  yearOfCreation: z.number().int().min(1800, "L'année doit être valide").max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  city: z.string().min(1, "La ville est requise"),
  municipality: z.string().min(1, "La commune est requise"),
  businessSectorId: z.string().min(1, "Le secteur d'activité est requis"),
  rccm: z.any(),
  paymentProof: z.any(),
})

export type CompanyFormType = z.infer<typeof companyFormSchema>

export const registrationSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
