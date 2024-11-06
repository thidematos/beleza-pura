// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Read usuario', function() {
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
  it('Read usuario', async function() {
    await driver.get("https://beleza-pura.onrender.com/")
    await driver.manage().window().setRect({ width: 737, height: 767 })
    await driver.findElement(By.css(".bg-brandGreen")).click()
    await driver.findElement(By.css(".drop-shadow-lg:nth-child(1)")).click()
    await driver.findElement(By.css(".active")).click()
    await driver.close()
  })
})