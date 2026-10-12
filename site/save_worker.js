// Cloudflare Worker for the online eye-tracking study. KV namespace bound as DATA; secret READ_KEY.
//   GET  /row                    -> next Latin-square row (0..7), from a running counter
//   POST /save                   -> stores one participant record   (key prefix p_)
//   POST /contact                -> stores interview contact details separately (key prefix c_)
//   GET  /count?key=READ_KEY     -> number of participant records
//   GET  /all?key=READ_KEY       -> all participant records as one JSON file (no contact details)
//   GET  /contacts?key=READ_KEY  -> contact details only (keep this file separate and encrypted)
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};
const json = (o, extra = {}) => new Response(JSON.stringify(o), { headers: { ...CORS, 'content-type': 'application/json', ...extra } });
const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

async function listAll(env, prefix) {
  const keys = []; let cursor;
  do { const r = await env.DATA.list({ prefix, cursor }); keys.push(...r.keys.map(k => k.name)); cursor = r.list_complete ? null : r.cursor; } while (cursor);
  return keys;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url), path = url.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (req.method === 'GET' && path === '/row') {
      const n = parseInt((await env.DATA.get('meta_counter')) || '0', 10);
      await env.DATA.put('meta_counter', String(n + 1));
      return json({ row: n % 8, n });
    }

    if (req.method === 'POST' && (path === '/save' || path === '/contact')) {
      const body = await req.text();
      if (body.length > 20_000_000) return new Response('too large', { status: 413, headers: CORS });
      try { JSON.parse(body); } catch { return new Response('bad json', { status: 400, headers: CORS }); }
      const id = `${path === '/save' ? 'p' : 'c'}_${stamp()}_${crypto.randomUUID().slice(0, 8)}`;
      await env.DATA.put(id, body);
      return json({ ok: true, id });
    }

    if (req.method === 'GET' && ['/all', '/count', '/contacts'].includes(path)) {
      if (!env.READ_KEY || url.searchParams.get('key') !== env.READ_KEY) return new Response('forbidden', { status: 403 });
      const keys = await listAll(env, path === '/contacts' ? 'c_' : 'p_');
      if (path === '/count') return new Response(String(keys.length));
      const out = [];
      for (const k of keys) out.push({ id: k, data: JSON.parse(await env.DATA.get(k)) });
      const name = path === '/contacts' ? 'kpop_contacts.json' : 'kpop_eyetracking_all.json';
      return json(out, { 'content-disposition': `attachment; filename="${name}"` });
    }
    return new Response('ok', { headers: CORS });
  },
};
