import api from '@/lib/api';
import { useState } from 'react';

type CompanyRegistrationData = {
  basicInfo: {
    companyName: string;
    firstNames: string;
    lastName: string;
    position: string;
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

type SimpleError = {
  message: string;
  field: string;
  rule: string;
}

export const useCompanyRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SimpleError[]>([]);

  const registerCompany = async (data: CompanyRegistrationData) => {
    setIsLoading(true);
    setErrors([]);

    try {
      // Étape 1 : Initialisation
      const initResponse = await api.post('/companies', data.basicInfo);
      const { registrationToken, companyId } = initResponse.data;

      // Étape 2 : Upload des fichiers
      const formDataRCCM = new FormData();
      formDataRCCM.append('rccm', data.rccmFile);
      formDataRCCM.append('registrationToken', registrationToken);
      await api.post(`/companies/${companyId}/rccm`, formDataRCCM, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const formDataPayment = new FormData();
      formDataPayment.append('paymentFile', data.paymentProofFile);
      formDataPayment.append('registrationToken', registrationToken);
      await api.post(`/companies/${companyId}/payment-proof`, formDataPayment, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Étape 3 : Finalisation
      await api.post(`/companies/${companyId}/finalize`, { registrationToken });

      return { success: true };
    } catch (error: any) {
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        setErrors(error.response.data.errors.map((err: any) => ({
          message: err.message,
          field: err.field,
          rule: err.rule
        })));
      } else {
        setErrors([{ message: "Une erreur est survenue lors de l'enregistrement", field: "global", rule: "unknown" }]);
      }
      return { success: false, errors };
    } finally {
      setIsLoading(false);
    }
  };

  return { registerCompany, isLoading, errors };
};
