'use client';

import { Button } from '#src/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '#src/components/ui/dropdown-menu.tsx';
import { useTheme } from '#src/providers/theme-provider.tsx';
import { FC } from 'react';

const Page: FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="mx-auto flex max-w-xl flex-col items-stretch gap-2 p-2 dark:bg-amber-50">
      <div className="self-center text-xs">
        Selected theme: <span className="font-bold">{theme}</span>
        <br />
        Resolved theme: <span className="font-bold">{resolvedTheme}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-56 self-center" variant="outline">
            Change theme
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuCheckboxItem checked={theme === 'light'} onCheckedChange={() => setTheme('light')}>
            Always light
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={theme === 'dark'} onCheckedChange={() => setTheme('dark')}>
            Always dark
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={theme === 'system'} onCheckedChange={() => setTheme('system')}>
            Follow system
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Page;
