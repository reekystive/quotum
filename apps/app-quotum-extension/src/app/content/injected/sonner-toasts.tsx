import { toast } from 'sonner';

export const toastQuoteCreated: typeof globalThis.sonnerUtils.toastQuoteCreated = (quoteUrl) => {
  toast.success(
    <>
      <span>Quote created! Redirecting to </span>
      <a href={quoteUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
        quote page
      </a>
      <span>...</span>
    </>
  );
};
