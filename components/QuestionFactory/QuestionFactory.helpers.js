export function reducer(state , action){
    switch(action.type){
        case "add_question":{
           return[
                ...state,
                {
                    label: "",
                    id: Date.now(),
                    answers: ["Option 1", "Option 2"],
                    correctAnswerIndex: 0
                }
           ]
        }

        case "remove_question":{
            return state.filter(q => q.id != action.id )
         }

         case "add_answer":{
            return state.map(q => {
                if(q.id !== action.id) return q;

                return {
                    ...q,
                    answers: [...q.answers, `Option ${q.answers.length +1}`]
                }
            })
         }

         case "edit_question":{
            return state.map(q => {
                if(q.id !== action.id) return q

                return{
                    ...q,
                    ...action.data
                }
            })
         }

         case "edit_choice":{
            return state.map(q => {
                if(q.id !== action.id) return q
                let newAnswers = q.answers.map((answer , i) => {
                    return i == action.index ? answer = action.value : answer                     
                });
                return { ...q, answers: newAnswers }
            })
         }
  
    }
}