import { cn } from '@quotum/utils';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        `
          flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors
          file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
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

export { Input };
