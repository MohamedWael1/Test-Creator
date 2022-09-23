import auth from "@lib/auth";
import React from "react"

const AuthContext = React.createContext();

function AuthProvider({ children }){
    const [user , setUser] = React.useState(undefined);

    React.useEffect(
        () => {
            const unsubscribe = auth.addListener(setUser);
            
            setUser(auth.getUser());

            return () => {
                unsubscribe();
            }
        },
        []
    )

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = React.useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}

export default AuthProvider;
