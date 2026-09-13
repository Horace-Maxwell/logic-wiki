import {fallacies} from './fallacies.mjs';
import {guides} from './guides.mjs';
import {cases} from './cases.mjs';
export {fallacies,guides,cases};
export const allUnits=[...fallacies,...guides,...cases];
export const findUnit=id=>allUnits.find(x=>x.id===id);
export const chapters=[
['arguments','论证与推理','Arguments and inference','前提、结论与推理的标准','Premises, conclusions, and standards of inference'],
['propositional','命题逻辑','Propositional logic','联结词、真值表与自然演绎','Connectives, truth tables, and natural deduction'],
['predicate','谓词逻辑','Predicate logic','量词、关系与解释模型','Quantifiers, relations, and interpretations'],
['evidence','归纳、概率与因果','Induction, probability, and cause','从观察走向有限度的判断','Reasoning from observations to qualified conclusions'],
['informal','非形式逻辑与论证','Informal logic and argument','自然语言中的理由与反驳','Reasons and objections in ordinary language'],
['advanced','逻辑史与进阶专题','History and further study','逻辑传统、语义与证明的边界','Logical traditions and the limits of proof']];
export const paths=[
{id:'beginner',title:{zh:'第一次学逻辑',en:'A first course in logic'},description:{zh:'先学会找出前提和结论，再用简单反例检查推理。',en:'Begin with premises and conclusions, then use counterexamples to test inferences.'},ids:['what-is-logic','arguments','validity','soundness','conditionals','affirming-consequent','denying-antecedent','straw-man']},
{id:'everyday',title:{zh:'辨别日常论证',en:'Evaluating everyday arguments'},description:{zh:'练习区分证据、解释、情绪和未经支持的跳跃。',en:'Practice distinguishing evidence, explanation, emotion, and unsupported steps.'},ids:['argument-mapping','charity','ad-hominem','appeal-to-authority','appeal-to-ignorance','slippery-slope','hasty-generalization','causal-inference']},
{id:'formal',title:{zh:'形式化与证明',en:'Formalization and proof'},description:{zh:'从真值表进入量词、模型与元逻辑。',en:'Move from truth tables to quantifiers, models, and metalogic.'},ids:['truth-tables','natural-deduction','quantifiers','quantifier-scope','identity','models','metalogic','incompleteness']}];
