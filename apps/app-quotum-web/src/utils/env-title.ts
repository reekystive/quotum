export const getTitleWithEnvPrefix = (title: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `[dev] ${title}`;
  }
  return title;
};
