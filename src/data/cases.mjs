import {publicCases} from './cases-public.mjs';
import {scienceCases} from './cases-science.mjs';
import {reasoningCases} from './cases-reasoning.mjs';

export const cases=[...publicCases,...scienceCases,...reasoningCases];

cases.find(e=>e.id==='case-asa').refs=['asa'];
cases.find(e=>e.id==='case-judges').refs.push('judges-reply');
cases.find(e=>e.id==='case-ioannidis').refs.push('ioannidis-critique');

cases.find(e=>e.id==='case-mars').dateRole={zh:'所引网页更新时间',en:'Cited page updated'};
cases.find(e=>e.id==='case-mars').source.locator='About the Mission; Key Facts; page update date';
cases.find(e=>e.id==='case-challenger').source.locator='Appendix F, Solid Fuel Rockets (SRB), printed pp. F1–F2';
cases.find(e=>e.id==='case-columbia').source.locator='Volume I, August 2003, Executive Summary p. 9; Part Two introduction p. 97 (quotation)';
import {publicCaseExpansion} from './expanded/cases-public.mjs';
import {scienceCaseExpansion} from './expanded/cases-science.mjs';
import {reasoningCaseExpansion} from './expanded/cases-reasoning.mjs';
const caseExpansion={...publicCaseExpansion,...scienceCaseExpansion,...reasoningCaseExpansion};
for(const entry of cases){const more=caseExpansion[entry.id];if(!more)continue;const {source,sections,...fields}=more;Object.assign(entry,fields);if(source)Object.assign(entry.source,source);entry.sections=[...entry.sections.slice(0,2),...sections,...entry.sections.slice(2)];for(const section of sections)for(const reading of section.readings||[])if(!entry.refs.includes(reading.sourceId))entry.refs.push(reading.sourceId);}
export const caseSources=cases.map(e=>e.source);
