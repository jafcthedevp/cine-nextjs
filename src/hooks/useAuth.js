'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserSession } from '@/services/auth'

const useAuth = () => {
    const [user, setUser] = useState(null)

    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const sessionUser = await getUserSession();
            if (!sessionUser) {
                router.push('/login');
            } else {
                setUser(sessionUser)
            }
        };

        checkSession();
    }, []);

    return { user }
}

export default useAuth;