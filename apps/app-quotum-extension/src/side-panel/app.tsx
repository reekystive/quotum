import crxLogo from '#src/assets/crx.svg';
import reactLogo from '#src/assets/react.svg';
import viteLogo from '#src/assets/vite.svg';
import { HelloWorld } from '#src/components/hello-world.js';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div>
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <img
          src={viteLogo}
          className={`
            h-24 p-6 transition-[filter] duration-300 will-change-[filter]
            hover:drop-shadow-[0_0_2em_#646cffaa]
          `}
          alt="Vite logo"
        />
      </a>
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
        <img
          src={reactLogo}
          className={`
            h-24 p-6 transition-[filter] duration-300 will-change-[filter]
            hover:drop-shadow-[0_0_2em_#61dafbaa]
            motion-safe:animate-spin
          `}
          alt="React logo"
        />
      </a>
      <a href="https://crxjs.dev/vite-plugin" target="_blank" rel="noreferrer">
        <img
          src={crxLogo}
          className={`
            h-24 p-6 transition-[filter] duration-300 will-change-[filter]
            hover:drop-shadow-[0_0_2em_#f2bae4aa]
          `}
          alt="crx logo"
        />
      </a>
      <HelloWorld msg="Vite + React + CRXJS" />
    </div>
  );
};
