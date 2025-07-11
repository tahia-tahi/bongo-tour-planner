import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () =>{
        return signInWithPopup (auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const logOut = () => {
        return signOut(auth)
    }


      useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
                    setLoading(false)

        });
        return () => {
            unsubscribe()
        }
    }, [])



    const authData = {

        createUser,
        loading,
        setLoading,
        signIn,
        updateUser,
        logOut,
        user,
        setUser,
        googleSignIn

    }

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>


};

export default AuthProvider;