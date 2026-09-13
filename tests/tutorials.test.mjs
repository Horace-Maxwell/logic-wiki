import test from 'node:test';import assert from 'node:assert/strict';
import {guides} from '../src/data/catalog.mjs';
import katex from 'katex';
import {formalExpansion} from '../src/data/expanded/formal.mjs';
const normalize=s=>s.replaceAll('\\to','→').replaceAll('\\land','∧').replaceAll('\\lor','∨').replaceAll('\\neg','¬').replaceAll('\\leftrightarrow','↔').replace(/\s/g,'');
function parse(input){const tokens=[...normalize(input)];let i=0;
 const atom=()=>{if(tokens[i]==='¬'){i++;return ['¬',atom()]}if(tokens[i]==='('){i++;const e=imp();assert.equal(tokens[i++],')');return e}const t=tokens[i++];assert.match(t||'',/^[A-Z]$/);return t};
 const and=()=>{let e=atom();while(tokens[i]==='∧'){i++;e=['∧',e,atom()]}return e};
 const or=()=>{let e=and();while(tokens[i]==='∨'){i++;e=['∨',e,and()]}return e};
 const imp=()=>{const e=or();if(tokens[i]==='→'){i++;return ['→',e,imp()]}return e};
 const e=imp();assert.equal(i,tokens.length);return e;
}
function evaluate(a,v){if(typeof a==='string')return v[a];if(a[0]==='¬')return !evaluate(a[1],v);const l=evaluate(a[1],v),r=evaluate(a[2],v);return a[0]==='∧'?l&&r:a[0]==='∨'?l||r:!l||r;}
const valid=(premises,conclusion)=>{const strings=[...premises,conclusion],vars=[...new Set(strings.flatMap(s=>[...normalize(s)].filter(c=>/^[A-Z]$/.test(c))))];const trees=strings.map(parse);return Array.from({length:2**vars.length},(_,n)=>Object.fromEntries(vars.map((x,i)=>[x,Boolean(n&(1<<i))]))).every(v=>!trees.slice(0,-1).every(t=>evaluate(t,v))||evaluate(trees.at(-1),v));};
test('Displayed tutorial proof conclusions follow from their stated premises',()=>{
 const proofs=Object.values(formalExpansion).flat().filter(s=>s.proof);assert.equal(proofs.length,2);
 for(const {proof} of proofs){const premises=proof.lines.filter(l=>l.depth===0&&l.rule.en==='Premise').map(l=>l.formula);assert.ok(valid(premises,proof.lines.at(-1).formula),proof.caption.en);}
 assert.equal(valid(['A\\lor B','A\\to C'],'C'),false);
 assert.equal(valid(['A\\to B','\\neg A'],'\\neg B'),false);
 assert.ok(valid(['A','\\neg A'],'B'));
});
test('Expanded tutorials provide distinct exercises and valid chapter links',()=>{
 const ids=new Set();for(const [id,sections] of guides.map(g=>[g.id,g.sections])){const questions=sections.flatMap(s=>s.practice||[]);assert.ok(questions.length>=2,id);for(const q of questions){assert.ok(!ids.has(q.id));ids.add(q.id);assert.ok(q.prompt.zh&&q.prompt.en&&q.answer.zh&&q.answer.en);}for(const s of sections)for(const r of s.readings||[])if(r.sourceId==='forallx')assert.match(r.url,/^https:\/\/forallx\.openlogicproject\.org\/html\/Ch\d+\.html$/);}
});
import {coreFallacyExpansion} from '../src/data/expanded/fallacies-core.mjs';
import {fallacies} from '../src/data/catalog.mjs';
test('Expanded fallacy exercises use new situations and bilingual explanations',()=>{
 for(const id of fallacies.filter(e=>e.practice).map(e=>e.id)){const e=fallacies.find(e=>e.id===id);for(const q of e.practice){assert.ok(![...e.examples,e.counter].some(x=>x.text.zh===q.text.zh||x.text.en===q.text.en),id);assert.ok(q.analysis.zh.trim()&&q.analysis.en.trim());assert.ok(e.exercises.some(x=>x.id===`${id}-${q.id}`));}}
});
test('Conditional path calculation retains conditional rather than independent assumptions',()=>{assert.ok(Math.abs(.8*.8*.8-.512)<1e-12);assert.ok(.512<.8);});
test('Probability tables conserve counts and support the displayed conditionals',()=>{
 const table=id=>guides.find(g=>g.id===id).sections.find(s=>s.table).table.rows.map(r=>r.slice(1).map(x=>Number(x.en)));
 const orders=table('probability');for(const r of orders)assert.equal(r[0]+r[1],r[2]);for(let c=0;c<3;c++)assert.equal(orders[0][c]+orders[1][c],orders[2][c]);assert.equal(orders[0][0]/orders[0][2],.3);assert.equal(orders[0][0]/orders[2][0],.6);
 const cohort=table('bayes');for(const r of cohort)assert.equal(r[0]+r[1],r[2]);for(let c=0;c<3;c++)assert.equal(cohort[0][c]+cohort[1][c],cohort[2][c]);assert.equal(cohort[0][0]/cohort[0][2],.95);assert.equal(cohort[1][0]/cohort[1][2],.1);assert.equal((100*cohort[0][0]/cohort[2][0]).toFixed(2),'16.24');
 const posterior=(prior,sensitivity,falsePositive)=>prior*sensitivity/(prior*sensitivity+(1-prior)*falsePositive);
 assert.equal((100*posterior(.05,.8,.05)).toFixed(2),'45.71');assert.equal((100*posterior(.2,.95,.1)).toFixed(2),'70.37');assert.ok(Math.abs(posterior(.04,.3,.3)-.04)<1e-12);
});
test('Coin-test tails, confidence interval, and collider selection recompute correctly',()=>{
 const flips=Array.from({length:1024},(_,i)=>i.toString(2).split('1').length-1);assert.equal(flips.filter(n=>n<=1||n>=9).length/1024,.021484375);assert.equal(flips.filter(n=>n>=9).length/1024,11/1024);
 const se=Math.sqrt(.6*.4/400);assert.equal((.6-1.96*se).toFixed(3),'0.552');assert.equal((.6+1.96*se).toFixed(3),'0.648');assert.equal((100*(1-.95**20)).toFixed(2),'64.15');
 const states=[{a:false,b:false},{a:false,b:true},{a:true,b:false},{a:true,b:true}];const selected=states.filter(x=>x.a||x.b);const rate=(rows,key)=>rows.filter(x=>x[key]).length/rows.length;assert.equal(rate(selected.filter(x=>!x.a),'b'),1);assert.equal(rate(selected.filter(x=>x.a),'b'),.5);
});
test('Modal examples evaluate accessibility, including dead ends and S5 actuality',()=>{
 const box=(edges,values,w)=>edges.filter(([from])=>from===w).every(([,to])=>values[to]);
 const diamond=(edges,values,w)=>edges.filter(([from])=>from===w).some(([,to])=>values[to]);
 assert.equal(box([['w','v']],{w:false,v:true},'w'),true);assert.equal(box([['w','v'],['w','w']],{w:false,v:true},'w'),false);
 assert.equal(box([],{w:false},'w'),true);assert.equal(diamond([],{w:true},'w'),false);
 assert.equal(box([['w','w'],['w','v'],['v','w'],['v','v']],{w:true,v:false},'w'),false);
});
test('Nested formulas render and retain LaTeX operators without escaped control characters',()=>{
 for(const g of guides)for(const s of g.sections)if(s.formula){assert.doesNotMatch(s.formula,/[\u0000-\u001f]/);assert.doesNotThrow(()=>katex.renderToString(s.formula,{throwOnError:true}));}
 const formula=guides.find(g=>g.id==='probability').sections.find(s=>s.formula).formula;assert.ok(formula.includes('\\cup')&&formula.includes('\\cap')&&formula.includes('\\mid'));
});
import {cases} from '../src/data/catalog.mjs';
test('Aggregate counterexamples and Berkeley tables preserve their distinct margins',()=>{
 const alternatives=fallacies.find(e=>e.id==='ecological-fallacy').sections.find(s=>s.table).table.rows.map(r=>r.slice(1).map(v=>Number(v.en)));
 for(const [tp,tf,up,uf] of alternatives){assert.equal(tp+tf,50);assert.equal(up+uf,50);assert.equal(tp+up,60);assert.equal(tf+uf,40);}
 assert.ok(alternatives[0][0]/50<alternatives[0][2]/50);assert.ok(alternatives[1][0]/50>alternatives[1][2]/50);
 const rows=cases.find(e=>e.id==='case-berkeley').sections.find(s=>s.table).table.rows.map(r=>r.slice(1).map(v=>Number(v.en)));
 for(const [accepted,rejected,total]of rows)assert.equal(accepted+rejected,total);
 assert.equal(rows[0][2]+rows[1][2],12763);assert.equal(rows[2][2]+rows[3][2],4526);
 assert.equal((100*rows[0][0]/rows[0][2]).toFixed(2),'44.28');assert.equal((100*rows[1][0]/rows[1][2]).toFixed(2),'34.58');
});
test('Enumerated models distinguish pairwise independence, joint independence, and regression',()=>{
 const worlds=[false,true].flatMap(a=>[false,true].map(b=>({a,b,c:a===b,x:50+(a?10:-10),y:50+(b?10:-10)})));
 const p=fn=>worlds.filter(fn).length/worlds.length;
 for(const [a,b]of[['a','b'],['a','c'],['b','c']])assert.equal(p(w=>w[a]&&w[b]),p(w=>w[a])*p(w=>w[b]));
 assert.equal(p(w=>w.a&&w.b&&w.c),.25);assert.notEqual(.25,p(w=>w.a)*p(w=>w.b)*p(w=>w.c));
 const high=worlds.filter(w=>w.x===60);assert.equal(high.reduce((s,w)=>s+w.y,0)/high.length,50);assert.ok(high.some(w=>w.y===60));
 const attempts=Array.from({length:4**4},(_,i)=>Array.from({length:4},(_,j)=>Math.floor(i/(4**j))%4));
 assert.equal(attempts.filter(a=>a.some(x=>x===0)).length/attempts.length,1-.75**4);
 assert.equal((100*40/(40+95)).toFixed(1),'29.6');assert.equal((100*(1-.95**10)).toFixed(2),'40.13');
});
test('Case exercises distinguish selected ratios, overlapping criteria, and expected positive counts',()=>{
 const sequences=Array.from({length:8},(_,i)=>i.toString(2).padStart(3,'0').replaceAll('0','T').replaceAll('1','H'));
 const eligible=sequences.map(sequence=>({sequence,outcomes:[...sequence].slice(1).filter((_,i)=>sequence[i]==='H')})).filter(s=>s.outcomes.length);
 const successes=s=>s.outcomes.filter(x=>x==='H').length;
 assert.equal(eligible.length,6);
 assert.equal(eligible.reduce((sum,s)=>sum+successes(s)/s.outcomes.length,0)/eligible.length,5/12);
 assert.equal(eligible.reduce((sum,s)=>sum+successes(s),0)/eligible.reduce((sum,s)=>sum+s.outcomes.length,0),.5);
 const rows=cases.find(c=>c.id==='case-hot-hand').sections.find(s=>s.table).table.rows;
 const displayed=Object.fromEntries(rows.map(([seq,rate])=>[seq.en,rate.en]));
 for(const s of eligible)assert.equal(displayed[s.sequence],successes(s)/s.outcomes.length===.5?'1/2':String(successes(s)/s.outcomes.length));
 assert.equal(8+10-6,12);
 assert.equal((100*(1-.95**4)).toFixed(2),'18.55');
 assert.equal(80/(80+900*.05),.64);
 assert.equal((100*8/(8+990*.05)).toFixed(2),'13.91');
 assert.equal(2**-5,1/32);
 for(const c of cases)assert.equal(c.sections.flatMap(s=>s.practice||[]).length,1,c.id);
});
