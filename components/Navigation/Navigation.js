import { Avatar, Box, Flex, Heading, Slide, Wrap, WrapItem }  from "@chakra-ui/react";
import { useAuth } from "@components/AuthProvider";
import Link from "next/link";
import React from "react";
import MobileNavigation from "./MobileNavigation";
import auth from "@lib/auth";
import { useRouter } from "next/router";

const userNavItems = [
    {
        label: "home",
        href:"/"
    },
    {
        label: "create quiz",
        href:"/create-quiz"
    },
    {
        label: "dashboard",
        href:"/dashboard"
    }
];

const homeNavItems =[
    {
        label: "sign up",
        href: "/register"
    },
    {
        label: "sign in",
        href: "/login"
    }
]

function Navigation(){
    const { pathname } = useRouter()
    const { user } = useAuth()
    const navItems = user ? userNavItems : homeNavItems

    return(
            <Flex
                align="center"
                justify="space-between"        
                width="100%"
                px={{ base: 5, lg: "300px" }}
                boxShadow="sm"  
            >
                <Wrap my="3px">
                    <WrapItem>
                        {
                            user ?  
                            <Avatar
                                size="md" 
                                color="white"
                                bg="red.200"
                                name={user ? `${user.user.firstName} ${user.user.lastName}` : ""}
                                _hover={{
                                    bg: "red.300"
                                }}
                            /> 
                            : <Heading textTransform="capitalize" fontWeight="thin" fontFamily="sans-serif">test creator</Heading>
                        }
                       
                    </WrapItem>
                </Wrap>

                <MobileNavigation navItems={navItems} />

                <Box
                    as="nav"
                    display={{base:"none" , md:"block"}}
                >
                    <Flex 
                        as="ul"
                        listStyleType="none"
                    >
                        {
                            navItems.map(navItem =>(
                                <Box
                                as="li"
                                bg={ pathname === navItem.href ? "red.200" : "white"}
                                color={ pathname === navItem.href ? "white" : "gray.700"}
                                key={navItem.href}
                                _hover={{
                                    bg: "red.200",
                                    color: "white", 
                                    transition:"0.3s all" 
                                }}
                                >
                                    <Link href={navItem.href} passHref>
                                        <Box
                                            as="a"
                                            fontSize="lg"
                                            fontWeight="semibold"
                                            p="5    "
                                            display="block"
                                            textTransform="uppercase"
                                        >
                                            {navItem.label}
                                        </Box>
                                    </Link>
                                </Box>
                            ))
                        }

                        {
                            user ?
                            <Box as="li">
                                <Box
                                    as="button"
                                    width="100%"
                                    fontSize="lg"
                                    fontWeight="semibold"
                                    p="5"
                                    display="block"
                                    textTransform="uppercase"
                                    _hover={{
                                        bg:"red.200",
                                        color: "white",
                                        transition:"0.3s all"
                                    }}
                                    onClick={() => auth.logout()}
                                >
                                    logout
                                </Box>
                        </Box>
                        : ""
                        }
                        
                    </Flex>
                </Box> 

                </Flex>
    )
}

export default Navigation;