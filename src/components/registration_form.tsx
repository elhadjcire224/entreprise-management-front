import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { RegistrationFormValues, registrationSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


export function RegistrationForm() {
  const { register,  isAdmin } = useAuth();


  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

     window.location.replace('/admin/companies')
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        errors.forEach((error: any) => {
          if (error.field === 'email' && error.rule === 'database.unique') {
            form.setError('email', {
              type: 'manual',
              message: 'Cette adresse email est déjà utilisée'
            });
          }
        });
      } else {
        setRegistrationError("Une erreur est survenue lors de l'inscription");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input {...field} className="pl-10" placeholder="Votre nom complet" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input {...field} type="email" className="pl-10" placeholder="vous@exemple.com" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input {...field} type="password" className="pl-10" placeholder="••••••••" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input {...field} type="password" className="pl-10" placeholder="••••••••" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {registrationError && (
          <Alert variant="destructive">
            <AlertDescription>{registrationError}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          { form.formState.isSubmitting ? "Inscription en cours..." : "S'inscrire" }
        </Button>
      </form>
    </Form>
  );
}
