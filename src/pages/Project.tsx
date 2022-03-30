import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { checkIfUserCurrentlyLoggedIn } from '../features/auth/authSlice'

function ProjectPage() {
    const { user } = useAppSelector(state => state.auth)
    console.log(user)
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(checkIfUserCurrentlyLoggedIn())
    // }, [dispatch, checkIfUserCurrentlyLoggedIn])
    return (
        <div>ProjectPage</div>
    )
}

export default ProjectPage