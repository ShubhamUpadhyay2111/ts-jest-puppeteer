module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === 'true',
    args: ['--disable-infobars', '--window-size=1200,800'],
    // channel: 'firefox', // for chrome or firefox
    args:['--kiosk'],
    // executablePath: '<path>' for edge, chrome
    defaultViewport: null,
    // slowMo: 25,
  },
  browserContext: 'default', // to be commented for specific browser
};
