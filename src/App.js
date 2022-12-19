import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [name, setName]=useState("");
  const [ques, setQues]=useState();
  const [score, setScore]=useState(0);

  const fetchQues=async(category='', diff='')=>{
    const {data}=await axios.get(`https://opentdb.com/api.php?amount=10&${
    category && `category=${category}`
    }&${diff && `&difficulty=${diff}`}&type=multiple`
    );
    setQues(data.results);
  };

  return (
    <BrowserRouter>
      <div className="App" style={{backgroundImage:"url(./bg.jpg)"}}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home 
          name={name} 
          setName={setName}
          fetchQues={fetchQues}
          />}></Route>
          <Route path='/quiz' element={<Quiz 
          name={name}
          ques={ques}
          score={score}
          setScore={setScore}
          setQues={setQues}
          />}></Route>
          <Route path='/result' element={<Result
          score={score}
          name={name}
          />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
