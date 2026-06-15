/**
 * AI Service — mock or Claude API
 * 
 * Set AI_PROVIDER=claude + ANTHROPIC_API_KEY to activate real AI.
 * Mock returns realistic canned responses for development.
 */
require('dotenv').config();

const provider = process.env.AI_PROVIDER || 'mock';

// ── Mock AI responses (transcript-aware) ──
function extractDialogue(transcript) {
  if (!transcript || !transcript.trim()) return [];
  return transcript.split('\n').filter(l => l.trim());
}

const mockAI = {
  async structureCase(caseSummary, specialty) {
    console.log(`[AI:MOCK] Structuring case for ${specialty}`);
    return {
      presenting: `${caseSummary.slice(0, 140)}`,
      temporal: `Onset and progression as described in the GP's summary.`,
      relevant_history: 'See GP case summary for full history, medications and allergies.',
      differential: [
        `Most likely ${specialty.toLowerCase()} differential based on presentation`,
        'Alternative diagnosis to exclude',
        'Less likely consideration'
      ],
      missing_information: [
        'Duration, severity and progression details',
        'Response to any treatments already tried'
      ],
      suggested_questions: [
        'What treatments have already been tried and with what effect?',
        'Any relevant family or medication history?'
      ],
      red_flags: 'None explicitly identified — specialist to assess during consult.',
      recommended_next_steps: [
        'Real-time specialist video review',
        'Targeted investigations as indicated',
        'Safety-net follow-up'
      ]
    };
  },

  async generateSOAP(transcript, caseSummary, consultDetails) {
    console.log('[AI:MOCK] Generating SOAP note from transcript');
    const lines = extractDialogue(transcript);
    const convo = lines.join(' ');
    const hasTranscript = lines.length > 0;

    return {
      subjective: hasTranscript
        ? `${consultDetails.patient_initials} (${consultDetails.patient_age}${consultDetails.patient_sex}). Referral: ${caseSummary.slice(0, 120)}. Discussion captured: ${convo.slice(0, 300)}`
        : `${consultDetails.patient_initials} presented with: ${caseSummary.slice(0, 200)}`,
      objective: hasTranscript
        ? `Findings discussed during ${consultDetails.specialty} video consultation between ${consultDetails.gp_name} and ${consultDetails.specialist_name}.`
        : 'Clinical findings discussed during video consultation.',
      assessment: hasTranscript
        ? `Working impression reached during specialist discussion (see transcript). Specialty: ${consultDetails.specialty}.`
        : `Working diagnosis pending — limited transcript available.`,
      plan: hasTranscript
        ? derivePlanFromTranscript(lines)
        : ['1. Continue current management', '2. Investigations as discussed', '3. Follow-up 2-4 weeks', '4. Safety netting advice given'],
      follow_up: 'Review in 2-4 weeks or sooner if symptoms worsen.',
      safety_netting: 'Re-present urgently or attend the nearest Emergency Department if symptoms worsen rapidly, new severe symptoms develop, or the patient feels seriously unwell.',
      red_flags_identified: null,
      mbs_item_recommendation: 'PES pathway (GP item 2484-2495) applicable if GP in room with patient; specialist bills 91822/91823.'
    };
  },

  async generateLetter(soapNote, consultDetails) {
    console.log('[AI:MOCK] Generating specialist letter');
    const date = new Date().toLocaleDateString('en-AU');
    return {
      content:
        `Dear Dr ${consultDetails.gp_name},\n\n` +
        `Thank you for consulting me regarding ${consultDetails.patient_initials} ` +
        `(${consultDetails.patient_age}${consultDetails.patient_sex}) via Curbside on ${date}.\n\n` +
        `IMPRESSION\n${soapNote.assessment}\n\n` +
        `RECOMMENDATIONS\n${(soapNote.plan || []).join('\n')}\n\n` +
        `FOLLOW-UP\n${soapNote.follow_up}\n\n` +
        `Please contact me if I can be of further assistance.\n\n` +
        `Kind regards,\n${consultDetails.specialist_name}\n${consultDetails.specialist_qualifications || ''}`
    };
  },

  async generateReferral(soapNote, consultDetails) {
    console.log('[AI:MOCK] Generating referral letter');
    const date = new Date().toLocaleDateString('en-AU');
    return {
      content:
        `Date: ${date}\n\n` +
        `RE: Referral — ${consultDetails.patient_initials} (${consultDetails.patient_age}${consultDetails.patient_sex})\n\n` +
        `Dear ${consultDetails.specialist_name},\n\n` +
        `Following our Curbside consultation, I am referring this patient for formal ${consultDetails.specialty} review.\n\n` +
        `REASON FOR REFERRAL\n${soapNote.assessment}\n\n` +
        `MANAGEMENT TO DATE\n${(soapNote.plan || []).join('\n')}\n\n` +
        `This referral is valid for 12 months from the date above.\n\n` +
        `Kind regards,\nDr ${consultDetails.gp_name}`
    };
  },

  async generatePatientHandout(soapNote, consultDetails) {
    console.log('[AI:MOCK] Generating patient handout');
    return {
      content:
        `WHAT WE DISCUSSED TODAY\n\n` +
        `Your GP spoke with a ${consultDetails.specialty} specialist about your health.\n\n` +
        `WHAT THE SPECIALIST THINKS\n${soapNote.assessment}\n\n` +
        `WHAT HAPPENS NEXT\n${(soapNote.plan || []).join('\n')}\n\n` +
        `WHEN TO GET URGENT HELP\nGo to your nearest Emergency Department or call 000 ` +
        `if your symptoms suddenly worsen or you feel seriously unwell.\n\n` +
        `Questions? Contact your GP practice.`
    };
  }
};

// Helper: pull plan-like statements out of the transcript
function derivePlanFromTranscript(lines) {
  const planKeywords = /(start|cease|stop|prescribe|arrange|refer|review|order|commence|titrate|continue|book|follow)/i;
  const planLines = lines
    .map(l => l.replace(/^[^:]+:\s*/, '')) // strip speaker label
    .filter(t => planKeywords.test(t))
    .slice(0, 6);
  if (planLines.length === 0) {
    return ['1. Management as discussed during consult', '2. Follow-up as advised', '3. Safety netting provided'];
  }
  return planLines.map((t, i) => `${i + 1}. ${t}`);
}

// ── Claude API provider ──
const claudeAI = {
  async _call(systemPrompt, userPrompt) {
    let res, data;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 3000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });
    } catch (e) {
      throw new Error(`Anthropic request failed: ${e.message}`);
    }

    data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Anthropic API ${res.status}: ${data?.error?.message || 'request rejected'}`);
    }

    const text = data.content?.[0]?.text || '';
    if (!text.trim()) throw new Error('Anthropic returned empty content');

    // Try to parse as JSON, fall back to raw text (valid for letter/referral/handout)
    try {
      return JSON.parse(text.replace(/```json\n?|```/g, '').trim());
    } catch {
      return { content: text };
    }
  },

  async structureCase(caseSummary, specialty) {
    console.log(`[AI:CLAUDE] Structuring case for ${specialty}`);
    return this._call(
      `You are a senior clinical triage registrar preparing a concise, rigorous pre-consultation summary for an Australian ${specialty} specialist. Use precise medical terminology, accepted abbreviations, and Australian conventions (TGA-approved drug names, SI units, PBS context where relevant). Ground every statement in the GP's case summary — do NOT invent history, examination findings, or results that were not provided; where information is absent, list it under missing_information rather than fabricating it. Return JSON only, no prose outside the JSON.`,
      `Structure the following GP case summary for a ${specialty} specialist review.\n\nGP CASE SUMMARY:\n"""${caseSummary}"""\n\nReturn exactly this JSON shape:\n{\n  "presenting": "Precise 1-2 sentence problem statement using clinical terminology (age, sex, primary problem, duration).",\n  "temporal": "Onset, progression and any temporal or causal associations (e.g. medication latency).",\n  "relevant_history": "Pertinent PMHx, current medications with doses, allergies, relevant social/family history as stated.",\n  "differential": ["Most likely diagnosis with brief rationale", "Important alternative to exclude", "Less likely consideration"],\n  "missing_information": ["Specific data the specialist will need that was not provided", "..."],\n  "suggested_questions": ["Targeted question the specialist should ask or examination to direct", "..."],\n  "red_flags": "Any features mandating urgent escalation, or 'None identified from the information provided'.",\n  "recommended_next_steps": ["Concrete next step", "Investigation or management option", "..."]\n}`
    );
  },

  async generateSOAP(transcript, caseSummary, consultDetails) {
    console.log('[AI:CLAUDE] Generating SOAP note');
    return this._call(
      `You are an experienced medical scribe producing a formal SOAP note from a real-time GP\u2013specialist (${consultDetails.specialty}) video consultation in Australia. Write in precise, professional clinical language suitable for the medical record: correct terminology, standard abbreviations, TGA drug names with doses/routes/frequencies, SI units. The note MUST be derived from what was actually said in the transcript and the referral summary \u2014 do not introduce findings, medications, or decisions that were not discussed. If something was not addressed, omit it rather than inventing it. Be specific: capture the specialist's reasoning, the agreed management, dose changes, investigations ordered, and explicit safety-netting. Return JSON only.`,
      `Produce a SOAP note for this consultation.\n\nPatient: ${consultDetails.patient_initials}, ${consultDetails.patient_age||''}${consultDetails.patient_sex||''}\nReferring GP: ${consultDetails.gp_name}\nSpecialist: ${consultDetails.specialist_name} (${consultDetails.specialist_qualifications||''})\nSpecialty: ${consultDetails.specialty}\n\nORIGINAL GP CASE SUMMARY:\n"""${caseSummary}"""\n\nVERBATIM CONSULTATION TRANSCRIPT:\n"""${transcript}"""\n\nReturn exactly this JSON:\n{\n  "subjective": "Patient's history and the clinical problem as presented and elaborated during the consult, in clinical prose.",\n  "objective": "Examination findings, observations, vitals, imaging/pathology actually discussed. State 'Not formally examined during video consultation' if none.",\n  "assessment": "The specialist's clinical impression and reasoning, including most likely diagnosis and relevant differentials considered.",\n  "plan": ["Numbered, specific actions: medication changes with exact drug/dose/route/frequency, investigations, referrals, monitoring", "..."],\n  "follow_up": "Explicit review interval and arrangements.",\n  "safety_netting": "Specific advice on what should prompt urgent re-presentation (symptoms, timeframe, where to go).",\n  "red_flags_identified": "Any red flags raised, or null.",\n  "mbs_item_recommendation": "Likely MBS billing pathway (PES item by duration + the specialist video item)."\n}`
    );
  },

  async generateLetter(soapNote, consultDetails) {
    console.log('[AI:CLAUDE] Generating specialist letter');
    return this._call(
      `You are writing a formal specialist opinion letter from the consultant back to the referring GP following an Australian Curbside video consultation. Use the conventional structure and register of a specialist letter: addressed to the GP, a clear clinical summary, impression, specific recommendations, and follow-up. Professional, concise, no padding. Base it strictly on the SOAP note content. Return JSON only.`,
      `Write the specialist opinion letter.\n\nSpecialist: ${consultDetails.specialist_name}, ${consultDetails.specialist_qualifications||''}\nReferring GP: Dr ${consultDetails.gp_name}\nPatient: ${consultDetails.patient_initials}, ${consultDetails.patient_age||''}${consultDetails.patient_sex||''}\nDate: ${new Date().toLocaleDateString('en-AU')}\n\nSOAP NOTE (source of truth):\n${JSON.stringify(soapNote)}\n\nStructure the letter as: salutation ("Dear Dr ${consultDetails.gp_name},"); opening line thanking for the Curbside consultation and naming the patient; "Clinical summary"; "Impression"; "Recommendations" (as clear points); "Follow-up"; closing and sign-off with name and qualifications. Return JSON: { "content": "full letter text with line breaks" }`
    );
  },

  async generateReferral(soapNote, consultDetails) {
    console.log('[AI:CLAUDE] Generating referral letter');
    return this._call(
      `You are drafting a formal GP-to-specialist referral letter (Australian format) that formalises a follow-up arising from a Curbside consultation. Include the standard components a specialist's rooms require. Base it strictly on the SOAP note. Return JSON only.`,
      `Write the referral letter.\n\nFrom: Dr ${consultDetails.gp_name} (referring GP)\nTo: ${consultDetails.specialist_name}, ${consultDetails.specialist_qualifications||''}\nPatient: ${consultDetails.patient_initials}, ${consultDetails.patient_age||''}${consultDetails.patient_sex||''}\nDate: ${new Date().toLocaleDateString('en-AU')}\n\nSOAP NOTE (source of truth):\n${JSON.stringify(soapNote)}\n\nStructure: date; "Dear ${consultDetails.specialist_name},"; reason for referral; relevant history and current medications; examination/investigations to date; specific clinical question(s) for the specialist; statement that the referral is valid 12 months; sign-off. Return JSON: { "content": "full referral letter text with line breaks" }`
    );
  },

  async generatePatientHandout(soapNote, consultDetails) {
    console.log('[AI:CLAUDE] Generating patient handout');
    return this._call(
      `Write a plain-language patient handout (Australian English, ~Year 8 reading level). Warm, clear, reassuring, no medical jargon (translate any clinical terms). Accurately reflect the SOAP note without adding new advice. Return JSON only.`,
      `Write the patient handout based on this SOAP note:\n${JSON.stringify(soapNote)}\n\nUse these clear sections: "What we talked about today"; "What the specialist thinks is going on"; "What we're going to do" (medicines in plain words, any tests, next steps); "When to come back"; "When to get urgent help (go to your nearest Emergency Department or call 000)". Return JSON: { "content": "full handout text with line breaks" }`
    );
  }
};

// ── Export active provider ──
// When using Claude, every method falls back to the transcript-aware mock if the
// API fails or returns an unusable shape — so documents ALWAYS generate (never blank).
function withFallback(claudeFn, mockFn, isValid) {
  return async (...args) => {
    if (provider !== 'claude') return mockFn(...args);
    try {
      const out = await claudeFn(...args);
      if (!isValid(out)) throw new Error('Claude returned an unusable shape');
      return out;
    } catch (e) {
      console.error(`[AI:CLAUDE] ${claudeFn.name || 'call'} failed — using mock fallback:`, e.message);
      return mockFn(...args);
    }
  };
}
const hasContent = o => o && typeof o.content === 'string' && o.content.trim().length > 0;

const ai = {
  structureCase: withFallback(
    claudeAI.structureCase.bind(claudeAI), mockAI.structureCase.bind(mockAI),
    o => o && o.presenting),
  generateSOAP: withFallback(
    claudeAI.generateSOAP.bind(claudeAI), mockAI.generateSOAP.bind(mockAI),
    o => o && o.subjective && o.assessment),
  generateLetter: withFallback(
    claudeAI.generateLetter.bind(claudeAI), mockAI.generateLetter.bind(mockAI), hasContent),
  generateReferral: withFallback(
    claudeAI.generateReferral.bind(claudeAI), mockAI.generateReferral.bind(mockAI), hasContent),
  generatePatientHandout: withFallback(
    claudeAI.generatePatientHandout.bind(claudeAI), mockAI.generatePatientHandout.bind(mockAI), hasContent),
};

module.exports = {
  structureCase: (c, s) => ai.structureCase(c, s),
  generateSOAP: (t, c, d) => ai.generateSOAP(t, c, d),
  generateLetter: (s, d) => ai.generateLetter(s, d),
  generateReferral: (s, d) => ai.generateReferral(s, d),
  generatePatientHandout: (s, d) => ai.generatePatientHandout(s, d)
};
