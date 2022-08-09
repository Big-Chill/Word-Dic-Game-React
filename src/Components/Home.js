import React,{useState,useEffect,useContext} from 'react';
import {WordContext} from '../Context/WordContext';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { toaster } from 'evergreen-ui';
import TextField from '@mui/material/TextField';

export default function Home() {
  const {word,guess_word,setGuessWord,getDefinition,getExample,getSynonyms,getAntonyms,isSameWord,success,setSuccess,totalPoints,setTotalPoints} = useContext(WordContext);

  const [def,setDef] = useState([]);
  const [dindex,setDindex] = useState(0);
  const [eindex,setEindex] = useState(0);
  const [sindex,setSindex] = useState(0);
  const [aindex,setAindex] = useState(0);
  const [ex,setEx] = useState([]);
  const [syn,setSyn] = useState([]);
  const [ant,setAnt] = useState([]);
  const [synreveal1,setSynReveal1] = useState(false);
  const [synreveal2,setSynReveal2] = useState(false);
  const [exreveal1,setExReveal1] = useState(false);
  const [exreveal2,setExReveal2] = useState(false);
  const [defreveal2,setDefReveal2] = useState(false);
  const [antreveal1,setAntReveal1] = useState(false);
  const [jumblereveal,setJumbleReveal] = useState(false);
  const [jumbword,setJumbWord] = useState('');
  const [passedWords,setPassedWords] = useState([]);
  const [points,setPoints] = useState([]);
  const [idx,setIdx] = useState(0);



  useEffect(() => {
    setDef([]);
    setEx([]);
    setSyn([]);
    setAnt([]);
    setGuessWord('');
    setDindex(0);
    setEindex(0);
    setSindex(0);
    setAindex(0);
    setSynReveal1(false);
    setSynReveal2(false);
    setExReveal1(false);
    setExReveal2(false);
    setDefReveal2(false);
    setAntReveal1(false);
    setJumbleReveal(false);
    const r1 = getDefinition();
    const r2 = getExample();
    const r3 = getSynonyms();
    const r4 = getAntonyms();

    setDindex(Math.floor(Math.random() * r1.length));
    setEindex(Math.floor(Math.random() * r2.length));
    setSindex(Math.floor(Math.random() * r3.length));
    setAindex(Math.floor(Math.random() * r4.length));

    for(let i=0;i<r1.length;i++){
      setDef(prev => [...prev,r1[i]["text"]]);
    }

    for(let i=0;i<r2.length;i++){
      setEx(prev => [...prev,r2[i]["text"]]);
    }

    setSyn(r3);
    setAnt(r4);
    setJumbWord(word.shuffle());
  },[word]);

  const checkWord = () => {
    if(guess_word.length == 0)
    {
      toaster.warning("Word field cannot be empty",{id: 'forbidden-action',duration:"2"});
      return;
    }
    if(isSameWord()){
      toaster.success("Correct Answer",{id: 'forbidden-action',duration:"2"});
      setPoints(points[idx] + 10);
      setIdx(idx + 1);
      setTotalPoints(totalPoints+10);
      setPassedWords(prev => [word,...prev]);
      setSuccess(true);
      return;
    }
    setTotalPoints(totalPoints-2);
    setPoints(points[idx] - 2);
    toaster.danger("Wrong Answer",{id: 'forbidden-action',duration:"2"});
    return;
  }

  const getNewWord = () => {
    setTotalPoints(totalPoints-5);
    setPoints(points[idx] - 5);
    setIdx(idx + 1);
    setSuccess(true);
    toaster.success("New Word Loaded",{id: 'forbidden-action',duration:"2"});
  }

  const pEnter = (e) =>{
    if(e.key == "Enter")
    {
      checkWord();
      return;
    }
    return;
  }

  String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

const revealSyn1 = ()=>{
  setSynReveal1(true);
  setTotalPoints(totalPoints-2);
}

const revealSyn2 = ()=>{
  setSynReveal2(true);
  setTotalPoints(totalPoints-2);
}

const revealEx1 = ()=>{
  setExReveal1(true);
  setTotalPoints(totalPoints-2);
}

const revealEx2 = ()=>{
  setExReveal2(true);
  setTotalPoints(totalPoints-2);
}

const revealDef2 = ()=>{
  setDefReveal2(true);
  setTotalPoints(totalPoints-3);
}

const revealAnt1 = ()=>{
  setAntReveal1(true);
  setTotalPoints(totalPoints-1);
}

const revealJumb = ()=>{
  setJumbleReveal(true);
  setTotalPoints(totalPoints-4);
}

  return (
    <div>
      <div className='main-card'>
          <Card sx={{ width:"650px", height:"1000px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#f2f2f2" }}>
            <div>
              <CardContent align='center'>
                <Typography gutterBottom variant="h5" component="div">
                  GUESS THE WORD
                </Typography>
                <div className='text-div'>
                  <TextField id="outlined-basic" label="Enter your Word" variant="outlined" size="small" value={guess_word} onChange={(e)=>setGuessWord(e.target.value)} onKeyDown={(e)=>{pEnter(e)}}/>&nbsp;&nbsp;
                  <Button variant="contained" onClick={checkWord} sx={{height:"38px"}}>Check</Button>
                </div>
              </CardContent>
            </div>
            <div className="card-body">
              <CardContent align='center'>
              <TextField fullWidth={true} id="outlined-helperText" value={def[dindex]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 1(Definition)"/>
              <div>
              {
                synreveal1 ? <TextField fullWidth={true} id="outlined-helperText" value={syn[sindex]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 2(Synonym)"/> : <Button variant="contained" onClick={() => revealSyn1()} sx={{height:"38px",width:"220px"}}>Reveal 1st Synonym</Button>
              }
              </div>
              <br/>
              <br/>
              <div>
              {
                exreveal1 ? <TextField fullWidth={true} id="outlined-helperText" value={ex[eindex]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 3(Example)"/> : <Button variant="contained" onClick={() => revealEx1()} sx={{height:"38px",width:"220px"}}>Reveal 1st Example</Button>
              }
              </div>
              <br/>
              <br/>
              <div>
              {
                synreveal2 ? <TextField fullWidth={true} id="outlined-helperText" value={syn[sindex-1<0?sindex+1:sindex-1]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 4(Synonym)"/> : <Button variant="contained" onClick={() => revealSyn2()} sx={{height:"38px",width:"220px"}}>Reveal 2nd Synonym</Button>
              }
              </div>
              <br/>
              <br/>
              <div>
              {
                exreveal2 ? <TextField fullWidth={true} id="outlined-helperText" value={ex[eindex-1<0?eindex+1:eindex-1]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 4(Example)"/> : <Button variant="contained" onClick={() => revealEx2()} sx={{height:"38px",width:"220px"}}>Reveal 2nd Example</Button>
              }
              </div>
              <br/>
              <br/>
              <div>
              {
                defreveal2 ? <TextField fullWidth={true} id="outlined-helperText" value={def[dindex-1<0?dindex+1:dindex-1]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 5(Definition)"/> : <Button variant="contained" onClick={() => revealDef2()} sx={{height:"38px",width:"220px"}}>Reveal 2nd Definition</Button>
              }
              </div>
              <br/>
              <br/>
              <div>
                {
                  ant.length>0?
                  antreveal1 ? <TextField fullWidth={true} id="outlined-helperText" value={ant[aindex]}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 6(Antonym)"/> : <Button variant="contained" onClick={() => revealAnt1()} sx={{height:"38px",width:"220px"}}>Reveal Antonym</Button>
                  :
                  null
                }
              </div>
              <br/>
              <div>
                {
                  jumblereveal ? <TextField fullWidth={true} id="outlined-helperText" value={jumbword}InputProps={{ readOnly: true,}}variant="filled" helperText="Hint 7(Jumbled Word)"/> : <Button variant="contained" onClick={() => revealJumb()} sx={{height:"38px",width:"220px"}}>Reveal Jumbled Word</Button>
                }
              </div>
              <br/>
              </CardContent>
            </div>
        </Card>
        &nbsp;&nbsp;&nbsp;
        <Card sx={{ width:"200px", height:"1000px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#f2f2f2" }}>
        <div className="point-div"><b>Score : {totalPoints}</b></div>
        <div>
        {
          <Button variant="contained" onClick={() => getNewWord()} sx={{height:"38px",width:"200px"}}>Get a new Word</Button>
        }
        </div>
        {
          passedWords.map((word,index)=>{
            return(
              <div className="point-div" key={index}>{word}</div>
            )
          })
        }
        </Card>
      </div>
    </div>
  )
}
