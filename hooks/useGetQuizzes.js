import { useMutation, useQuery } from "@tanstack/react-query";
import client from "@lib/client";


async function getQuizzes(){
    const res = await client.get("/api/quizzes/");
    return res.data
}

function useGetQuizzes(){
   return useQuery({
    queryFn:getQuizzes,
    queryKey:["quizzes"]
   })
}

export default useGetQuizzes;