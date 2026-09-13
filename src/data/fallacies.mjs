import {entry as E,bi} from './model.mjs';
export const fallacies=[
E('affirming-consequent','肯定后件','Affirming the consequent','formal',
'从“若 P 则 Q”和 Q 推出 P。Q 也可能由别的条件产生，因此这个形式不保证结论。|Inferring P from “if P then Q” and Q. Other conditions can produce Q, so this form does not guarantee its conclusion.',
'P → Q；Q；所以 P。反例赋值：P 假，Q 真。|P → Q; Q; therefore P. Countervaluation: P false, Q true.',
['下雨会让地面湿。地面湿了，所以一定下过雨。|Rain makes the ground wet. The ground is wet, so it must have rained.|洒水也能使地面湿。两条前提可真而结论为假。|A sprinkler can wet the ground. Both premises can be true while the conclusion is false.',
'有管理员权限就能查看日志。他能查看日志，所以他一定是管理员。|Administrators can view the logs. He can view them, so he must be an administrator.|只读审计账号也可能具有查看权限。|A read-only audit account might also have viewing permission.'],
'系统规定只有管理员能查看日志。他能查看，所以他是管理员。|The system allows only administrators to view logs. He can view them, so he is an administrator.|“只有”给出了反方向的必要条件，论证结构已经改变。|“Only” supplies the necessary condition in the other direction, changing the argument.',
'检查 Q 是否还有其他来源；若提出最佳解释，要比较替代解释，不能声称演绎必然。|Check for alternative sources of Q. An inference to the best explanation must compare alternatives rather than claim deductive necessity.',['forallx','iep']),
E('denying-antecedent','否定前件','Denying the antecedent','formal',
'从“若 P 则 Q”和非 P 推出非 Q，把充分条件误当成必要条件。|Inferring not-Q from “if P then Q” and not-P mistakes a sufficient condition for a necessary one.',
'P → Q；¬P；所以 ¬Q。P 假、Q 真时，前提真而结论假。|P → Q; ¬P; therefore ¬Q. With P false and Q true, the premises are true and the conclusion false.',
['坐地铁就能到学校。今天没坐地铁，所以没到学校。|Taking the subway gets her to campus. She did not take it, so she did not reach campus.|她可能步行到校。|She might have walked.',
'完成额外作业可获加分。他没做，所以不可能获得任何加分。|Extra assignments earn bonus marks. He did none, so he cannot receive any bonus marks.|规则没有排除课堂活动等其他加分途径。|The rule does not exclude other ways of earning bonus marks.'],
'若刷卡成功，门灯会亮。灯没亮，所以刷卡没有成功。|If a card scan succeeds, the door light comes on. It did not come on, so the scan did not succeed.|这是否定后件；在接受条件前提时，该形式有效。|This is modus tollens, which is valid given the conditional premise.',
'把“足以发生”和“没有它就不会发生”分开，检查是否遗漏其他充分条件。|Separate what is sufficient from what is necessary, and check for other sufficient conditions.',['forallx','iep']),
E('ad-hominem','人身攻击','Ad hominem','relevance',
'用与所讨论论证无关的个人特征，代替对理由的评价。涉及证词可靠性的个人信息则可能相关。|Using irrelevant personal characteristics in place of assessing reasons. Personal information can be relevant when assessing testimony.',
'某人主张 P；他有某个无关特征；所以 P 错。|Someone argues for P; they have an irrelevant trait; therefore P is false.',
['他穿得邋遢，所以这道题的证明一定有错。|He dresses untidily, so his proof must be wrong.|穿着不决定证明步骤是否有效。|Clothing does not determine whether the proof steps are valid.',
'她表达时很紧张，所以她提出的预算数字不可信。|She sounds nervous, so her budget figures cannot be trusted.|需要核对账目，紧张本身不足以否定数字。|The accounts need checking; nervousness alone does not refute the figures.'],
'证人当时不在现场，因此需要核实其目击证词。|The witness was not at the scene, so the claimed eyewitness account needs checking.|是否在场直接关系到这类证词的依据；这并未断言其所有说法都假。|Presence is relevant to an eyewitness account. This does not declare everything the witness says false.',
'指出具体前提或推理步骤的问题；若质疑证人，解释个人信息为何影响这一证词。|Identify a faulty premise or inference. When questioning a witness, explain why the information affects this particular testimony.'),
E('straw-man','稻草人','Straw man','relevance',
'把对方的主张换成更弱、更极端或更容易攻击的版本，再声称已经反驳原主张。|Replacing an opponent’s position with a weaker, more extreme, or easier target and treating its defeat as a refutation of the original.',
'对方主张 P；将 P 改写为 Q；反驳 Q 后宣称 P 被推翻。|An opponent claims P; P is replaced with Q; refuting Q is presented as refuting P.',
['她建议减少一次性包装。他回应：“你要禁止所有包装，食物怎么运输？”|She proposes less single-use packaging. He replies, “You want to ban all packaging. How will food travel?”|减少一次性用品不等于禁止所有包装。|Reducing single-use packaging is not a ban on all packaging.',
'学生要求延长一次作业期限，老师反驳说不能取消所有截止日期。|Students request an extension for one assignment; the teacher argues against abolishing every deadline.|一次延期被替换成全面取消期限。|A particular extension has been replaced with eliminating deadlines altogether.'],
'作者明确要求禁止所有包装，评论者指出运输可能因此受阻。|The author explicitly proposes banning all packaging; a critic points out possible transport problems.|批评对应作者实际主张，仍需核对后果证据。|The criticism addresses the actual proposal; evidence about the consequences still needs checking.',
'先引用或忠实概括原论点，保留范围和限定，再说明批评针对哪一部分。|Quote or faithfully reconstruct the position, preserving its scope and qualifications, before identifying the target of criticism.'),
E('appeal-to-authority','不当诉诸权威','Misuse of authority','authority',
'把不相关、缺乏依据或超出专业范围的权威意见当作充分证明。专家证言本身可以构成可撤销的证据。|Treating irrelevant, unsupported, or out-of-field authority as sufficient proof. Expert testimony can itself be defeasible evidence.',
'有名的人说 P；所以 P 已获证明。|A prominent person says P; therefore P is established.',
['一位著名演员说这款电池最安全，因此不需要看测试结果。|A famous actor says this battery is safest, so no test results are needed.|表演领域的声望不能代替电池安全证据。|Fame in acting does not replace battery-safety evidence.',
'教授在节目里猜测某古字读音，观众把这当成已经解决的学术结论。|A professor guesses an ancient pronunciation on a show; viewers treat it as a settled scholarly conclusion.|职称没有把猜测变成定论，还应核对领域、依据和分歧。|A title does not turn a guess into a settled result; field, evidence, and disagreement matter.'],
'维修工程师检查线路并出示测量结果，建议更换损坏的接头。|An engineer inspects a circuit, provides measurements, and recommends replacing a damaged connector.|相关专长和可核查依据支持这个有限建议；结论仍可复核。|Relevant expertise and checkable evidence support this limited recommendation, which remains open to review.',
'核对专业相关性、原话、依据和其他合格专家的意见，保留结论的不确定性。|Check relevant expertise, exact wording, supporting evidence, and other qualified assessments; preserve uncertainty.'),
E('slippery-slope','不当滑坡','Unwarranted slippery slope','causal',
'在缺乏足够支持时断言一个小步骤会沿连续链条走向极端后果。风险链条需要逐环证据。|Claiming without enough support that a small step will lead through a chain to an extreme outcome. Each link needs evidence.',
'A 会导致 B，B 会导致 C，所以接受 A 就免不了 Z。|A leads to B, B to C, so accepting A supposedly makes Z unavoidable.',
['允许这次晚交一天，以后大家都会无限期拖延，课程就完了。|One extra day for this assignment will make everyone delay indefinitely and ruin the course.|中间步骤忽略了次数限制和既有规则。|The intermediate steps ignore limits on extensions and existing rules.',
'图书馆增加休闲座椅，最后必然变成吵闹的游乐场。|Adding lounge seats will inevitably turn the library into a noisy playground.|座椅与极端结果之间的机制尚未说明。|No mechanism connecting the seats to that extreme outcome has been supplied.'],
'工程分析列出接头松动、升温和绝缘损坏的测量依据，并讨论保险装置。|An engineering analysis documents loosening, heating, and insulation damage, and considers protective devices.|有机制、证据和阻断条件的风险推演可以合理。|A risk analysis with mechanisms, evidence, and interrupting conditions can be reasonable.',
'逐环询问机制、概率和阻断措施；区分“可能增加风险”与“必然导致”。|Ask about each mechanism, probability, and safeguard; distinguish increased risk from inevitability.'),
E('appeal-to-ignorance','诉诸无知','Appeal to ignorance','presumption',
'把没有证明 P 假当成 P 真，或把没有证明 P 真当成 P 假。缺失证据的意义取决于能否合理预期发现证据。|Treating failure to prove P false as proof of P, or the reverse. Missing evidence matters only against a justified expectation of finding it.',
'尚未反驳 P；所以 P 为真。|P has not been disproved; therefore P is true.',
['没人证明湖里没有未知巨兽，所以它一定存在。|Nobody has proved that there is no unknown giant in the lake, so it must exist.|举证空白并没有给出存在证据。|A gap in disproof supplies no positive evidence of existence.',
'没有研究证明这种学习法有效，因此它肯定完全无效。|No study has proved this study method effective, so it is certainly useless.|尚未研究和已有反证并不相同。|Not having been studied differs from having been refuted.'],
'按可靠清单逐项清点后没有缺件，暂时接受“这批货齐全”。|A reliable item-by-item inventory finds nothing missing; provisionally accept that this shipment is complete.|如果缺件通常会被发现，未发现就有一定证据价值。|If missing items would usually be detected, their absence from the findings carries evidential weight.',
'说明搜索范围、检测能力以及命题为真时应出现什么证据。|Specify the search scope, detection ability, and evidence expected if the claim were true.'),
E('hasty-generalization','草率概括','Hasty generalization','induction',
'凭过少或不具代表性的观察，对更广的人群或情境作出过强概括。|Drawing an overly broad conclusion from too few or unrepresentative observations.',
'观察到少量 A 是 B；所以所有或几乎所有 A 都是 B。|A few observed As are B; therefore all or nearly all As are B.',
['两次快递都迟到，所以这家公司每次都迟到。|Two deliveries were late, so this company is late every time.|两次经历不足以支持全称判断。|Two experiences cannot support a universal claim.',
'采访了三位社团成员，就宣布全校学生支持该政策。|Three club members were interviewed, and the result was reported as school-wide support.|样本小且来源单一。|The sample is small and drawn from one group.'],
'调查报告只说“受访的三位成员都支持”，并明确不能推广到全校。|The report says only that all three interviewed members support the policy, and declines to generalize to the school.|结论没有超过观察范围。|The conclusion stays within the observations.',
'限定结论范围，检查抽样方法、样本量和异质性，报告不确定性。|Limit the claim, examine sampling, sample size, and heterogeneity, and report uncertainty.')
];
import {formal} from './fallacies-formal.mjs';
fallacies.push(...formal);
import {relevance} from './fallacies-relevance.mjs';
fallacies.push(...relevance);
import {authority} from './fallacies-authority.mjs';
fallacies.push(...authority);
import {presumption} from './fallacies-presumption.mjs';
fallacies.push(...presumption);
import {language} from './fallacies-language.mjs';
import {induction} from './fallacies-induction.mjs';
fallacies.push(...language,...induction);
import {causal} from './fallacies-causal.mjs';
fallacies.push(...causal);
import {statistics} from './fallacies-statistics.mjs';
fallacies.push(...statistics);
import {dialogue} from './fallacies-dialogue.mjs';
fallacies.push(...dialogue);
for(const e of fallacies){if(['gish-gallop','motte-and-bailey','moving-goalposts','double-standard','appeal-to-repetition'].includes(e.id))e.kind='dialogue';if(e.id==='naturalistic-fallacy')e.kind='philosophical';}
const pairs=[['affirming-consequent','denying-antecedent'],['ad-hominem','circumstantial-ad-hominem','tu-quoque','poisoning-the-well'],['straw-man','red-herring','motte-and-bailey'],['appeal-to-authority','appeal-to-popularity','appeal-to-wealth'],['appeal-to-ignorance','burden-shifting'],['hasty-generalization','biased-sample','survivorship-bias','nonresponse-bias','voluntary-response'],['correlation-causation','post-hoc','common-cause','reverse-causation'],['base-rate-neglect','inverse-probability','p-value-misinterpretation'],['composition','division','ecological-fallacy','atomistic-fallacy'],['appeal-to-nature','is-ought','naturalistic-fallacy','moralistic-fallacy'],['begging-question','self-sealing','fallacy-fallacy']];
for(const group of pairs)for(const id of group){const e=fallacies.find(e=>e.id===id);if(e)e.related=group.filter(x=>x!==id);}
const aliases={'ad-hominem':['人身攻擊','argumentum ad hominem'],'straw-man':['稻草人谬误','稻草人謬誤','strawman'],'appeal-to-authority':['诉诸权威','訴諸權威','appeal to authority','ad verecundiam'],'slippery-slope':['滑坡谬误','滑坡謬誤','slippery slope'],'hasty-generalization':['以偏概全'],'begging-question':['乞题','乞題','循环论证','circular reasoning','petitio principii'],'tu-quoque':['你也一样谬误','appeal to hypocrisy'],'post-hoc':['先后即因果','post hoc ergo propter hoc'],'equivocation':['歧义谬误','偷換概念'],'fallacy-fallacy':['argument from fallacy'],'no-true-scotsman':['没有真正的苏格兰人'],'motte-and-bailey':['城堡与村庄']};
for(const e of fallacies)e.aliases=aliases[e.id]||[];

fallacies.push(E('appeal-to-probability','把可能当成必然','Possibility treated as certainty','statistics','仅由事件有非零概率，推出它必定发生。|Inferring that an event must occur merely because its probability is nonzero.','可能发生 A；所以 A 必然发生。|A is possible; therefore A is certain.',['每个订单都有小概率延误，所以这个订单一定延误。|Every order has some chance of delay, so this order must be delayed.|可能性没有达到必然性的强度。|Possibility does not establish certainty.','独立放回抽签每次有 10% 的中奖概率，所以抽十次保证中奖。|Independent draws with replacement each give a 10% chance of winning, so ten draws guarantee a win.|十次均未中奖的概率仍为 0.9¹⁰，约 34.9%。|The probability of losing all ten remains 0.9¹⁰, about 34.9%.'],'这次可能延误，因此为延误准备备用方案。|A delay is possible, so a contingency is prepared.|防范可能风险不必把风险当成必然。|Preparing for a risk need not treat it as certain.','区分可能、很可能与必然，说明概率模型和决策标准。|Distinguish possible, probable, and certain, and specify the model and decision criterion.',['hku','seeing-conditional']));
for(const e of fallacies){if(['survivorship-bias','nonresponse-bias','voluntary-response','biased-sample'].includes(e.id))e.kind='bias';if(e.id==='false-premise')e.kind='premise';if(['p-value-misinterpretation','confidence-interval-error','multiple-testing'].includes(e.id))e.refs.push('asa');}
fallacies.find(e=>e.id==='appeal-to-authority').extraPractice=[{id:'expert-context',text:bi('“她说这份报告可信，因为作者是一位专家。”除此之外没有背景。','“She says the report is credible because its author is an expert.” No further context is given.'),analysis:bi('信息不足。若专业领域匹配且证据可核查，可以是合理证言；若领域无关或仅以身份代替证据，就存在问题。','More context is needed. Relevant expertise and checkable evidence can support testimony; unrelated credentials or status replacing evidence can make the appeal defective.'),answer:'context'}];

fallacies.find(e=>e.id==='naturalistic-fallacy').refs.push('moore');
fallacies.find(e=>e.id==='hasty-generalization').aliases.push('converse accident','逆偶然');

fallacies.find(e=>e.id==='fallacy-fallacy').extraPractice=[{
 id:'withholding-or-denial',
 text:bi('“这篇报道的推理有错误，所以我不接受它的结论。”这里的“不接受”没有进一步解释。请选择一种可以辩护的判断，并说明理由。','“This report contains faulty reasoning, so I do not accept its conclusion.” The speaker does not explain “do not accept.” Choose a defensible judgment and give your reason.'),
 analysis:bi('“不接受”可能指暂缓判断，也可能指认定结论为假。前者可以合理，后者若仅以论证有误为依据，就犯了本词条的错误。澄清说话者的意思后再作确定判断。','“Do not accept” may mean withholding judgment or declaring the conclusion false. Withholding can be reasonable; declaring it false solely because the argument is faulty commits this error. Clarify the intended meaning before making a definite diagnosis.'),
 acceptedAnswerIds:['clear','context'],
 feedback:{
 clear:bi('只有把“不接受”理解为暂缓判断，这个选择才成立：说话者没有从论证错误推出结论为假。若他其实在断言结论为假，就需要改判。','This answer works only if “do not accept” means withholding judgment: the speaker has not inferred falsity from faulty reasoning. If the speaker means the conclusion is false, revise the diagnosis.'),
 context:bi('需要澄清“不接受”的含义。暂缓判断不等于判定为假；目前的措辞容许这两种解释，因此不足以确定存在该错误。','Clarify what “do not accept” means. Withholding judgment differs from declaring a claim false. The wording permits both readings, so it does not establish that this error occurs.')
 }
}];
import {exercisesFor} from './exercises.mjs';
import {coreFallacyExpansion} from './expanded/fallacies-core.mjs';
import {inferenceFallacyExpansion} from './expanded/fallacies-inference.mjs';
import {formalFallacyExpansion} from './expanded/fallacies-formal.mjs';
import {quantifiedFallacyExpansion} from './expanded/fallacies-quantified.mjs';
import {relevanceFallacyExpansion} from './expanded/fallacies-relevance.mjs';
import {responseFallacyExpansion} from './expanded/fallacies-responses.mjs';
import {statusFallacyExpansion} from './expanded/fallacies-status.mjs';
import {emotionFallacyExpansion} from './expanded/fallacies-emotion.mjs';
import {presuppositionFallacyExpansion} from './expanded/fallacies-presupposition.mjs';
import {exceptionFallacyExpansion} from './expanded/fallacies-exceptions.mjs';
import {factFallacyExpansion} from './expanded/fallacies-facts.mjs';
import {valueFallacyExpansion} from './expanded/fallacies-values.mjs';
import {languageFallacyExpansion} from './expanded/fallacies-language.mjs';
import {samplingFallacyExpansion} from './expanded/fallacies-sampling.mjs';
import {generalizingFallacyExpansion} from './expanded/fallacies-generalizing.mjs';
import {causationFallacyExpansion} from './expanded/fallacies-causation.mjs';
import {probabilityFallacyExpansion} from './expanded/fallacies-probability.mjs';
import {measurementFallacyExpansion} from './expanded/fallacies-measurement.mjs';
import {levelFallacyExpansion} from './expanded/fallacies-levels.mjs';
import {statisticalInferenceFallacyExpansion} from './expanded/fallacies-inference-stats.mjs';
import {discussionFallacyExpansion} from './expanded/fallacies-discussion.mjs';
const fallacyExpansion={...discussionFallacyExpansion,...measurementFallacyExpansion,...levelFallacyExpansion,...statisticalInferenceFallacyExpansion,...probabilityFallacyExpansion,...causationFallacyExpansion,...samplingFallacyExpansion,...generalizingFallacyExpansion,...languageFallacyExpansion,...coreFallacyExpansion,...inferenceFallacyExpansion,...formalFallacyExpansion,...quantifiedFallacyExpansion,...relevanceFallacyExpansion,...responseFallacyExpansion,...statusFallacyExpansion,...emotionFallacyExpansion,...presuppositionFallacyExpansion,...exceptionFallacyExpansion,...factFallacyExpansion,...valueFallacyExpansion};
for(const entry of fallacies){const more=fallacyExpansion[entry.id];if(more)Object.assign(entry,more);for(const s of entry.sections||[])for(const r of s.readings||[])if(!entry.refs.includes(r.sourceId))entry.refs.push(r.sourceId);entry.exercises=exercisesFor(entry);}
