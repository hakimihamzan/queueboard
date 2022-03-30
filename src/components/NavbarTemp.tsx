import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { authStateReset, logOutAll } from '../features/auth/authSlice'

function NavbarTemp() {
    const { isLoggedIn } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(logOutAll())

        setTimeout(() => {
            dispatch(authStateReset())
        }, 2000);
    }
    return (
        <nav className='absolute bottom-0 w-full'>
            <ul className='flex justify-evenly '>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/project'>Project</Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <button onClick={onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavbarTemp