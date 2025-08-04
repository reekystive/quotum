import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center overflow-clip`}>
      <button
        className={`
          cursor-pointer rounded-sm border border-neutral-500/10 px-3 py-1 font-medium transition-colors duration-250
        `}
      >
        Create Quote
      </button>
    </div>
  );
};
