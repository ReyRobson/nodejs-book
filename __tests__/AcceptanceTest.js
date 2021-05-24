const webdriver = require('selenium-webdriver')
//const port = Number(new URL(frontedURL).port)
    
describe("Test site", () => {
    test("Verify site get", async () => {
        let a = await getsite()
        expect(a).not.toBe(false)
    })
})

async function getsite(){
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
