import {useEffect,useState} from 'react';
import {readAnswers,serializeAnswers} from '../data/exercise-state.mjs';
type Bi={zh:string;en:string};
type Question={id:string;revision:string;text:Bi;analysis:Bi;options:{id:string;label:Bi}[];acceptedAnswerIds:string[];feedback:Record<string,Bi>};
type Answers=Record<string,{revision:string;answerId:string}>;
export default function Quiz({id,lang,items}:{id:string;lang:'zh'|'en';items:Question[]}){
 const [answers,setAnswers]=useState<Answers>({});
 const key='logic-quiz:'+id;
 useEffect(()=>{
  function read(){try{setAnswers(readAnswers(localStorage.getItem(key),items))}catch{setAnswers({})}}
  read();window.addEventListener('logic-quiz-change',read);window.addEventListener('storage',read);
  return()=>{window.removeEventListener('logic-quiz-change',read);window.removeEventListener('storage',read)};
 },[key,items]);
 function answer(q:Question,answerId?:string){
  let next={...answers};
  try{next=readAnswers(localStorage.getItem(key),items)}catch{}
  if(answerId)next[q.id]={revision:q.revision,answerId};else delete next[q.id];
  setAnswers(next);
  try{localStorage.setItem(key,serializeAnswers(next));window.dispatchEvent(new Event('logic-quiz-change'))}catch{}
 }
 return <div className="quizzes">{items.map((q,i)=>{
  const selected=answers[q.id]?.answerId;
  return <div className="quiz" key={q.id} data-question-id={q.id}><div className="small-label">{lang==='zh'?'判断练习':'Judgment'} {i+1}</div><p>{q.text[lang]}</p><div className="quiz-options">{q.options.map(o=><button key={o.id} aria-pressed={selected===o.id} onClick={()=>answer(q,o.id)}>{o.label[lang]}</button>)}</div>{selected&&<div className="feedback" role="status"><strong>{q.acceptedAnswerIds.includes(selected)?(lang==='zh'?'判断合适，注意下列依据。':'That fits, on the grounds below.'):(lang==='zh'?'再检查判断的依据。':'Check the basis for your judgment.')}</strong><p>{(q.feedback[selected]||q.analysis)[lang]}</p>{q.acceptedAnswerIds.length>1&&<p className="small">{lang==='zh'?'本题接受有明确依据的不同解释；请核对所选解释的条件。':'This question accepts different readings with stated grounds. Check the condition attached to your reading.'}</p>}<button className="text-button" onClick={()=>answer(q)}>{lang==='zh'?'重新作答':'Try again'}</button></div>}</div>;
 })}</div>;
}
