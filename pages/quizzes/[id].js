import { Flex, Spinner, Box } from "@chakra-ui/react";
import Layout from "@components/Layout";
import QuizTemplate from "@components/QuizTemplate";
import useGetQuiz from "@hooks/useGetQuiz";
import { useRouter }  from "next/router";

function Quiz(){
    const router = useRouter()
    const {isLoading, error, data} = useGetQuiz(router.query.id, {
        enabled: !!router.query.id
    });
    return(
            <Layout>
                {
                    isLoading ? 
                    <Flex
                        height="100vh"
                        align="center"
                        justify="center"
                    >
                        <Spinner size="xl"/>
                    </Flex>
                    : 
                    // console.log(data.questions)
                    <QuizTemplate  questions={data.questions} title={data.title}/>
                }
            </Layout>
    )
}

export default Quiz;