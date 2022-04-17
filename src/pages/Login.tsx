import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Spinner from "../components/Spinner"
import { checkIfUserCurrentlyLoggedIn, logInWithDemoAccount, logInWithGoogle } from "../features/auth/authSlice"
import { useAuthStatus } from "../hooks/useAuthStatus"

function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isLoading, isSuccess, isError, message } = useAppSelector(state => state.auth)
    const { loggedIn } = useAuthStatus()

    const { user } = useAppSelector(state => state.auth)
    console.log(user)

    useEffect(() => {
        if (loggedIn) {
            navigate('/project')
        }
        if (isError) {
            console.log(message)
        }
    }, [isSuccess, isError, message, navigate, loggedIn])

    const onClickGoogle = () => {
        dispatch(logInWithGoogle())
    }
    const onClickDemo = () => {
        dispatch(logInWithDemoAccount())
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-2 flex flex-col items-center">
                    <div className='mb-10'>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <button onClick={onClickGoogle} type="button" className="w-3/4 text-white flex items-center justify-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:focus:ring-[#4285F4]/55 mr-2">
                        <svg className="w-4 h-4 mr-2 -ml-1 " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Login with Google
                    </button>
                    <button onClick={onClickDemo} type="button" className="w-3/4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login with Demo account</button>
                </div>
            </div>

        </>
    )
}

// stolen from : https://tailwindui.com/components/application-ui/forms/sign-in-forms

export default LoginPage