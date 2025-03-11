'use client'

import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation';

const UserDashboard = () => {

  const { user } = useAuth();
  router = useRouter();

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido, {user.email}</h1>
        <button
          onClick={async () => {
            await logout();
            router.push("/auth/login");
          }}
          className="bg-red-500 text-white p-2 mt-4"
        >
          Cerrar sesión
        </button>
      </div>
  </div>
  );
};

export default UserDashboard; 