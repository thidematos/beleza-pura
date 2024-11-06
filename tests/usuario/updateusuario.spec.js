// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Update usuario', function() {
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
  it('Update usuario', async function() {
    await driver.get("https://beleza-pura.onrender.com/")
    await driver.manage().window().setRect({ width: 1454, height: 866 })
    await driver.findElement(By.css(".bg-brandGreen")).click()
    await driver.findElement(By.css(".drop-shadow-lg:nth-child(1)")).click()
    await driver.findElement(By.css(".grid:nth-child(4) .svg-inline--fa:nth-child(1) > path")).click()
    await driver.findElement(By.css(".max-h-\\[60svh\\]")).click()
    await driver.findElement(By.name("celular")).sendKeys("35991191678")
    await driver.findElement(By.css(".w-\\[60\\%\\]")).click()
  })
})
