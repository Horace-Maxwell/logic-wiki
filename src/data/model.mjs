export const bi=(zh,en)=>({zh,en});
export const categories={formal:bi('形式与结构','Form and structure'),relevance:bi('相关性与论题','Relevance and subject'),authority:bi('权威与情感','Authority and emotion'),presumption:bi('预设与举证','Presupposition and proof'),language:bi('语言与概念','Language and concepts'),induction:bi('归纳与类比','Induction and analogy'),causal:bi('因果推理','Causal reasoning'),statistics:bi('概率与统计','Probability and statistics'),dialogue:bi('讨论与评价','Discussion and appraisal')};
export function entry(id,zh,en,category,definition,pattern,examples,counter,repair,refs=['iep','sep']){
 const pair=x=>bi(...x.split('|'));
 const example=x=>{const [z,e,az,ae]=x.split('|');return {text:bi(z,e),analysis:bi(az,ae)}};
 return {id,kind:category==='formal'?'formal':category==='statistics'?'statistical':'informal',title:bi(zh,en),category,aliases:[],definition:pair(definition),pattern:pair(pattern),examples:examples.map(example),counter:example(counter),repair:pair(repair),refs,related:[],level:category==='formal'?2:1};
}
