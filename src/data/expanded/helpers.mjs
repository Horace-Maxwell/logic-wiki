import {bi} from '../model.mjs';
export {bi};
export const B=(zh,en)=>bi(zh,en);
export const section=(id,zh,en,bodyZh,bodyEn,extra={})=>({id,title:B(zh,en),body:B(bodyZh,bodyEn),...extra});
export const reading=(chapter,zh,en)=>({sourceId:'forallx',url:`https://forallx.openlogicproject.org/html/Ch${chapter}.html`,locator:B(`forall x 第 ${chapter} 章：${zh}`,`forall x, chapter ${chapter}: ${en}`)});
export const source=(sourceId,zh,en,url)=>({sourceId,locator:B(zh,en),...(url?{url}:{})});
export const exercise=(id,zh,en,az,ae,steps)=>({id,prompt:B(zh,en),answer:B(az,ae),...(steps?{steps}:{})});
export const proof=(zh,en,lines)=>({caption:B(zh,en),lines:lines.map(([formula,depth,z,e])=>({formula,depth,rule:B(z,e)}))});
