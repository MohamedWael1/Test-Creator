import { Button, Flex, FormControl, FormLabel, Input, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form"
import useLogin from "@hooks/useLogin"
import { useRouter } from "next/router";

function LoginForm(){
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const toast = useToast();

  const { mutate, isLoading } = useLogin();

  const onSubmit = values => {
    mutate(values, {
      onSuccess: () => {
        router.push("/dashboard")
      },
      onError: err => {
        toast({ title: err.response.data.message, isClosable: true, status: "error" })
      }
    });
  }

  return (
      <Flex
          as="form"
          direction="column"
          onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.email} mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email" ,  { required: "Required" } )} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password", { required: "Required." })} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Button 
          type="submit"
          bg="red.200"
          color="white"
          isLoading={isLoading}
          isDisabled={isLoading}
          _hover={{
            bg:"red.300"
          }}
        >
          Sign In
        </Button>  
      </Flex>
  )
}

export default LoginForm;