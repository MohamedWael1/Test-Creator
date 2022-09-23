import { useMutation } from '@tanstack/react-query'
import auth from '@lib/auth'

function useLogin(){
    return useMutation(data => {
        return auth.login(data)
    })
}

export default useLogin;