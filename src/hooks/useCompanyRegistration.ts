import { useState } from 'react';
import api from '../lib/api';

interface CompanyRegistrationData {
  basicInfo: {
    name: string;
    representativeFirstName: string;
    representativeLastName: string;
    representativePosition: string;
    email: string;
    phone: string;
    yearOfCreation: number;
    municipality: string;
    city: string;
    businessSectorId: number;
  };
  rccmFile: File;
  paymentProofFile: File;
}

export const useCompanyRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerCompany = async (data: CompanyRegistrationData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Étape 1 : Initialisation
      const initResponse = await api.post('/companies', data.basicInfo);
      const registrationToken : string = initResponse.data.registrationToken;
      const companyId : string = initResponse.data.companyId;

      // Étape 2 : Upload des fichiers
      const formDataRCCM = new FormData();
      formDataRCCM.append('rccm', data.rccmFile);
      formDataRCCM.append('registrationToken', registrationToken);
      await api.post(`/companies/${companyId}/rccm`, formDataRCCM,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const formDataPayment = new FormData();
      formDataPayment.append('paymentFile', data.paymentProofFile);
      formDataPayment.append('registrationToken', registrationToken);
      await api.post(`/companies/${companyId}/payment-proof`, formDataPayment,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Étape 3 : Finalisation
      const finalResponse = await api.post(`/companies/${companyId}/finalize`, { registrationToken });

      return finalResponse.data;
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement de l'entreprise.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerCompany, isLoading, error };
};
