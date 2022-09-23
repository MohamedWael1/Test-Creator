import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/client";

const createQuiz = async (data) => {
    const res = await client.post("/api/quizzes", data);
    return res.data;
}

function useCreateQuiz(){
    const queryClient = useQueryClient();

    return useMutation(data => {
        return createQuiz(data)
    }, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["quizzes"])
        }
    })
}

export default useCreateQuiz;