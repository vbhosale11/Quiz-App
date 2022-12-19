import './Quiz.css';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Question from '../../Components/Question/Question';

const Quiz = ({name, score, ques, setQues, setScore}) => {
  const [options, setOptions]=useState();
  const [cur, setCur]=useState(0);

  useEffect(() => {
    setOptions(ques && shuffle(
      [ques[cur]?.correct_answer,
      ...ques[cur]?.incorrect_answers,
      ])
    );
  }, [ques,cur]);

  const shuffle=(op)=>{
    return op.sort(()=>Math.random()-0.5);
  };

  return (
    <div className='quiz'>
      <span className="subtitle">Welcome {name}</span>

      {ques?(
        <>
          <div className='quizInfo'>
            <span>{ques[cur].category}</span>
            <span>Score: {score}</span>
          </div>

          <Question
          cur={cur}
          setCur={setCur}
          ques={ques}
          options={options}
          correct={ques[cur]?.correct_answer}
          score={score}
          setScore={setScore}
          setQues={setQues}
          />
        </>
      ):(
        <CircularProgress
       style={{margin: 100}}
        color="inherit"
        size={150}
        thickness={1}/>
      )}
    </div>
  );
};

export default Quiz