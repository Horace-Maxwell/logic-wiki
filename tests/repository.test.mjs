import test from 'node:test';
import assert from 'node:assert/strict';
import {repositoryText,validateMetadata} from '../scripts/repository-review.mjs';
import {current,hash,receipt,stages} from '../scripts/editorial.mjs';

const replace=(unit,file,transform)=>({...unit,files:unit.files.map(([f,text])=>[f,f===file?transform(text):text])});

test('metadata checker detects broken contributor links and duplicate YAML keys',()=>{
  const unit=repositoryText();
  assert.deepEqual(validateMetadata(unit),[]);
  const broken=replace(unit,'CONTRIBUTING.md',s=>s+'\n[Missing](missing-contributor-guide.md)\n');
  assert.ok(validateMetadata(broken).some(x=>x.includes('missing link')));
  const duplicate=replace(unit,'.github/ISSUE_TEMPLATE/config.yml',s=>s+'\nblank_issues_enabled: false\n');
  assert.ok(validateMetadata(duplicate).some(x=>x.includes('unique')));
});

test('metadata checker rejects unusable issue templates and citations',()=>{
  const unit=repositoryText();
  assert.ok(validateMetadata(replace(unit,'.github/ISSUE_TEMPLATE/bug-report.md',s=>s.replace('about:', 'description:'))).some(x=>x.includes('template metadata')));
  assert.ok(validateMetadata(replace(unit,'CITATION.cff',s=>s.replace('authors:', 'editors:'))).some(x=>x.includes('citation fields')));
});

test('a change to either language invalidates metadata review',()=>{
  const unit=repositoryText();
  const r=receipt(unit,{id:unit.id,candidateHash:hash(unit),executor:{type:'agent',name:'Test fixture, not editorial approval'},completed:stages,unresolved:[],notes:['Fixture for freshness testing only.']});
  assert.equal(current(unit,r),true);
  for(const addition of ['\n额外中文内容。\n','\nAdditional English content.\n'])assert.equal(current(replace(unit,'SUPPORT.md',s=>s+addition),r),false);
});
