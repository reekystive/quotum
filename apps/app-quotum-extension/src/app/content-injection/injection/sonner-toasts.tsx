import { toast } from 'sonner';
import { Injected } from './inject-globals-types.js';

export const toastQuoteCreated: Injected['sonnerUtils']['toastQuoteCreated'] = (quoteUrl) => {
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
