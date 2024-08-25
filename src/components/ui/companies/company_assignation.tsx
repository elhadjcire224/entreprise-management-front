import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface AssignValidatorModalProps {
  companyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Validator = {
  id: number;
  name: string;
};

export function AssignValidatorModal({ companyId, isOpen, onOpenChange }: AssignValidatorModalProps) {
  const [selectedValidator, setSelectedValidator] = useState<string | undefined>();
  const queryClient = useQueryClient();

  const { data: validators, isLoading } = useQuery<Validator[]>({
    queryKey: ['validators'],
    queryFn: () => api.get('/validators').then(res => res.data),
  });

  const assignMutation = useMutation({
    mutationFn: (validatorId: number) =>
      api.post(`/companies/${companyId}/assign`, { validatorId }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["companies"]});
      toast.success("Validateur assigné avec succès");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Erreur lors de l'assignation du validateur");
    },
  });

  const handleAssign = () => {
    if (selectedValidator) {
      assignMutation.mutate(parseInt(selectedValidator));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assigner un validateur</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="validator" className="text-right">
              Validateur
            </Label>
            <Select
              value={selectedValidator}
              onValueChange={setSelectedValidator}
              disabled={isLoading}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un validateur" />
              </SelectTrigger>
              <SelectContent>
                {validators?.map((validator) => (
                  <SelectItem key={validator.id} value={validator.id.toString()}>
                    {validator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleAssign} disabled={!selectedValidator || assignMutation.isPending}>
            Assigner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
