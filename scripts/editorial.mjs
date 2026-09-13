import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {sources} from '../src/data/sources.mjs';
import {glossary,glossaryVersion} from '../src/data/glossary.mjs';
export const hash=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex');
export function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]).sort();}
export function environment(unit){const ruleFiles=['vendor/humanizer/lock.json','vendor/humanizer/en/SKILL.md','vendor/humanizer/zh/SKILL.md','skills/wiki-editor/SKILL.md','AGENTS.md','scripts/editorial.mjs'];return {rules:hash(ruleFiles.map(f=>[f,readFileSync(f,'utf8')])),glossary:hash({glossary,glossaryVersion}),glossaryVersion,sources:hash(unit?.refs?unit.refs.map(id=>sources.find(s=>s.id===id)):sources),versions:{en:'3.0.0',zh:'2.9.1-zh.2'}};}
export const stages=['source-check','zh-edit','zh-semantic-check','en-edit','bilingual-check','exercise-and-render-check'];
export function projectText(){const files=[...walk('src/components'),...walk('src/layouts'),...walk('src/pages'),...walk('src/content'),...walk('src/styles'),'README.md','AGENTS.md','docs/EDITORIAL.md','src/data/i18n.mjs','src/data/catalog.mjs','src/data/comparisons.mjs','src/data/reading.mjs','src/data/logic.mjs'];return {id:'site-copy',files:files.map(f=>[f,readFileSync(f,'utf8')])};}
export function languageHash(unit,lang){function pick(v){if(v&&typeof v==='object'){if('zh'in v&&'en'in v)return v[lang];return Array.isArray(v)?v.map(pick):Object.fromEntries(Object.entries(v).map(([k,x])=>[k,pick(x)]));}return v;}return hash(pick(unit));}
function completeReview(review){return Boolean(review&&['agent','human'].includes(review.executor?.type)&&typeof review.executor?.name==='string'&&review.executor.name.trim()&&Array.isArray(review.completed)&&stages.every(s=>review.completed.includes(s))&&Array.isArray(review.unresolved)&&review.unresolved.length===0&&Array.isArray(review.notes)&&review.notes.length&&review.notes.every(n=>typeof n==='string'&&n.trim()));}
export function receipt(unit,review,env=environment(unit)){
 if(review.candidateHash!==hash(unit))throw Error(`${unit.id}: reviewed candidate changed`);
 if(!completeReview(review))throw Error(`${unit.id}: review is incomplete`);
 return {...review,id:unit.id,contentHash:hash(unit),zhHash:languageHash(unit,'zh'),enHash:languageHash(unit,'en'),translationBasisHash:languageHash(unit,'zh'),environment:env,recordedAt:new Date().toISOString()};
}
export function current(unit,r,env=environment(unit)){return Boolean(completeReview(r)&&r.id===unit.id&&r.candidateHash===hash(unit)&&r.contentHash===hash(unit)&&r.zhHash===languageHash(unit,'zh')&&r.enHash===languageHash(unit,'en')&&r.translationBasisHash===languageHash(unit,'zh')&&hash(r.environment)===hash(env));}
const rules=[
 {id:'placeholder',level:'error',pattern:/\b(?:TODO|TBD|lorem ipsum)\b|待补充|占位文字/i},
 {id:'chat-residue',level:'error',pattern:/作为(?:一个|一名)?(?:AI|人工智能)|希望(?:这|以上).{0,8}(?:帮助|有用)|I hope this helps|As an AI (?:language )?model/i},
 {id:'inflation',level:'review',pattern:/具有里程碑意义|注入新动能|开启新篇章|game.changer|groundbreaking|revolutionary/i},
 {id:'stock-opener',level:'review',pattern:/值得注意的是|总而言之|在当今.{0,10}时代|it is worth noting|in today.s.{0,15}world|let.s delve/i}
];
export function scan(text,context={}){if(context.protected)return [];return rules.filter(r=>r.pattern.test(text)).map(({id,level})=>({id,level}));}
export function scanUnit(unit){const found=[];function visit(x,path=[]){if(typeof x==='string'){if(['quote','url','primaryUrl','formula','refs','aliases','source'].some(k=>path.includes(k)))return;for(const finding of scan(x))found.push({...finding,path:path.join('.'),text:x});}else if(x&&typeof x==='object')for(const[k,v]of Object.entries(x))visit(v,[...path,k]);}visit(unit);return found;}
// These cues flag a changed protected meaning for review; they do not certify translation equivalence.
export function semanticWarnings(before,after){const pairs=[[/并非所有|not all/i,/所有.{0,12}都不|\bnone\b/i,'quantifier'],[/可能|\bmay\b|\bpossible\b/i,/必然|\bmust\b|\bnecessarily\b/i,'modality'],[/支持|\bsupports?\b/i,/证明|\bproves?\b/i,'evidence-strength'],[/\bif\b|如果|若/i,/\balways\b|总是/,'condition']];return pairs.filter(([a,b])=>a.test(before)&&b.test(after)&&!b.test(before)).map(x=>x[2]);}
