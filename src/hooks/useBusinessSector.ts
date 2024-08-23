import api from '@/lib/api';
import { useEffect, useState } from 'react';

interface BusinessSector {
  id: number;
  name: string;
}

export function useBusinessSector() {
  const [sectors, setSectors] = useState<BusinessSector[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/business-sectors');
        setSectors(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des secteurs d\'activité');
        console.error('Error fetching business sectors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectors();
  }, []);

  return { sectors, isLoading, error };
}
