import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Spinner from '../components/Spinner'
import { checkIfUserCurrentlyLoggedIn } from '../features/auth/authSlice'

function HomePage() {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkIfUserCurrentlyLoggedIn())
    }, [dispatch, checkIfUserCurrentlyLoggedIn])
    console.log(user)

    return (
        <div className='flex items-center justify-center w-screen h-screen'>Welcome to QueueBoard
        </div>
    )
}

export default HomePage