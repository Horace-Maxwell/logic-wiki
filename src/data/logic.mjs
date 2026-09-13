export const implies=(p,q)=>!p||q;
export const truthRows=()=>[true,false].flatMap(p=>[true,false].map(q=>({p,q,conditional:implies(p,q)})));
export const propositionalPatterns={
 'affirming-consequent':{premises:r=>r.conditional&&r.q,conclusion:r=>r.p,formula:'P\\to Q,\\ Q\\quad\\not\\models P'},
 'denying-antecedent':{premises:r=>r.conditional&&!r.p,conclusion:r=>!r.q,formula:'P\\to Q,\\ \\neg P\\quad\\not\\models\\neg Q'},
 'affirming-disjunct':{premises:r=>(r.p||r.q)&&r.p,conclusion:r=>!r.q,formula:'P\\lor Q,\\ P\\quad\\not\\models\\neg Q'},
 'denying-conjunct':{premises:r=>!(r.p&&r.q)&&!r.p,conclusion:r=>r.q,formula:'\\neg(P\\land Q),\\ \\neg P\\quad\\not\\models Q'}
};
export function counterRows(id){const f=propositionalPatterns[id];return f?truthRows().filter(r=>f.premises(r)&&!f.conclusion(r)):[];}
export function posterior(prevalence,sensitivity,specificity){const tp=prevalence*sensitivity;return tp/(tp+(1-prevalence)*(1-specificity));}
export const finiteModels={
 'undistributed-middle':{sets:{A:[0],B:[1],M:[0,1]},premises:m=>subset(m.A,m.M)&&subset(m.B,m.M),conclusion:m=>subset(m.A,m.B)},
 'illicit-major':{sets:{A:[0],B:[0,1],C:[1]},premises:m=>subset(m.A,m.B)&&disjoint(m.C,m.A),conclusion:m=>disjoint(m.C,m.B)},
 'illicit-minor':{sets:{A:[0],B:[0],C:[0,1]},premises:m=>subset(m.A,m.B)&&subset(m.A,m.C),conclusion:m=>subset(m.C,m.B)},
 'four-terms':{sets:{A:[0],B:[0],C:[1],D:[1]},premises:m=>subset(m.A,m.B)&&subset(m.C,m.D),conclusion:m=>subset(m.A,m.D)},
 'exclusive-premises':{sets:{A:[0],B:[],C:[1]},premises:m=>disjoint(m.A,m.B)&&disjoint(m.C,m.B),conclusion:m=>subset(m.C,m.A)},
 'existential-fallacy':{sets:{A:[],B:[0]},premises:m=>subset(m.A,m.B),conclusion:m=>m.A.length>0},
 'illicit-conversion':{sets:{A:[0],B:[0,1]},premises:m=>subset(m.A,m.B),conclusion:m=>subset(m.B,m.A)},
 'quantifier-shift':{sets:{domain:[0,1],R:[[0,0],[1,1]]},premises:m=>m.domain.every(x=>m.domain.some(y=>m.R.some(([a,b])=>a===x&&b===y))),conclusion:m=>m.domain.some(y=>m.domain.every(x=>m.R.some(([a,b])=>a===x&&b===y)))},
 'quantifier-negation':{sets:{domain:[0,1],P:[0]},premises:m=>!m.domain.every(x=>m.P.includes(x)),conclusion:m=>m.domain.every(x=>!m.P.includes(x))},
 'modal-scope':{sets:{worlds:[{P:true,Q:true},{P:false,Q:false}],actual:0},premises:m=>m.worlds.every(w=>implies(w.P,w.Q))&&m.worlds[m.actual].P,conclusion:m=>m.worlds.every(w=>w.Q)}
};
function subset(a,b){return a.every(x=>b.includes(x));}function disjoint(a,b){return a.every(x=>!b.includes(x));}
