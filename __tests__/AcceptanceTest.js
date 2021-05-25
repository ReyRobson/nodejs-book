const webdriver = require('selenium-webdriver');

const capabilities = {
    'browserName': 'chrome',
};

describe('webdriver', () => {
    let driver;
   
    beforeAll(async () => {
      driver = new webdriver.Builder()
        .usingServer('http://10.0.1.10:4444')
        .withCapabilities(capabilities)
        .build();
   
      // eslint-disable-next-line no-undef
      await driver.get(
        `https://www.selenium.dev`,
      );
    }, 10000);
   
    afterAll(async () => {
      await driver.quit();
    }, 15000);

    test('it performs a validation of the search box on the page', async () => {
        await driver.get('https://www.selenium.dev')
        const title = await driver.findElement(webdriver.By.tagName('h1')).getText()
        expect(title).toContain("Selenium automates browsers. That's it!")
    })
})



//const port = Number(new URL(frontedURL).port)
/*async function getsite(){
    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444')
    driver.build()
    try{
        //await driver.get(`http://localhost:${port}`)
        await driver.get('http://google.com/ncr')
        await driver.navigate().refresh();
        return true
    }catch(e){
        console.error(e);
        return false
    }finally{
        await driver.quit()
    }
}
*/
