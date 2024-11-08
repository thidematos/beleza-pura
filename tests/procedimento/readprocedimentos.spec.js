// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Read procedimentos', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Read procedimentos', async function() {
    await driver.get("https://beleza-pura.onrender.com/")
    await driver.manage().window().setRect({ width: 736, height: 765 })
    await driver.findElement(By.css(".bg-brandGreen")).click()
    await driver.findElement(By.css(".font-montserrat:nth-child(2)")).click()
  })
})
