import React, {useState,useEffect,createContext} from 'react';
import axios from 'axios';

export const WordContext = createContext();

export const WordProvider = ({children}) => {
  const[word,setWord] = useState('');
  const[guess_word,setGuessWord] = useState('');
  const[definition,setDefinition] = useState('');
  const[example,setExample] = useState('');
  const[synonym,setSynonyms] = useState([]);
  const[antonym,setAntonyms] = useState([]);
  const[success,setSuccess] = useState(false);
  const[totalPoints,setTotalPoints] = useState(0);

  useEffect(() => {
    setSuccess(false);
    getAll();
  },[success]);

  const getAll = async() =>{
    const apihost = 'http://fourtytwowords.herokuapp.com';
      const api_key = 'be45adfee7c617ff1b22a4ffccdf2687a8b7f484d1fc0603388c9f5d51879871e6fa92b0cb6fa6915f86e5c59d2c815b45496db11041a065ff6339318c925201';
      const resp_word = await axios.get(`${apihost}/words/randomWord?api_key=${api_key}`);
      const resp_def = await axios.get(`${apihost}/word/${resp_word.data["word"]}/definitions?api_key=${api_key}`);
      const resp_ex = await axios.get(`${apihost}/word/${resp_word.data["word"]}/examples?api_key=${api_key}`);
      const resp_rel = await axios.get(`${apihost}/word/${resp_word.data["word"]}/relatedWords?api_key=${api_key}`);
      setWord(resp_word.data["word"]);
      setDefinition(resp_def.data);
      setExample(resp_ex.data["examples"]);
      if(resp_rel.data.length == 2){
        setSynonyms(resp_rel.data[1]["words"]);
        setAntonyms(resp_rel.data[0]["words"]);
      }
      else if(resp_rel.data.length == 1){
        setSynonyms(resp_rel.data[0]["words"]);
        setAntonyms([]);
      }
  }

  const getWord = () => {
    return word;
  }

  const getDefinition = () => {
    return definition;
  }

  const getExample = () => {
    return example;
  }

  const getSynonyms = () => {
    return synonym;
  }

  const getAntonyms = () => {
    return antonym;
  }

  const isSameWord = () =>{
    return word == guess_word;
  }

  return(
    <WordContext.Provider value={{word,setWord,guess_word,setGuessWord,getDefinition,definition,getExample,getSynonyms,getAntonyms,isSameWord,success,setSuccess, totalPoints,setTotalPoints}}>
      {children}
    </WordContext.Provider>
  )
}