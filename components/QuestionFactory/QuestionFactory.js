import React from "react"
import { reducer } from "./QuestionFactory.helpers"
import { Box, Button, Editable, EditableInput, EditablePreview, Flex, HStack, Input, Radio, RadioGroup, ScaleFade, Slide, Textarea, useToast } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import useCreateQuiz from "@hooks/useCreateQuiz";
import client from "@lib/client";
import { useRouter } from "next/router";

function QuestionFactory(){
    const [questions , dispatchQuestions] = React.useReducer(reducer , []);
    const [title , setTitle] = React.useState("")
    const toast = useToast()
    const {mutate , isLoading } = useCreateQuiz()
    const router = useRouter()

    const handleSubmit = () => {
        if(!questions.length){
            return toast({title:"Quiz can't have empty questions", status: "error"})
        }

        mutate({ questions , title } , {
                onSuccess:() => {
                    toast({ title: "Quiz created successfully" });
                    router.push("/dashboard")
                },
                onError: () => toast({ title: "Failed to create quiz", isClosable: true, status: "error" })
            })
    
        
    }

    return(
        <Box
            width="100%"
            maxW="900px"
            padding="2 0 4 0"
            fontFamily="sans-serif"
        >
             <Flex
                direction="column"
                margin="4"
             >
                <Flex
                    align="center"
                    justify="center"
                    my="4"
                >
                    <Input
                        placeholder="Quiz Title"
                        onChange={e => setTitle(e.target.value)}
                     />
                </Flex>
                {
                    questions.map((question,i) => (
                        <ScaleFade initialScale={0.9} in={true} key={question.id}>  
                        <Box>
                            <Flex justify="flex-end">
                                <CloseIcon
                                    w="3" 
                                    h="3" 
                                    as="button" 
                                    cursor="pointer"
                                    onClick={()=> dispatchQuestions({
                                        type: "remove_question",
                                        id: question.id
                                    })}
                                />
                            </Flex>
                            {`${i+1}-`}
                            <Textarea
                                placeholder="Question"
                                mb="3"
                                onChange={e => dispatchQuestions({
                                type:"edit_question" , 
                                id: question.id,
                                data:{
                                    label: e.target.value
                                } 
                            })}/>
                            <RadioGroup
                                value={question.correctAnswerIndex}
                                mb="3"
                                mx="3"
                                onChange={value => dispatchQuestions({
                                    type:"edit_question" , 
                                    id: question.id,
                                    data:{
                                        correctAnswerIndex: value
                                    } 
                                })}
                            >

                                {
                                    question.answers.map((answer, i) =>(
                                        <HStack key={i}>
                                            <Radio 
                                                value={String(i)}
                                            />
                                            <Editable 
                                                mb="3"
                                                width="100%"
                                                placeholder={`Option ${i+1}`}
                                                value={answer}
                                                onChange={value => dispatchQuestions({
                                                    type: "edit_choice",
                                                    index: i,
                                                    value: value,
                                                    id: question.id
                                             })}
                                            >
                                                <EditablePreview />
                                                <EditableInput />
                                            </Editable>
                                        </HStack>
                                    ))
                                }

                            </RadioGroup>

                             <Button 
                                mb="6"
                                mx="3"
                                onClick={() => dispatchQuestions({
                                    type:"add_answer",
                                    id: question.id
                             })}
                             >
                                Add Choice
                            </Button>   
                        </Box>
                        </ScaleFade>
                    ))
                    
                }
             </Flex>

            <Flex justify="center" align="center">

                <Button 
                    onClick={()=> dispatchQuestions({type:"add_question"})}
                    my="2"
                    mx="4"
                >
                    Add Question
                </Button>

                <Button
                    type="submit"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                
            </Flex>
        </Box>
    )
}

export default QuestionFactory;