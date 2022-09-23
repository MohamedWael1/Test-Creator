import { Box, Button, Flex } from "@chakra-ui/react";
import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import { useRouter } from "next/router";
import Link from "next/link";

const tabs = [
    {
        label: "sign up",
        href: "/register"
    }, 
    {
        label: "sign in",
        href: "/login"
    }

]

function AuthForm(){
    const { pathname } = useRouter();

    return(
        <Box
            width="100%"
            boxShadow="lg"
            maxW="500px"
            py="4"
            margin="200px auto"
        >

            <Flex
                justify="center"
            >
                {
                    tabs.map(tab => (
                        <Link key={tab.href} href={tab.href} passHref>
                            <Box 
                                as="a"
                                textDecoration="none"
                                textAlign="center"
                                textTransform="uppercase"
                                fontWeight="semibold"
                                fontSize="lg"
                                padding="4"
                                width="50%"
                                bg={pathname == tab.href ? "red.200" : ""}
                                color={pathname == tab.href ? "white" : ""}
                                _hover={{
                                    bg: pathname == tab.href ? "red.300" : ""
                                }}
                            >
                                {tab.label}
                            </Box>
                        </Link>
                    ))
                }
            </Flex>

            <Box
                py="8"
                px="6"
            >
                {
                    pathname === "/login" ? 
                    <LoginForm />
                    :
                    <RegisterForm />
                }
            </Box>

        </Box>    
    )
}

export default AuthForm;