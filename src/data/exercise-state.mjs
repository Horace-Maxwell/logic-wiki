// Language versions share answers; a bilingual question revision invalidates stale choices.
export function readAnswers(raw,items){
 try{
  const state=JSON.parse(raw||'null');
  if(state?.schemaVersion!==2||!state.answers||typeof state.answers!=='object')return {};
  return Object.fromEntries(items.flatMap(q=>{
   const saved=state.answers[q.id];
   return saved?.revision===q.revision&&q.options.some(o=>o.id===saved.answerId)?[[q.id,saved]]:[];
  }));
 }catch{return {}}
}
export function serializeAnswers(answers){return JSON.stringify({schemaVersion:2,answers});}
