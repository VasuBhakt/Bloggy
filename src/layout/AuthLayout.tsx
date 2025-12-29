// Auth Layout for protected routes

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BlockVerificationUI } from '../pages'

interface ProtectedProps {
    children: React.ReactNode,
    authentication?: boolean
}

export default function Protected({
    children,
    authentication = true
}: ProtectedProps) {

    const navigate = useNavigate();
    const authStatus = useSelector((state: any) => state.auth.status);
    const userData = useSelector((state: any) => state.auth.userData);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
    }, [authStatus, navigate, authentication])

    if (authStatus && userData && !userData.emailVerification) {
        return <BlockVerificationUI />
    }

    return <>{children}</>
}
