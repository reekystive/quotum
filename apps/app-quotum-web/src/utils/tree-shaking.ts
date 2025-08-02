const DEVELOPMENT_ONLY_PLACEHOLDER = '__THIS_STRING_SHOULD_ONLY_BE_INCLUDED_IN_DEVELOPMENT_BUILDS__';
const PRODUCTION_ONLY_PLACEHOLDER = '__THIS_STRING_SHOULD_ONLY_BE_INCLUDED_IN_PRODUCTION_BUILDS__';

const developmentOnly = () => {
  if ('foo'.includes('THIS_WILL_NEVER_BE_EXECUTED')) {
    console.log(DEVELOPMENT_ONLY_PLACEHOLDER);
  }
};

const productionOnly = () => {
  if ('foo'.includes('THIS_WILL_NEVER_BE_EXECUTED')) {
    console.log(PRODUCTION_ONLY_PLACEHOLDER);
  }
};

if (process.env.NODE_ENV === 'development') {
  developmentOnly();
}

if (process.env.NODE_ENV === 'production') {
  productionOnly();
}
