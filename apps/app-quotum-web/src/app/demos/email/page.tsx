'use client';

import { Button } from '#src/components/ui/button.tsx';
import { Input } from '#src/components/ui/input.tsx';
import { Textarea } from '#src/components/ui/textarea.tsx';
import { trpc } from '#src/services/trpc-client.ts';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';

const Page: FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');

  const sendEmailMutation = useMutation({
    mutationFn: () => trpc.sendEmail.mutate({ to, subject, html }),
  });

  return (
    <div className="mx-auto flex max-w-xl flex-col items-stretch gap-2 p-2">
      <div className="self-center text-xs">
        <span>Send email mutation state: </span>
        <span className="font-bold">
          {sendEmailMutation.isPending && 'Sending email...'}
          {sendEmailMutation.isSuccess && 'Email sent'}
          {sendEmailMutation.isError && 'Failed to send email'}
          {!sendEmailMutation.isPending &&
            !sendEmailMutation.isSuccess &&
            !sendEmailMutation.isError &&
            'No mutation in progress'}
        </span>
      </div>

      <Input placeholder="hello@subby.com" value={to} onChange={(e) => setTo(e.target.value)} />
      <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Textarea placeholder="Write an email..." value={html} onChange={(e) => setHtml(e.target.value)} />
      <Button onClick={() => sendEmailMutation.mutate()} disabled={sendEmailMutation.isPending}>
        Send Email
      </Button>
    </div>
  );
};

export default Page;
