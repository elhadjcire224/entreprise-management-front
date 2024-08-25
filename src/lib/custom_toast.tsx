import { toast, ToastOptions } from 'react-hot-toast';

// Icône d'information (vous pouvez utiliser une icône de votre choix)
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const infoToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    icon: <InfoIcon />,
    style: {
      background: '#3498db',
      color: '#fff',
    },
    ...options,
  });
};

// Étendre l'interface de toast pour inclure la méthode info
declare module 'react-hot-toast' {
  interface Toast {
    info: typeof infoToast;
  }
}

// Ajouter la méthode info à l'objet toast
toast.info = infoToast;

export { infoToast };
