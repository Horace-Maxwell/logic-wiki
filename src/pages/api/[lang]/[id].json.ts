import {allUnits} from '../../../data/catalog.mjs';
import {createHash} from 'node:crypto';
export function getStaticPaths(){return ['zh','en'].flatMap(lang=>allUnits.map(unit=>({params:{lang,id:unit.id},props:{unit,lang}})));}
const hash=(x:unknown)=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
function localize(x:any,lang:string):any{if(x&&typeof x==='object'){if('zh'in x&&'en'in x)return x[lang];return Array.isArray(x)?x.map(v=>localize(v,lang)):Object.fromEntries(Object.entries(x).map(([k,v])=>[k,localize(v,lang)]));}return x;}
export function GET({props}:{props:{unit:any;lang:string}}){const {unit,lang}=props;return new Response(JSON.stringify({schemaVersion:1,id:unit.id,language:lang,bilingualVersion:hash(unit),translationBasisVersion:hash(localize(unit,'zh')),content:localize(unit,lang)},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
