import { Heading, Box, Spinner, Flex, Grid, GridItem} from "@chakra-ui/react";
import withPrivate from "@components/withPrivate";
import { useAuth } from "@components/AuthProvider";
import useGetQuizzes from "@hooks/useGetQuizzes";
import Link from "next/link";
import Layout from "@components/Layout";

function Dashboard(){
    const { user } = useAuth();
    const {isLoading, error, data} = useGetQuizzes()
    return(
        <Layout>
            <Box 
                pt="8"
                px={{ base: 4, md: 6 }}
                maxW="1300"
                mx="auto"
            >
                <Heading 
                    size="lg" 
                    color="gray.700" 
                    textTransform="capitalize"
                    mb="8"
                >
                    Welcome {user.user.firstName} {user.user.lastName} !
                </Heading>
                {
                    isLoading ?
                    <Flex
                        height="100vh"
                        align="center"
                        justify="center"
                    >
                        <Spinner />
                    </Flex> :

                    <Grid
                        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                        gap={4}
                    >
                        {
                            data.map(quiz => (
                                <Link href={`/quizzes/${quiz._id}`} passHref key={quiz._id}>
                                    <GridItem
                                        as="a"
                                        px="6"
                                        py="4"
                                        border="1px"
                                        borderColor="inherit"
                                        rounded="md"
                                        cursor="pointer"
                                        fontWeight="semibold"
                                        fontSize="md"
                                        textTransform="capitalize"
                                        transition="all 0.3s"
                                        _hover={{
                                            bg: "red.50",
                                            boxShadow: "base"
                                        }}
                                    >
                                        {quiz.title}
                                    </GridItem>
                                </Link>
                            ))
                        }
                    </Grid>
                }
            </Box>
        </Layout>
    )
}

export default withPrivate(Dashboard);