import client  from "@lib/client";
import { useQuery } from "@tanstack/react-query";

const getQuiz = async (id) =>{
    const res = await client.get(`/api/quizzes/${id}`)
    return res.data
}

const useGetQuiz = (id, { enabled = true }) =>{
    return useQuery({
        queryFn: () => getQuiz(id),
        queryKey: ["quizzes", id],
        enabled
    })
}

export default useGetQuiz;