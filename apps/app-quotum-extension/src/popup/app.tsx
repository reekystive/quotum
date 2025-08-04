import crxLogo from '#src/assets/crx.svg';
import reactLogo from '#src/assets/react.svg';
import viteLogo from '#src/assets/vite.svg';
import { HelloWorld } from '#src/components/hello-world.js';
import { FC } from 'react';
import './app.css';

export const App: FC = () => {
  return (
    <div>
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://crxjs.dev/vite-plugin" target="_blank" rel="noreferrer">
        <img src={crxLogo} className="logo crx" alt="crx logo" />
      </a>
      <HelloWorld msg="Vite + React + CRXJS" />
    </div>
  );
};
