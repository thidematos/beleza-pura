// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Create equipamentos', function() {
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
  it('Create equipamentos', async function() {
    await driver.get("https://beleza-pura.onrender.com/")
    await driver.manage().window().setRect({ width: 1454, height: 866 })
    await driver.findElement(By.css(".bg-brandGreen")).click()
    await driver.findElement(By.css(".font-montserrat:nth-child(5)")).click()
    await driver.findElement(By.css(".fixed")).click()
    {
      const dropdown = await driver.findElement(By.id("equipamento"))
      await dropdown.findElement(By.xpath("//option[. = 'Prancha alisadora']")).click()
    }
    await driver.findElement(By.id("marca")).sendKeys("Gama Italy")
    await driver.findElement(By.id("voltagem")).sendKeys("110/220")
    await driver.findElement(By.id("date")).click()
    await driver.findElement(By.css(".my-4")).click()
  })
})
