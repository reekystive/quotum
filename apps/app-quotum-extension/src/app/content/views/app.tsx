import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={`fixed right-2 bottom-2`}>
      <button
        className={`
          flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-neutral-100
          text-neutral-800
          dark:bg-neutral-800 dark:text-neutral-200
        `}
      >
        Hi
      </button>
    </div>
  );
};
