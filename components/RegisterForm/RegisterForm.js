import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import useRegister from "@hooks/useRegister";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

function RegisterForm(){
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()

  const { mutate, isLoading } = useRegister();

  const router = useRouter();

  const toast = useToast();

  const onSubmit = values => {
    mutate(values, {
      onSuccess: () => router.push("/dashboard"),
      onError: err => toast({ title: err.response.data.message, isClosable: true, status: "error" })
    });
  }

  return (
      <Flex
          as="form"
          direction="column"
          onSubmit={handleSubmit(onSubmit)}
      >
          <FormControl isInvalid={!!errors.firstName} mb="4">
          <FormLabel>First Name</FormLabel> 
          <Input {...register("firstName" ,{required: "Required" , maxLength: 20})} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName} mb="4">
          <FormLabel>Last Name</FormLabel>
          <Input {...register("lastName" , {required: "Required" , maxLength: 20})} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email" , {required: "Required"})} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password" , {required: "Required" , maxLength: 14 , minLength:9})}/>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Button 
          type="submit"
          bg="red.200"
          color="white"
          isLoading={isLoading}
          isDisabled={isLoading}
          _hover={{
            bg: "red.300"
          }}
        >
          Sign Up
        </Button>  
      </Flex>
  )
}

export default RegisterForm;