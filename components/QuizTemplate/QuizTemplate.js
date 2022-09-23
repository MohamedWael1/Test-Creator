import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Radio, RadioGroup, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";

function QuizTemplate({title , questions}){
    const [answeredQuestions , setAnsweredQuestions] = React.useState(questions)
    const [disabled , setDisabled] = React.useState(false)

    const handleQuestionAnswerChange = (question , index) =>{
        const newAnsweredQuestions = answeredQuestions.map(q => {
            if(q._id !== question._id) return q
            return{
                ...q,
                studentAnswerIndex: index
            }
        })
        return setAnsweredQuestions(newAnsweredQuestions)
    }

    return(
        <Flex
            boxShadow="base"
            direction="column"
            pt="8"
            my="6"
            px={{ base: 4, md: 6 }}
            maxW="1300"
            mx={{base:"4", md:"auto"}}
            fontSize="lg"
            borderRadius="lg"
            color="gray.700"
            fontFamily="sans-serif"
    >
            <Flex
                align="center"
                justify="center"
            >
                <Text fontSize="xl">{title}</Text>
            </Flex>
            {
                answeredQuestions.map((question,i) =>(
                    <Flex
                        direction="column"
                        p="4"
                        key={i}
                    >
                        <Text> {`${i+1}-`} {question.label}</Text>

                        <RadioGroup
                            onChange={value => handleQuestionAnswerChange(question , Number(value))}
                            value={question.studentAnswerIndex}
                            isDisabled={disabled}
                        >
                            {
                                question.answers.map((answer,i) => (    
                                    <HStack key={i}>
                                        <Radio value={i}>{answer}</Radio>
                                        {
                                            disabled && i === question.correctAnswerIndex ? <CheckIcon  color="green.400" borderRadius="lg" /> 
                                            : disabled && i !== question.correctAnswerIndex ?<SmallCloseIcon color="red"/> : ""
                                        }
                                    </HStack>
                                ))
                            }
                        </RadioGroup>
                    </Flex>
                ))
            }
            <Flex
                justify="center"
            >
                <Button
                    my="4"
                    onClick={() => setDisabled(!disabled)}
                    isDisabled={disabled}
                    color="white"
                    bg="red.200"
                    _hover={{
                        bg:"red.300"
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </Flex>

    )
}

export default QuizTemplate;