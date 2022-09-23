import { Avatar, Box, color, Flex, Slide, Wrap, WrapItem }  from "@chakra-ui/react";
import { useAuth } from "@components/AuthProvider";
import Link from "next/link";
import React from "react";
import auth from "@lib/auth";

function MobileNavigation({navItems}){
    const [isOpened , setIsOpened] = React.useState(false)
    const { user } = useAuth()
 
    React.useEffect(
        () => {
            const handler = () => {
                if(window.innerWidth > 768){
                    setIsOpened(false);
                }
            }

            window.addEventListener("resize", handler);

            return () => {
                window.removeEventListener("resize", handler)
            }
        },
        []
    )

    return(
        <Box>
                <Flex
                    width="25px"
                    gap="2px" 
                    direction="column" 
                    align="flex-end" 
                    cursor="pointer" 
                    display={{base:"flex" , md:"none"}} 
                    onClick={() => setIsOpened(!isOpened)}
                    position="relative"
                    zIndex="11"
                >
                    <Box 
                        bg="gray.700" 
                        width={isOpened ? "20px" :"35px"} 
                        height={isOpened ? "2px" : "3px"}
                        transform={`translateY(${isOpened ? "4px" : "0px"}) rotate(${isOpened ? "45deg" : "0"})`}
                        transition="0.3s all"
                    />
                    <Box 
                        bg="gray.700" 
                        width="30px"
                        height="3px"
                        style={{opacity: isOpened ? 0 : 1}}
                    ></Box>
                    <Box 
                        bg="gray.700" 
                        width="20px"
                        height={isOpened ? "2px" : "3px"}
                        transform={`translateY(${isOpened ? "-4px" : "0px"}) rotate(${isOpened ? "-45deg" : "0"})`}
                        transition="0.3s all"
                    ></Box>
                </Flex>


                    <Slide direction="left" in={isOpened} style={{zIndex:10}} unmountOnExit>
                    <Box
                        as="nav"
                        display={{base: isOpened ? "block" : "none"}}
                        bg="white"
                        height="100vh"
                        py={{base: isOpened ? "40" : 0 }}
                    >
                        <Flex 
                            as="ul"
                            listStyleType="none"
                            display={{base: isOpened ? "flex" : "none" , md:"flex"}}
                            direction={{base:"column" , md:"row"}}
                        >
                            {
                                navItems.map(navItem =>(
                                    <Box
                                    as="li"
                                    key={navItem.href}
                                    _hover={{
                                        bg: "red.200",
                                        transition:"0.3s all" ,
                                        color: "white"
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
                            
                        </Flex>
                        {
                            user ?
                            <Box
                                as="button"
                                width="100%"
                                textAlign="left"
                                fontSize="lg"
                                fontWeight="semibold"
                                p="5"
                                display="block"
                                textTransform="uppercase"
                                onClick={() => auth.logout()}
                                _hover={{
                                bg:"red.200",
                                color: "white",
                                transition:"0.3s all"
                            }}
                            >
                                logout
                            </Box>
                            : ""
                        }
                        
                    </Box>
                    </Slide>
        </Box>
    )
}

export default MobileNavigation;