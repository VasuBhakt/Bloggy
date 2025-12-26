import React, { useEffect, useState } from 'react'
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
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: any) => state.auth.status);
    const userData = useSelector((state: any) => state.auth.userData);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])
    if (loader) return <h1>Loading...</h1>

    if (authStatus && userData && !userData.emailVerification) {
        return <BlockVerificationUI />
    }

    return <>{children}</>
}
