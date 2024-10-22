import axios from 'axios'
import {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext()

export function AuthContextProvider({children}){
    const [currentUser, setCurrentUser] = useState()

    useEffect(()=>{
        async function getProfile() {
            if(currentUser){
                return
            }
            try {
                const user_data = await axios.get('/user/profile')
            
                if(!user_data || !user_data.data){
                    return
                }
                if(user_data.data.error){
                    console.log(user_data)
                }else{
                    setCurrentUser(user_data.data)
                }
            } catch (error) {
                console.log(error)
            }
            
    
        }
        getProfile()
        
    }, [])

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )

}