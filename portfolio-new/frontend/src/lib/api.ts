export type Comment = { id: string; name: string; message: string; website?: string; created_at: string };

const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function headers() {
  if (!base || !key) throw new Error('Guestbook is not configured');
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}

export async function fetchComments(page = 1, limit = 10) {
  const offset = (Math.max(1, page) - 1) * Math.min(50, Math.max(1, limit));
  const response = await fetch(`${base}/rest/v1/comments?select=id,name,message,website,created_at&approved=eq.true&order=created_at.desc&limit=${limit}&offset=${offset}`, { headers: headers(), cache: 'no-store' });
  if (!response.ok) throw Error('Could not load guestbook');
  const comments = await response.json() as Comment[];
  return { comments, has_more: comments.length === limit };
}

export async function submitComment(name: string, message: string) {
  const cleanName = name.replace(/<[^>]*>/g, '').trim();
  const cleanMessage = message.replace(/<[^>]*>/g, '').trim();
  if (cleanName.length < 2 || cleanName.length > 50) throw Error('Name must be 2-50 characters');
  if (cleanMessage.length < 3 || cleanMessage.length > 500) throw Error('Message must be 3-500 characters');
  const response = await fetch(`${base}/rest/v1/comments`, { method: 'POST', headers: { ...headers(), Prefer: 'return=representation' }, body: JSON.stringify({ name: cleanName, message: cleanMessage }) });
  if (!response.ok) throw Error('Comment could not be saved');
  const comments = await response.json() as Comment[];
  if (!comments[0]) throw Error('Comment could not be saved');
  return comments[0];
}
