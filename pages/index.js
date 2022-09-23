import { Box, Flex , Text , Image, Button, Grid, GridItem, Heading } from '@chakra-ui/react'
import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


//colors
// bg="linear-gradient(90deg, #7349cc 0%, #e163e4 100%)" 
// bg="linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)"  
// bg="linear-gradient(to right, #1c92d2, #f2fcfe)"  


const features = [
  {
    bg: "linear-gradient(90deg, #7349cc 0%, #e163e4 100%)",
    image: "https://preview.colorlib.com/theme/etrain/img/xadvance_feature_img.png.pagespeed.ic.oXXPvVL-Eh.webp",
    description: "create tests easily"
  },
  {
    bg: "linear-gradient(to right, #b993d6, #8ca6db)",
    image: "https://preview.colorlib.com/theme/etrain/img/xlearning_img.png.pagespeed.ic.j0Lm4J4bUn.webp",
    description: "access previous test from dashboard"
  },
  {
    bg: "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)",
    image: "https://preview.colorlib.com/theme/etrain/img/xlearning_img.png.pagespeed.ic.j0Lm4J4bUn.webp",
    description: "share tests with your students"
  }
]

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Layout>
      <Flex
        width="100%"
        direction={{base:"column" , md:"row"}}
        height="60vh"
        bg="linear-gradient(to right, #dd5e89, #f7bb97)"
        justify="space-between"
      >
        <Flex align="center" direction="column" > 

          <Box mb="8">
            <Text 
              fontSize={{base:"xl" , md:"4xl"}}
              px="6" 
              pt={{base:"50px" , md:"150px"}}
              color="white" 
              maxW="550px" 
              textTransform="capitalize" 
              textAlign="center"  
            >
              create tests for students easily in few seconds.
            </Text>
          </Box>

          <Flex gap="1">
            <Link href={"/register"}>
              <Box
                cursor="pointer"
                as='a'
                py="2" 
                px="5"
                borderRadius="md"
                bg="red.200" 
                color="whiteAlpha.900" 
                textTransform="uppercase" 
                transition="0.3s all" 
                _hover={{bg:"red.300"}}
              > 
                sign up
              </Box>
            </Link>

            <Link href={"/login"}>
              <Box
                cursor="pointer"
                as='a'
                py="2" 
                px="5"
                borderRadius="md"
                bg="red.200" 
                color="whiteAlpha.900" 
                textTransform="uppercase" 
                transition="0.3s all" 
                _hover={{bg:"red.300"}}
              > 
                sign in
              </Box>
            </Link>
          </Flex>

        </Flex>

        <Box maxW="800px">
          <Image src='https://preview.colorlib.com/theme/etrain/img/banner_img.png.webp' width="100%"/>
        </Box>  

      </Flex>

      <Grid 
        templateColumns={{base: "1fr", md:"repeat(auto-fit, minmax(400px, 1fr))"}} 
        gap="6" 
        mb="40" 
        mt={{base:"90px" , md:"60"}} 
        mx="30" 
        color="white"
      >
        {
          features.map(feature => {
            return (
              <GridItem 
                bg={feature.bg} 
                px="4" 
                py="12" 
                borderRadius="lg" 
              >
                <Flex 
                  align="center"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Box>
                    <Text textAlign="center" fontSize="3xl" maxW="200px" textTransform="capitalize">
                      {feature.description}
                    </Text>
                  </Box>
                  <Box>
                    <Image src={feature.image} />
                  </Box>
                </Flex>
              </GridItem>
            )
          })
        }
      </Grid>
    </Layout>
  )
}
