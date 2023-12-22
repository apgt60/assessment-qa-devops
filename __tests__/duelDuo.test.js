const { Builder, Browser, By, until, Key } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("Div with choices populates when 'Draw' is clicked", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
    
    let choicesDivText = await driver.findElement(By.id("choices")).getText()
    expect(choicesDivText.length).toEqual(0)
    
    await driver.findElement(By.id("draw")).sendKeys(Key.RETURN);

    choicesDivText = await driver.findElement(By.id("choices")).getText()
    expect(choicesDivText.length).toBeGreaterThan(0)
  });

  test("Div with player selection is populated when a bot is added to duo", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
    
    let playerDuoDivText = await driver.findElement(By.id("player-duo")).getText()
    expect(playerDuoDivText.length).toEqual(0)
    
    await driver.findElement(By.id("draw")).sendKeys(Key.RETURN);

    const buttons = await driver.findElements(By.tagName("button"))

    for(let i=0; i < buttons.length; i++){
      if((await buttons[i].getText()) === 'Add to Duo'){
        await buttons[i].sendKeys(Key.RETURN)
        break;
      }
    }

    playerDuoDivText = await driver.findElement(By.id("player-duo")).getText()
    expect(playerDuoDivText.length).toBeGreaterThan(0)
  });

});