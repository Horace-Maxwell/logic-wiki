import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {dirname,join,resolve,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {parse} from 'yaml';
import {current,environment,hash,receipt,scan,stages,walk} from './editorial.mjs';

export const requiredFiles=['CONTRIBUTING.md','CODE_OF_CONDUCT.md','SECURITY.md','SUPPORT.md','CITATION.cff','CHANGELOG.md','ROADMAP.md','LICENSING.md','NOTICE.md','.editorconfig','.gitattributes','.nvmrc','.github/PULL_REQUEST_TEMPLATE.md','.github/ISSUE_TEMPLATE/config.yml','.github/ISSUE_TEMPLATE/content-correction.md','.github/ISSUE_TEMPLATE/bug-report.md','.github/ISSUE_TEMPLATE/proposal.md'];
export function repositoryText(){
  const rootDocs=readdirSync('.').filter(f=>/\.(md|cff)$/.test(f)&&!['README.md','AGENTS.md'].includes(f));
  const files=[...new Set([...requiredFiles,...rootDocs,...walk('.github'),'package.json','package-lock.json','scripts/repository-review.mjs','tests/repository.test.mjs'])].sort();
  return {id:'repository-meta',files:files.map(f=>[f,readFileSync(f,'utf8')])};
}
export function validateMetadata(unit){
  const errors=[];
  const files=new Map(unit.files);
  for(const f of requiredFiles)if(!files.has(f))errors.push(`Missing ${f}`);
  for(const [file,text] of files){
    if(/\.(md|cff|yml|yaml)$/.test(file)){
      for(const finding of scan(text))errors.push(`${file}: ${finding.id}`);
    }
    if(file.endsWith('.md')){
      if(!/[\u3400-\u9fff]/.test(text)||!/[A-Za-z]{3}/.test(text))errors.push(`${file}: missing bilingual text`);
      for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
        const target=match[1];if(/^(?:https?:|mailto:)/.test(target))continue;
        const [path,anchor]=target.split('#');const destination=path?join(dirname(file),decodeURIComponent(path)):file;
        if(!existsSync(destination)&&!files.has(destination)){errors.push(`${file}: missing link ${target}`);continue;}
        if(anchor){const body=files.get(destination)??readFileSync(destination,'utf8');if(!body.includes(`id="${anchor}"`)&&!body.includes(`name="${anchor}"`))errors.push(`${file}: missing explicit anchor ${target}`);}
      }
    }
    if(/\.ya?ml$/.test(file)||file.endsWith('.cff'))try{parse(text,{uniqueKeys:true});}catch(e){errors.push(`${file}: ${e.message}`);}
    if(file.startsWith('.github/ISSUE_TEMPLATE/')&&file.endsWith('.md')){
      try{const front=text.match(/^---\n([\s\S]*?)\n---/);const data=parse(front?.[1]||'');if(!data?.name||!data?.about)errors.push(`${file}: missing template metadata`);}catch(e){errors.push(`${file}: ${e.message}`);}
    }
  }
  try{
    const cff=parse(files.get('CITATION.cff'));
    if(cff['cff-version']!=='1.2.0'||!cff.title||!cff.message||!cff.authors?.length||!cff.authors.every(a=>a.name||a['family-names']))errors.push('CITATION.cff: missing citation fields');
    const config=parse(files.get('.github/ISSUE_TEMPLATE/config.yml'));
    if(typeof config.blank_issues_enabled!=='boolean'||!config.contact_links?.every(x=>x.name&&x.about&&/^https:\/\//.test(x.url)))errors.push('Invalid issue chooser configuration');
  }catch(e){errors.push(e.message);}
  return errors;
}
function main(){
  const [mode,path]=process.argv.slice(2);const unit=repositoryText();
  if(mode==='--worksheet'&&path){writeFileSync(path,JSON.stringify({id:unit.id,candidateHash:hash(unit),executor:{type:'agent',name:''},completed:[],unresolved:[],notes:[],exceptions:[]},null,2)+'\n');console.log('Blank worksheet written. Review both languages, semantics, sources, links, and rendered documents before recording.');return;}
  if(mode==='--record'&&path){const result=receipt(unit,JSON.parse(readFileSync(path,'utf8')));writeFileSync('reviews/repository-meta.json',JSON.stringify(result,null,2)+'\n');console.log('Repository review declaration saved; this command does not perform editorial review.');return;}
  if(mode){console.log('Usage: npm run review:repository -- --worksheet <file.json> | --record <completed-file.json>\nRequired stages: '+stages.join(', '));return;}
  const errors=validateMetadata(unit);const pathToReceipt='reviews/repository-meta.json';let review;
  if(existsSync(pathToReceipt))try{review=JSON.parse(readFileSync(pathToReceipt,'utf8'));}catch{}
  if(!current(unit,review,environment(unit)))errors.push('Repository metadata review is missing or stale');
  if(errors.length)throw Error(errors.join('\n'));
  console.log(`Repository metadata passed: ${unit.files.length} files, YAML, citation fields, local links, and current bilingual review.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){try{main();}catch(e){console.error(e.message);process.exitCode=1;}}
