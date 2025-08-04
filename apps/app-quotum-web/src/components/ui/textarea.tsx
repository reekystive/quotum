import { cn } from '@quotum/utils';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        `
          flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm
          placeholder:text-muted-foreground
          focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50
          md:text-sm
        `,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Textarea };
