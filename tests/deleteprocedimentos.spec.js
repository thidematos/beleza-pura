// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Delete procedimentos', function() {
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
  it('Delete procedimentos', async function() {
    await driver.get("https://beleza-pura.onrender.com/")
    await driver.manage().window().setRect({ width: 736, height: 765 })
    await driver.findElement(By.css(".font-montserrat:nth-child(2)")).click()
    await driver.findElement(By.css(".grid:nth-child(2) > .col-span-1 .svg-inline--fa:nth-child(2) > path")).click()
    await driver.findElement(By.css(".bg-red-800")).click()
  })
})
