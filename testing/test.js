const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function example() {
  var nameInput = "rami";
  var addressInput = "mashta";
  var phoneInput = "+96176565588";
  var nameEdit = " kadaweh";
  var adressEdit = " Lebanon";

  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000");

  await driver.findElement(By.name("editbtn")).click();
  await driver
    .findElement(By.name("customerNamee"))
    .sendKeys(nameEdit, Key.RETURN);
  await driver
    .findElement(By.name("customerAddresss"))
    .sendKeys(adressEdit, Key.RETURN);
  await driver.findElement(By.name("savebtn")).click();

  await driver
    .findElement(By.id("customerName"))
    .sendKeys(nameInput, Key.RETURN);
  await driver
    .findElement(By.id("customerAddress"))
    .sendKeys(addressInput, Key.RETURN);
  await driver
    .findElement(By.id("customerPhone"))
    .sendKeys(phoneInput, Key.RETURN);
  await driver.findElement(By.name("addCustomer")).click();
}

example();
