'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Comment, fetchComments, submitComment } from '../lib/api';

const MAX_MESSAGE_LENGTH = 500;

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchComments()
      .then((response) => setComments(response.comments))
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Guestbook could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  async function sendComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSending(true);

    try {
      const comment = await submitComment(name.trim(), message.trim());
      setComments((current) => [comment, ...current]);
      setName('');
      setMessage('');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Your comment could not be sent.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="wrap section" id="guestbook" aria-labelledby="guestbook-title">
      <div className="sec-head">
        <p className="sec-no">06 / Jejak</p>
        <h2 id="guestbook-title">Tinggalin jejak<span className="dot">.</span></h2>
        <p className="sec-sub">Tulis sesuatu atau sekadar say hi. Nama dan pesanmu akan muncul di sini.</p>
      </div>

      <div className="guestbook-grid">
        <form className="card guestbook-form" onSubmit={sendComment} noValidate>
          <label htmlFor="guestbook-name">Name</label>
          <input id="guestbook-name" required minLength={2} maxLength={50} value={name} onChange={(event) => setName(event.target.value)} />

          <label htmlFor="guestbook-message">Message</label>
          <textarea id="guestbook-message" required minLength={3} maxLength={MAX_MESSAGE_LENGTH} value={message} onChange={(event) => setMessage(event.target.value)} />
          <small className="field-hint">{message.length}/{MAX_MESSAGE_LENGTH}</small>

          <button className="btn btn-gold" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Leave a trace ↗'}
          </button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>

        <div className="guestbook-list" aria-live="polite">
          {loading && <p className="guestbook-state">Loading traces...</p>}
          {!loading && !comments.length && <p className="guestbook-state">Belom ada jejak. Jadi yang pertama!</p>}
          {comments.map((comment) => (
            <article className="card guestbook-entry" key={comment.id}>
              <header>
                <strong>{comment.website ? <a href={comment.website} target="_blank" rel="noreferrer">{comment.name}</a> : comment.name}</strong>
                <time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString()}</time>
              </header>
              <p>{comment.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
