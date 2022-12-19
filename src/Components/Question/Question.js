import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMsg/ErrorMsg';
import './Question.css';

const Question = ({
    cur,
    setCur,
    ques,
    options,
    correct,
    score,
    setScore,
    setQues
}) => {
    const[select, setSelect]=useState();
    const[err, setErr]=useState(false);

    const handleSelect=(i)=>{
        if(select===i && select===correct){
            return "select";
        }
        else if(select===i && select!==correct){
            return "wrong";
        }
        else if(i===correct){
            return "select";
        }
    };

    const handleCheck=(i)=>{
        setSelect(i);
        if (i===correct) setScore(score+1);
        setErr(false);
    };

    let navigate = useNavigate();

    const handleNext=()=>{
        console.log(cur);
        if(cur>8){
            navigate('/result');
        }
        else if(select){
            setCur(cur+1);
            setSelect();
        }
        else{
            setErr("Please select an options first");
        }
    };

    const handleQuit=()=>{
        setCur(0);
        setQues();
    }

    return (
        <div className='question'>
            <h1>Question {cur +1}</h1>

            <div className="singleQ">
                <h2>{ques[cur].question}</h2>
                
                <div className="options">
                    {err && <ErrorMessage>{err}</ErrorMessage>}
                    {options && options.map((i)=>(
                        <button onClick={()=>handleCheck(i)} className={`singleOp ${select && handleSelect(i)}`} key={i} disabled={select}>
                            {i}
                        </button>
                    ))}
                </div>

                <div className="controls">
                    <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    style={{width: 185}}
                    href='/'
                    onClick={handleQuit}
                    >Quit</Button>
                    <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    style={{width: 185}}
                    onClick={handleNext}
                    >Next Question</Button>
                </div>
            </div>
        </div>
    )
}

export default Question