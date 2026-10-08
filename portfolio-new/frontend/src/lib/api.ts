export type Comment={id:string;name:string;message:string;website?:string;created_at:string};
const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080').replace(/\/$/, '');
export async function fetchComments(page=1,limit=10){const r=await fetch(`${base}/api/comments?page=${page}&limit=${limit}`);if(!r.ok)throw Error('Could not load guestbook');return r.json() as Promise<{comments:Comment[];has_more:boolean}>}
export async function submitComment(name:string,message:string,website?:string){const r=await fetch(`${base}/api/comments`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,message,website})});if(!r.ok)throw Error(await r.text());return r.json() as Promise<Comment>}
