import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { checkIfUserCurrentlyLoggedIn } from '../features/auth/authSlice'
import styles from './Project.module.css'

function ProjectPage() {
    const { user } = useAppSelector(state => state.auth)
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(checkIfUserCurrentlyLoggedIn())
    // }, [dispatch, checkIfUserCurrentlyLoggedIn])

    return (
        <>
            {/* <div className='grid grid-cols-[repeat(4, 1fr)] gap-2'>
                <nav className='h-screen bg-slate-200'>sdaf</nav>
                <div className='h-screen bg-slate-200'>open</div>
                <div className='h-screen bg-slate-200'>review</div>
                <div className='h-screen bg-slate-200'>progress</div>
                <div className='h-screen bg-slate-200'>completed</div>
                <div className='h-screen bg-slate-200'>chat</div>
            </div> */}
            <div className={styles.container}>
                <nav>Navbar</nav>
                <main>Main</main>
                <div className={styles.sidebar}>Sidebar</div>
                <div className={styles.content1}>Content1</div>
                <div className={styles.content2}>Content2</div>
                <div className={styles.content3}>Content3</div>
                <footer>Footer</footer>
            </div>
        </>
    )
}

export default ProjectPage