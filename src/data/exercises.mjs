import {createHash} from 'node:crypto';
import {bi} from './model.mjs';
export const answerOptions = [
 {id:'error',label:bi('存在这里讨论的错误','This error is present')},
 {id:'clear',label:bi('不构成这里讨论的错误','This error is not present')},
 {id:'context',label:bi('还缺关键信息','More context is needed')}
];
export function exercise(id,item,acceptedAnswerIds){
 const content={id,origin:'original-teaching-example',text:item.text,analysis:item.analysis,options:answerOptions,acceptedAnswerIds,feedback:item.feedback||{}};
 return {...content,revision:createHash('sha256').update(JSON.stringify(content)).digest('hex')};
}
export function exercisesFor(entry){if(entry.practice)return [...entry.practice,...(entry.extraPractice||[])].map(item=>exercise(`${entry.id}-${item.id}`,item,item.acceptedAnswerIds||[item.answer]));return [
 exercise(`${entry.id}-inference`,entry.examples[1],['error']),
 exercise(`${entry.id}-control`,entry.counter,['clear']),
 ...(entry.extraPractice||[]).map(item=>exercise(`${entry.id}-${item.id}`,item,item.acceptedAnswerIds||[item.answer]))
];}
