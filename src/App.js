import React, {useRef,
               useEffect, 
               useState} 
from 'react';
import './App.css';

// 1. Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Rings } from 'react-loader-spinner';


const App = () => {

  // 3. Setup references and state hooks
  const passageRef = useRef(null); 
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState(); 
  const [model, setModel] = useState(null); 

  // 4. Load Tensorflow Model
  const loadModel = async ()=>{
    const loadedModel = await qna.load()
    setModel(loadedModel); 
    console.log('Model loaded.')
  } 

  // 5. Handle Questions
  const answerQuestion = async (e) =>{
    if (e.which === 13 && model !== null ){
      console.log('Question submitted.')
      const passage = passageRef.current.value
      const question = questionRef.current.value

      const answers = await model.findAnswers(question, passage)
      setAnswer(answers); 
      console.log(answers)

    }  
  }

  useEffect(()=>{loadModel()}, [])

  // 2. Setup input, question and result area
  return (
    <div className="App">
      <header className="App-header">
        {model ==null ? 
          <div>
            <div>Model Loading</div>      
            <Rings
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}/>
          </div> 
          :  
          <>
            document
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            Ask a Question
            <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
            <br /> 
            Answers
            {answer ? answer.map((ans, idx) =><div><b>Answer {idx+1} - </b> {ans.text} ({Math.floor(ans.score*100)/100})</div>) : ""}
            </>
        } 
      </header>
    </div>
  );
}

export default App
