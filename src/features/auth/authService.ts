import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, Auth } from "firebase/auth";
import { app } from "../../firebase.config";

const auth = getAuth(app)

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

const signInWithDemoAccount = () => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, demoEmail, demoPassword)
            .then((userCredential) => {
                const user = userCredential.user;
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

const signOutAll = () => {
    return new Promise((resolve, reject) => {
        try {
            signOut(auth)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const checkIfUserCurrentlySignedIn = () => {
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
    checkIfUserCurrentlySignedIn,
    signInWithDemoAccount,
    signOutAll
}