'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Comment } from '../../lib/api';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');

  async function load() {
    const { data: user } = await supabase.auth.getUser();
    setUserId(user.user?.id ?? null);
    if (!user.user) return;
    const { data, error: queryError } = await supabase.from('comments').select('id,name,message,created_at').order('created_at', { ascending: false });
    if (queryError) setError(queryError.message);
    else setComments(data ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setError(loginError.message);
    else await load();
  }

  async function remove(id: string) {
    if (!window.confirm('Hapus jejak ini?')) return;
    const { error: deleteError } = await supabase.from('comments').delete().eq('id', id);
    if (deleteError) setError(deleteError.message);
    else setComments((items) => items.filter((item) => item.id !== id));
  }

  if (!userId) return <main className="wrap section"><div className="sec-head"><p className="sec-no">ADMIN</p><h1>Admin login<span className="dot">.</span></h1></div><form className="card guestbook-form" onSubmit={login}><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button className="btn btn-gold" type="submit">Login</button>{error && <p className="form-error" role="alert">{error}</p>}</form></main>;

  return <main className="wrap section"><div className="sec-head"><p className="sec-no">ADMIN</p><h1>Manage traces<span className="dot">.</span></h1><button className="btn btn-paper" onClick={() => supabase.auth.signOut().then(() => setUserId(null))}>Sign out</button></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="guestbook-list">{comments.map((comment) => <article className="card guestbook-entry" key={comment.id}><header><strong>{comment.name}</strong><button className="btn btn-ghost btn-sm" onClick={() => remove(comment.id)}>Delete</button></header><p>{comment.message}</p></article>)}</div></main>;
}
