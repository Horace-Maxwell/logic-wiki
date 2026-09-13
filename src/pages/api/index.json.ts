import {allUnits} from '../../data/catalog.mjs';
import {comparisons} from '../../data/comparisons.mjs';
import {sources} from '../../data/sources.mjs';
import {createHash} from 'node:crypto';
const hash=(value:unknown)=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function GET(){
 const units=allUnits.map((unit:any)=>({
  id:unit.id,kind:unit.kind,title:unit.title,aliases:unit.aliases,
  bilingualVersion:hash(unit),references:unit.refs,
  sections:unit.examples?['definition','pattern','examples','counter','repair',...(unit.sections||[]).map((s:any)=>s.id),'practice']:unit.sections.map((s:{id:string})=>s.id),
  hasComparison:comparisons.some(c=>c.ids.includes(unit.id)),
  routes:Object.fromEntries(['zh','en'].map(lang=>[lang,{article:`/${lang}/wiki/${unit.id}/`,bilingual:`/${lang}/bilingual/${unit.id}/`,content:`/api/${lang}/${unit.id}.json`}])) ,
  exercises:(unit.exercises||[]).map((q:any)=>({id:q.id,revision:q.revision,optionIds:q.options.map((o:any)=>o.id),acceptedAnswerIds:q.acceptedAnswerIds})),
  tutorialExercises:(unit.sections||[]).flatMap((s:any)=>(s.practice||[]).map((q:any)=>({id:q.id,sectionId:s.id,revision:hash(q),type:'worked-response',anchors:{zh:`${q.id}-zh`,en:`${q.id}-en`}}))),
  backlinks:allUnits.filter((other:any)=>other.related?.includes(unit.id)).map(other=>other.id)
 }));
 return new Response(JSON.stringify({schemaVersion:1,languages:['zh','en'],defaultLanguage:'zh',sourcesVersion:hash(sources),units},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
