import "./Home.css"
import {Button, MenuItem, TextField} from "@mui/material";
import Categories, {} from "../../Data/Categories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage, {} from "../../Components/ErrorMsg/ErrorMsg"

const Home = ({name, setName, fetchQues}) => {
  const [category, setCategory]=useState("");
  const [diff, setDiff]=useState("");
  const [err, setErr]=useState(false);

  let navigate = useNavigate();
  
  const handleSubmit= ()=>{
    if(!category || !diff || !name){
      setErr(true);
      return;
    }
    else{
      setErr(false);
      fetchQues(category,diff);
      navigate("/quiz");
    }
  };

  return (
        <div className="content">
          <div className="settings">
            <span style={{fontSize: 30}}>Quiz Settings</span>
          
            <div className="settings_select">
              {err && <ErrorMessage>Please Fill all the fields</ErrorMessage>}

              <TextField 
              style={{marginBottom:25}} 
              label="Enter Your Name" 
              variant="outlined"
              onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="settings_select">
              <TextField select 
              style={{marginBottom:30}} 
              label="Select Category" 
              variant="outlined"
              onChange={(e)=>setCategory(e.target.value)}
              value={category}>
                {Categories.map((cat)=>(
                  <MenuItem key={cat.category} value={cat.value}>
                    {cat.category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="settings_select">
              <TextField select 
              style={{marginBottom:30}} 
              label="Select Difficulty" 
              variant="outlined"
              onChange={(e)=>setDiff(e.target.value)}
              value={diff}>
                  <MenuItem key="Easy" value="easy">
                    Easy
                  </MenuItem>
                  <MenuItem key="Medium" value="medium">
                    Medium
                  </MenuItem>
                  <MenuItem key="Hard" value="hard">
                  Hard
                  </MenuItem>
              </TextField>

              <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleSubmit}>
                Start Quiz
              </Button>
            </div>
          </div>
          <img src="/quiz.svg" alt="Quiz Pic" className='banner'/> 
        </div>
  );
};

export default Home