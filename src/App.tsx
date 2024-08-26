import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { router } from './router';

function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <RouterProvider router={router} context={{auth}} />
    </AuthProvider>
  );
}

export default App;
