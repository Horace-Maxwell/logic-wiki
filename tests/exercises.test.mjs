import test from 'node:test';import assert from 'node:assert/strict';
import {fallacies} from '../src/data/fallacies.mjs';
import {exercise} from '../src/data/exercises.mjs';
import {readAnswers,serializeAnswers} from '../src/data/exercise-state.mjs';
const questions=fallacies[0].exercises;
const stored=serializeAnswers(Object.fromEntries(questions.map(q=>[q.id,{revision:q.revision,answerId:q.acceptedAnswerIds[0]}])));
test('Answers follow stable question IDs after reordering and language switching',()=>{
 const expected=readAnswers(stored,questions);
 assert.deepEqual(readAnswers(stored,[...questions].reverse()),expected);
 for(const lang of ['zh','en'])assert.deepEqual(readAnswers(stored,questions.map(q=>({...q,text:q.text[lang]}))),expected);
});
test('Changed prompts and answers invalidate only the affected question',()=>{
 for(const changed of [exercise(questions[0].id,{...questions[0],text:{...questions[0].text,zh:'Changed prompt'}},questions[0].acceptedAnswerIds),exercise(questions[0].id,questions[0],['context'])]){
  const answers=readAnswers(stored,[changed,questions[1]]);assert.equal(answers[changed.id],undefined);assert.ok(answers[questions[1].id]);
 }
});
test('Malformed, legacy, and unknown choices are ignored',()=>{
 for(const raw of ['{','null','[]','{"0":"error"}',serializeAnswers({[questions[0].id]:{revision:questions[0].revision,answerId:'unknown'}})])assert.deepEqual(readAnswers(raw,questions),{});
});
test('Every published exercise has bilingual prompts, stable options and explained answers',()=>{
 const ids=new Set();for(const e of fallacies){assert.ok(e.exercises.length>=2);for(const q of e.exercises){assert.ok(!ids.has(q.id));ids.add(q.id);for(const lang of ['zh','en']){assert.ok(q.text[lang]&&q.analysis[lang]);assert.ok(q.options.every(o=>o.label[lang]));}
  assert.ok(q.acceptedAnswerIds.length);for(const id of q.acceptedAnswerIds){assert.ok(q.options.some(o=>o.id===id));if(q.acceptedAnswerIds.length>1)assert.ok(q.feedback[id].zh&&q.feedback[id].en);}
 }}assert.equal(ids.size,202);
});
