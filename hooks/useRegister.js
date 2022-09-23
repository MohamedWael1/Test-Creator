import { useMutation } from '@tanstack/react-query'
import auth from '@lib/auth'

function useRegister(){
    return useMutation(data => {
        return auth.register(data)
    })
}

export default useRegister;