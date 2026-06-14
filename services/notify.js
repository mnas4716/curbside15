/**
 * Notify Service — sends an SMS and (optionally) places a voice call.
 *
 *   NOTIFY_PROVIDER=mock       → logs only (default, safe for dev)
 *   NOTIFY_PROVIDER=clicksend  → real SMS + text-to-speech voice via ClickSend
 *
 * ClickSend was chosen as a non-Twilio / non-Vonage option: Australian, one
 * simple REST API for BOTH SMS and voice (text-to-speech) calls, pay-as-you-go.
 * Drop-in alternatives with the same two channels: Telnyx, Plivo.
 *
 * Auth: ClickSend uses HTTP Basic auth with your username + API key.
 *   CLICKSEND_USERNAME, CLICKSEND_API_KEY   (from dashboard.clicksend.com)
 *   CLICKSEND_FROM (optional sender id/number)
 */
require('dotenv').config();

const provider = (process.env.NOTIFY_PROVIDER || 'mock').toLowerCase();

const mock = {
  async sms(to, body) {
    console.log(`[NOTIFY:MOCK] SMS → ${to}: ${body.slice(0, 90)}…`);
    return { ok: true, channel: 'sms', provider: 'mock' };
  },
  async voice(to, message) {
    console.log(`[NOTIFY:MOCK] CALL → ${to} (text-to-speech): ${message.slice(0, 60)}…`);
    return { ok: true, channel: 'voice', provider: 'mock' };
  }
};

const clicksend = {
  _auth() {
    const u = process.env.CLICKSEND_USERNAME || '';
    const k = process.env.CLICKSEND_API_KEY || '';
    return 'Basic ' + Buffer.from(`${u}:${k}`).toString('base64');
  },
  async _post(path, payload) {
    const res = await fetch(`https://rest.clicksend.com/v3${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': this._auth() },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.response_msg || `ClickSend ${path} failed (${res.status})`);
    return data;
  },
  async sms(to, body) {
    await this._post('/sms/send', {
      messages: [{ source: 'curbside', from: process.env.CLICKSEND_FROM || undefined, to, body }]
    });
    return { ok: true, channel: 'sms', provider: 'clicksend' };
  },
  async voice(to, message) {
    // ClickSend voice = text-to-speech call
    await this._post('/voice/send', {
      messages: [{ source: 'curbside', to, body: message, voice: 'female', lang: 'en-au', machine_detection: 1 }]
    });
    return { ok: true, channel: 'voice', provider: 'clicksend' };
  }
};

const impl = provider === 'clicksend' ? clicksend : mock;

// Notify a specialist about a new consult: SMS + concurrent voice call.
async function notifySpecialist({ phone, specialistName, gpName, specialty, patient, acceptUrl, withCall = true }) {
  if (!phone) return { ok: false, reason: 'no phone' };
  const sms = `Curbside: new ${specialty} consult from Dr ${gpName} (patient ${patient}). Tap to accept: ${acceptUrl}`;
  const call = `Hello Dr ${specialistName}. You have a new ${specialty} consult request on Curbside from Doctor ${gpName}. Please open the Curbside app to accept.`;
  const out = { sms: null, voice: null };
  try { out.sms = await impl.sms(phone, sms); } catch (e) { out.sms = { ok: false, error: e.message }; }
  if (withCall) {
    try { out.voice = await impl.voice(phone, call); } catch (e) { out.voice = { ok: false, error: e.message }; }
  }
  return { ok: true, ...out };
}

module.exports = { notifySpecialist, providerName: provider, _impl: impl };
