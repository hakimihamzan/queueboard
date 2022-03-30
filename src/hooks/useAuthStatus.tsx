import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const { isLoggedIn: isLoggedInSlice } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isLoggedInSlice) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCheckingStatus(false)
    }, [isLoggedInSlice])

    return { loggedIn, checkingStatus }
}