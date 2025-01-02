export const fetchQuestions = async ()=> {
    const quizCollection = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    if (!quizCollection.ok) {
        throw new Error("We couldnt fetch The open Trivia db API");
    };
    const data = await quizCollection.json();
  console.log (data);
    return data;
};
export interface quizQuestion {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,

}
let quizCollections:quizQuestion[] = []
export const GetQuizCollection = async ()=>{
    try {
        const data = await fetchQuestions();
        if (data.response_code !== 0) {
            throw new Error("Getting quiz questions went wrong");
        }
        quizCollections = [...data.results];
        return quizCollections;
    }catch (err) {

    };
};

