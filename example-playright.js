const {
  chromium
} = require('playwright');

const axios = require('axios');
const {
  Heal
} = require('./lib/Heal.js');
const HEALENIUM_URL = 'http://localhost:7878/healenium'

const waitSelector = async (page, locator, className, methodName) => {
  try {
    await page.waitForSelector(locator);
    return locator;
  } catch (e) {
    console.log("try healing");
    const healer = new Heal(HEALENIUM_URL);
    const html=await page.content();
    const selector = await healer.find(locator, className, methodName, html);
    return selector;
  }
}

const cleanUp = async (browser) => {
    await browser.close();
  }
  (async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    const elementPath = 'html body form div.container button.registerbtn';
    const selector = await waitSelector(page, elementPath, 'pages.HealingTestPage', 'clickSubmitButton');
    if (!selector) {
      console.log("path not found")
      return await cleanUp(browser);
    }
    console.log("Got selector", selector);
    try {
      await page.click(selector);
      await page.screenshot({
        path: `example.png`
      });
    }catch(e){
      console.log(e);
    }finally{
      await cleanUp(browser);
    }
  })();
