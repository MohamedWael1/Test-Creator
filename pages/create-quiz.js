import QuestionFactory from "@components/QuestionFactory";
import withPrivate from "@components/withPrivate";
import { Box, Heading } from "@chakra-ui/react";
import Layout from "@components/Layout";

function CreateQuiz(){
    return(
        <Layout>
            <Box
                maxW="1000px"
                mx="auto"
                px={{ base: 4, md: 6 }}
                pt="8"
            >
                <Heading 
                    size="lg"
                    mb="8"
                >
                    Create Quiz
                </Heading>

                <QuestionFactory />
            </Box>
        </Layout>
    )
}

export default withPrivate(CreateQuiz);