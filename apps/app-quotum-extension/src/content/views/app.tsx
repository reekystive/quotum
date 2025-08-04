import Logo from '#src/assets/crx.svg';
import { FC, useState } from 'react';
import './app.css';

export const App: FC = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className={`fixed right-0 bottom-0 z-[100] m-5 flex items-end font-sans leading-none select-none`}>
      {show && (
        <div
          className={`
            mr-2 h-min w-max rounded-lg bg-white px-4 py-2 text-gray-800 shadow-lg transition-opacity duration-300
          `}
        >
          <h1>HELLO CRXJS</h1>
        </div>
      )}
      <button
        className={`
          flex h-10 w-10 cursor-pointer justify-center rounded-full border-none bg-[#288cd7] shadow-sm
          hover:bg-[#1e6aa3]
        `}
        onClick={toggle}
      >
        <img src={Logo} alt="CRXJS logo" className="p-1" />
      </button>
    </div>
  );
};
