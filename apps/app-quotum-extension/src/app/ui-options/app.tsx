import {
  addCustomServerEnvironmentInStorage,
  DEFAULT_SERVER_ENVIRONMENTS,
  getCustomServerEnvironmentsInStorage,
  getSelectedServerEnvironmentInStorage,
  removeCustomServerEnvironmentInStorage,
  ServerEnvironment,
  setSelectedServerEnvironmentInStorage,
} from '#src/storage/server-environments.js';
import { faker } from '@faker-js/faker';
import { cn } from '@quotum/utils';
import { X } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import { FC, useCallback, useEffect, useId, useState } from 'react';

export const App: FC = () => {
  const [serverEnvironments, setServerEnvironments] = useState<ServerEnvironment[]>(DEFAULT_SERVER_ENVIRONMENTS);
  const [selectedServerEnvironment, setSelectedServerEnvironment] = useState<ServerEnvironment | null>(null);

  const fetchServerEnvironments = useCallback(async () => {
    const customEnvironments = await getCustomServerEnvironmentsInStorage();
    const allEnvironments = [...DEFAULT_SERVER_ENVIRONMENTS, ...customEnvironments];
    setServerEnvironments(allEnvironments);
  }, []);

  const fetchSelectedServerEnvironment = useCallback(async () => {
    const environment = await getSelectedServerEnvironmentInStorage();
    setSelectedServerEnvironment(environment);
  }, []);

  useEffect(() => {
    void fetchServerEnvironments();
  }, [fetchServerEnvironments]);

  useEffect(() => {
    void fetchSelectedServerEnvironment();
  }, [fetchSelectedServerEnvironment]);

  const handleAddServerEnvironmentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const url = formData.get('url') as string;
    if (!url) {
      console.error('[Quotum] Add server environment: no URL provided');
      return;
    }
    const randomLabel = `${faker.word.adjective()}-${faker.word.noun()}`;
    void (async () => {
      await addCustomServerEnvironmentInStorage(url, randomLabel);
      await fetchServerEnvironments();
    })();
  };

  const handleRemoveServerEnvironment = (value: string) => {
    void (async () => {
      await removeCustomServerEnvironmentInStorage(value);
      await fetchServerEnvironments();
    })();
  };

  const handleSelectServerEnvironment = (value: string) => {
    void (async () => {
      await setSelectedServerEnvironmentInStorage(value);
      await fetchSelectedServerEnvironment();
    })();
  };

  return (
    <div className={`flex min-h-svh w-full flex-col items-center justify-center overflow-clip p-2`}>
      <form onSubmit={handleAddServerEnvironmentSubmit}>
        <h3 className="pb-2 pl-3 text-sm font-medium text-white">Select a backend server environment</h3>
        <div className="rounded-sm border border-neutral-500/50 py-2 pr-6 pl-3">
          <ServerSelector
            options={serverEnvironments}
            onRemove={handleRemoveServerEnvironment}
            value={selectedServerEnvironment?.value ?? ''}
            onValueChange={handleSelectServerEnvironment}
          />
        </div>

        <div className="h-4 w-full"></div>

        <h3 className="pb-2 pl-3 text-sm font-medium text-white">Or add a custom server</h3>
        <div className="flex flex-row items-stretch gap-2">
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            className="w-full rounded-sm border border-neutral-500/50 py-2 pr-2 pl-3 font-mono text-sm"
          />
          <button
            type="submit"
            className={`
              cursor-pointer rounded-sm border border-neutral-500/50 px-4 text-xs transition-colors
              hover:bg-neutral-500/20
              active:bg-neutral-500/30
            `}
          >
            Add
          </button>
        </div>
      </form>

      <div className="h-4 w-full"></div>
    </div>
  );
};

export const ServerSelector: FC<{
  options: ServerEnvironment[];
  className?: string;
  onRemove?: (value: string) => void;
  value: string;
  onValueChange?: (value: string) => void;
}> = ({ options, className, onRemove, value, onValueChange }) => {
  const id = useId();

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    e.stopPropagation();
    onRemove?.(value);
  };

  return (
    <RadioGroup.Root
      className={cn(
        `
          grid
          [grid-template-columns:1fr_auto]
          items-center font-mono text-sm
        `,
        className
      )}
      value={value}
      onValueChange={onValueChange}
      aria-label="Backend API base URL"
    >
      {options.map((option) => {
        const encodedValue = encodeURIComponent(option.value);
        return (
          <>
            <RadioGroup.Item
              className={`
                relative flex cursor-pointer flex-row items-center gap-1 justify-self-end rounded-sm border
                border-neutral-500/50 px-2 py-1 text-xs
                data-[state=checked]:bg-neutral-500/40
              `}
              value={option.value}
              id={`${id}-${encodedValue}`}
            >
              {option.removable && (
                <button className="relative" onClick={(e) => handleRemoveClick(e, option.value)}>
                  <X
                    className={`
                      pointer-events-none size-3 text-red-700
                      dark:text-red-300
                    `}
                  />
                  <div className="absolute -inset-2 cursor-pointer" />
                </button>
              )}
              <span className="truncate">{option.label}</span>
            </RadioGroup.Item>
            <label
              className="cursor-pointer justify-self-start py-3 pl-2 text-sm leading-none text-white"
              htmlFor={`${id}-${encodedValue}`}
            >
              {option.value}
            </label>
          </>
        );
      })}
    </RadioGroup.Root>
  );
};
