export const delayInLocalDevOnly = async (ms = 500) => {
  if (process.env.NODE_ENV === 'development') {
    // add a delay to the request to simulate a slow network
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
};
