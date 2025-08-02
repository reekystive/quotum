'use client';

import { useEffect, useState } from 'react';

const useClientMountState = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export default useClientMountState;
