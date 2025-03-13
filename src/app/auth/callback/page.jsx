'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/client';

const AuthCallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
    
        const handleAuthCallback = async () => {
            const {error} = await supabase.auth.getSession();

            if (error) {
                console.error("Error al procesar la autenticación:", error.message)
            }

            router.push('/')
        }

        handleAuthCallback();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Procesando autenticación...</h2>
            <p className="text-gray-400 mt-2">Serás redirigido en un momento.</p>
          </div>
        </div>
      )
}

export default AuthCallbackPage;