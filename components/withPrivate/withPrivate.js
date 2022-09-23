import { useRouter } from "next/router";
import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useAuth } from "@components/AuthProvider";

function withPrivate(Page){
    return function(props){
        const { user } = useAuth();
        const router = useRouter();

        React.useEffect(
            () => {
                if(user === null){
                    router.push("/login");
                }
            },
            [user]
        );


        if(user === undefined || user === null){
            return (
                <Flex
                    height="100vh"
                    align="center"
                    justify="center"
                >
                    <Spinner />
                </Flex>
            )
        }

        return <Page {...props} />
    }
}

export default withPrivate;