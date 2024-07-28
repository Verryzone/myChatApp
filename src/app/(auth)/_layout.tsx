import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../../provider/AuthProvider'

const AuthLayout = () => {
    const {user} = useAuth();

    if(user) {
        return <Redirect href="/(home)"/>
    }

    return (
        <Stack/>
    )
}

export default AuthLayout