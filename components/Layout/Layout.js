import { Box } from "@chakra-ui/react";
import Navigation from "@components/Navigation";

function Layout({ children }){
    return (
        <Box>
            <Navigation />
            <Box 
                as="main"
                
            >
                {children}
            </Box>
        </Box>
    )
}

export default Layout;