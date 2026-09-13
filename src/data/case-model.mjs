import {bi} from './model.mjs';
export function C(id,zh,en,date,sourceTitle,author,url,access,quote,translation,lead,background,reconstruct,boundary,check,related=[]){
 const b=s=>bi(...s.split('|'));const sid=id==='case-asa'?'asa':'source-'+id;
 const source={id:sid,title:sourceTitle,author,date,url,access,locator:access==='abstract'?'Abstract / 摘要':'Relevant passage / 相关段落',license:'Reference only; rights retained by source',group:'primary',note:bi('用于本案例的事实背景。论证重构和教学判断由本站提出。','Supports this case’s factual background. Argument reconstruction and teaching judgments are our own.')};
 return {id,source,kind:'case',title:bi(zh,en),date,lead:b(lead),quote,quoteKind:'excerpt',quoteTranslation:b(translation),primaryUrl:url,refs:[sid],related,aliases:[],sections:[
 {id:'background',title:bi('背景与来源所述','Background: what the source reports'),body:b(background)},
 {id:'reconstruction',title:bi('论证重构 · 本站分析','Argument reconstruction · our analysis'),body:b(reconstruct)},
 {id:'limits',title:bi('判断的边界','Limits of the judgment'),body:b(boundary)},
 {id:'check',title:bi('试着区分','Test the distinction'),body:b(check)}]};
}
