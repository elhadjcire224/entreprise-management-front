import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import api from '@/lib/api';
import { Company, companyStatus } from "@/lib/company/company_types";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';



interface CompanyValidationModalProps {
  companyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompanyValidationModal({ companyId, isOpen, onOpenChange }: CompanyValidationModalProps) {
  const queryClient = useQueryClient();

  const { data: company, isLoading, error } = useQuery<Company>({
    queryKey: ['company', companyId],
    queryFn: () => api.get(`/companies/${companyId}`).then(res => res.data.company),
    enabled: isOpen, // Only fetch when the modal is open
  });

  const validateMutation = useMutation({
    mutationFn: (status: companyStatus.ACCEPTED | companyStatus.REJECTED) =>
      api.post(`/companies/${companyId}/validate`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["companies"]});
      toast.success(`Entreprise ${validateMutation.variables === companyStatus.ACCEPTED ? 'validée' : 'rejetée'} avec succès`);
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la validation");
    },
  });

  const handleValidate = (status: companyStatus.ACCEPTED | companyStatus.REJECTED) => {
    validateMutation.mutate(status);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Validation de l'entreprise</DialogTitle>
          <DialogDescription>Vérifiez les détails et validez ou rejetez l'entreprise.</DialogDescription>
        </DialogHeader>
        {isLoading && <div>Chargement des détails de l'entreprise...</div>}
        {error && <div>Une erreur est survenue : {(error as Error).message}</div>}
        {company && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nom</Label>
              <div className="col-span-3">{company.companyName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Représentant</Label>
              <div className="col-span-3">{company.firstNames} {company.lastName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <div className="col-span-3">{company.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Téléphone</Label>
              <div className="col-span-3">{company.phone}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Secteur</Label>
              <div className="col-span-3">{company.businessSector.name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">RCCM</Label>
              <Button variant="link" className="col-span-3 justify-start" onClick={() => window.open(`http://localhost:3333${company.paymentProofFilePath}`, '_blank')}>
                Voir le RCCM
              </Button>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Paiement</Label>
              <Button variant="link" className="col-span-3 justify-start" onClick={() => window.open(`http://localhost:3333${company.paymentProofFilePath}`, '_blank')}>
                Voir la preuve de paiement
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleValidate(companyStatus.REJECTED)} disabled={validateMutation.isPending}>
            Rejeter
          </Button>
          <Button variant="default" onClick={() => handleValidate(companyStatus.ACCEPTED)} disabled={validateMutation.isPending}>
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
