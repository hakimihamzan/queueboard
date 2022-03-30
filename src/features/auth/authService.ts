import { getAuth, signOut, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

interface AppUser {
    displayName: string | null
    email: string | null
    emailVerified: boolean
    photoURL: string | null
    phoneNumber: string | null
    uid: string
}

const demoEmail = process.env.REACT_APP_DEMO_EMAIL ? process.env.REACT_APP_DEMO_EMAIL : ''
const demoPassword = process.env.REACT_APP_DEMO_PASSWORD ? process.env.REACT_APP_DEMO_PASSWORD : ''

const logInWithDemoAccount = () => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, demoEmail, demoPassword)
            .then((userCredential) => {
                const user = userCredential.user

                const appUser: AppUser = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                }

                resolve(appUser)
            })
            .catch((error) => {
                reject(error)
            });
    })
}

const logInWithGoogle = () => {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user

                const appUser: AppUser = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                }

                resolve(appUser)
            })
            .catch((error) => {
                reject(error)
            });
    })
}

const logOutAll = () => {
    return new Promise((resolve, reject) => {
        try {
            signOut(auth)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const checkIfUserCurrentlyLoggedIn = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const appUser: AppUser = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                }

                resolve(appUser)

            } else {
                reject(new Error('User is not signed in'))
            }
        });
    })
}

export const authService = {
    checkIfUserCurrentlyLoggedIn,
    logInWithDemoAccount,
    logOutAll,
    logInWithGoogle
}