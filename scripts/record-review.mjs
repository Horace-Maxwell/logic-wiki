import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {allUnits} from '../src/data/catalog.mjs';
import {receipt,hash,projectText,stages} from './editorial.mjs';
const [mode,file]=process.argv.slice(2);const units=[...allUnits,projectText()];
if(mode==='--worksheet'&&file){writeFileSync(file,JSON.stringify(units.map(u=>({id:u.id,candidateHash:hash(u),executor:{type:'agent',name:''},completed:[],unresolved:[],notes:[],exceptions:[]})),null,2)+'\n');console.log('Blank review worksheet written. Complete only after actual editorial work.');}
else if(mode==='--record'&&file){const review=JSON.parse(readFileSync(file,'utf8'));mkdirSync('reviews',{recursive:true});const pending=review.map(r=>{const unit=units.find(u=>u.id===r.id);if(!unit)throw Error('Unknown unit '+r.id);return receipt(unit,r)});for(const r of pending)writeFileSync(`reviews/${r.id}.json`,JSON.stringify(r,null,2)+'\n');console.log(`${pending.length} declared reviews recorded. This command does not perform editorial review.`);}
else{console.log('Usage: node scripts/record-review.mjs --worksheet <file.json> | --record <completed-file.json>\nRequired stages: '+stages.join(', ')+'\nEach record requires the candidate hash, executor, concrete notes, no unresolved issues, and reasons for any style exceptions. The command stores declarations, not proof of human or expert review.');}
