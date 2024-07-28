import { View, Text } from 'react-native'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContext = {
    session: Session | null;
    user: User | null;
    profile: any;
}
const AuthContext = createContext<AuthContext>({
    session: null,
    user: null,
    profile: null,
});

const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    useEffect(() => {
        if(!session?.user) {
            return;
        } 

        const fetchProfile = async() => {
            let {data, error} = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            setProfile(data)
        }
        fetchProfile()

    }, [session?.user])

  return (
    <AuthContext.Provider value={{session, user: session?.user, profile}}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider
export const useAuth = () => useContext(AuthContext);


