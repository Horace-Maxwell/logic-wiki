import {readFileSync,existsSync} from 'node:fs';
import katex from 'katex';
import {allUnits,fallacies,guides,cases,paths} from '../src/data/catalog.mjs';
import {sources} from '../src/data/sources.mjs';
import {sourceGroups} from '../src/data/reading.mjs';
import {comparisons} from '../src/data/comparisons.mjs';
import {current,hash,projectText,scanUnit,environment} from './editorial.mjs';
const errors=[];const check=(ok,msg)=>{if(!ok)errors.push(msg)};
check(fallacies.length===100&&guides.length===40&&cases.length===30,'Expected 100 entries, 40 guides, and 30 cases');
check(new Set(allUnits.map(e=>e.id)).size===170,'Duplicate unit IDs');check(new Set(sources.map(s=>s.id)).size===sources.length,'Duplicate source IDs');
function bilingual(x,p){if(!x||typeof x!=='object')return;if('zh'in x||'en'in x){check(typeof x.zh==='string'&&x.zh.trim().length>0&&typeof x.en==='string'&&x.en.trim().length>0,`${p}: incomplete language pair`);check(!x.zh?.includes('|')&&!x.en?.includes('|'),`${p}: broken bilingual delimiter`);}else for(const[k,v]of Object.entries(x))bilingual(v,`${p}.${k}`);}
for(const e of allUnits){bilingual(e,e.id);check(e.refs.length>0,`${e.id}: no source`);for(const id of e.refs)check(sources.some(s=>s.id===id),`${e.id}: unknown reference ${id}`);for(const id of e.related||[])check(allUnits.some(u=>u.id===id),`${e.id}: unknown related unit ${id}`);if(e.examples){check(e.examples.length>=2&&e.counter?.analysis?.en,`${e.id}: missing examples/answers`);check(new Set(e.examples.map(x=>x.text.en)).size===e.examples.length,`${e.id}: duplicate examples`);}else{check(e.sections.length>=3,`${e.id}: incomplete article`);check(new Set(e.sections.map(s=>s.id)).size===e.sections.length,`${e.id}: duplicate section IDs`);}if(e.kind==='case')check(e.quote&&e.date&&e.primaryUrl,`${e.id}: missing original source`);if(e.formula)try{katex.renderToString(e.formula,{throwOnError:true})}catch(err){errors.push(`${e.id}: ${err.message}`);}}
const tutorialIds=new Set();
for(const e of allUnits){
 const sectionIds=new Set();
 for(const s of e.sections||[]){
  check(!sectionIds.has(s.id),`${e.id}: duplicate section ${s.id}`);sectionIds.add(s.id);
  for(const r of s.readings||[])check(e.refs.includes(r.sourceId)&&sources.some(x=>x.id===r.sourceId)&&r.locator?.zh&&r.locator?.en,`${e.id}/${s.id}: unregistered section source`);
  for(const q of s.practice||[]){check(/^[a-z][a-z0-9-]+$/.test(q.id),`${e.id}: invalid tutorial question ID`);check(!tutorialIds.has(q.id),`${e.id}: duplicate tutorial question ${q.id}`);tutorialIds.add(q.id);check(q.prompt?.zh&&q.prompt?.en&&q.answer?.zh&&q.answer?.en,`${q.id}: incomplete tutorial exercise`);}
  if(s.table)check(s.table.headers.length>0&&s.table.rows.every(r=>r.length===s.table.headers.length),`${e.id}/${s.id}: ragged table`);
  for(const formula of [s.formula,...(s.proof?.lines||[]).map(l=>l.formula)].filter(Boolean)){check(!/[\u0000-\u001f]/.test(formula),`${e.id}/${s.id}: control character in formula`);try{katex.renderToString(formula,{throwOnError:true})}catch(err){errors.push(`${e.id}/${s.id}: ${err.message}`)}}
 }
}
const exerciseIds=new Set();
for(const e of fallacies){check(e.exercises?.length>=2,`${e.id}: missing canonical exercises`);for(const q of e.exercises||[]){check(!exerciseIds.has(q.id)&&q.id.startsWith(e.id+'-'),`${e.id}: unstable or duplicate question ID`);exerciseIds.add(q.id);check(q.revision?.length===64&&q.analysis.zh&&q.analysis.en,`${q.id}: missing revision or explanation`);check(q.options.length===3&&new Set(q.options.map(o=>o.id)).size===3,`${q.id}: invalid option IDs`);check(q.acceptedAnswerIds.length&&q.acceptedAnswerIds.every(id=>q.options.some(o=>o.id===id)),`${q.id}: invalid answer IDs`);if(q.acceptedAnswerIds.length>1)for(const id of q.acceptedAnswerIds)check(q.feedback[id]?.zh&&q.feedback[id]?.en,`${q.id}: unexplained interpretation`);}}
for(const p of [...paths,...comparisons])for(const id of p.ids)check(allUnits.some(e=>e.id===id),`Unknown path/comparison unit ${id}`);
const lock=JSON.parse(readFileSync('vendor/humanizer/lock.json','utf8'));for(const item of lock)for(const[file,expected]of Object.entries(item.files))check(hash(readFileSync(`vendor/humanizer/${item.language}/${file}`,'utf8'))===expected,`Pinned upstream changed: ${item.language}/${file}`);
for(const unit of [...allUnits,projectText()]){const path=`reviews/${unit.id}.json`;let r;if(existsSync(path)){try{r=JSON.parse(readFileSync(path,'utf8'))}catch{}}check(current(unit,r,environment(unit)),`${unit.id}: missing or stale editorial review`);for(const finding of scanUnit(unit)){const exception=r?.exceptions?.find(x=>x.rule===finding.id&&x.path===finding.path&&x.reason?.length>15);check(exception&&(finding.level!=='error'||exception.type==='quoted-or-discussed'),`${unit.id} ${finding.path}: ${finding.id}`);}}
for(const s of sources)check(s.url.startsWith('https://')&&s.locator&&s.access&&s.license&&s.accessed&&(s.group in sourceGroups),`${s.id}: incomplete source provenance`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Content passed: ${guides.length} guides, ${fallacies.length} entries, ${cases.length} cases; ${sources.length} sources; 171 current editorial receipts.`);
