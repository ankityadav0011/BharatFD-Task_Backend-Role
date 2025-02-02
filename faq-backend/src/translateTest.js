const translate = require('google-translate-open-api').default;

(async () => {
  try {
    const result = await translate('Hello', { tld: "com", to: 'hi' });
    console.log(result.data[0]);
  } catch (error) {
    console.error(error);
  }
})();
