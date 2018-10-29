const puppeteer = require("puppeteer");
const config = require("./config");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(config.URL, {
    timeout: 25000,
    waitUntil: "networkidle2",
  });

  const result = await page.evaluate(selector => {
    const data = []; // Create an empty array that will store our data
    const elements = document.querySelectorAll(`${selector}`); // Select all
    for (const element of elements) {
      // Loop through each
      let title = element.innerText; // Select a link title
      let href = element.href; // Select the link href

      data.push({ title, href }); // Push an object with the data onto our array
    }

    return data; // Return our data array
  }, config.selector);
  console.log(result);
  await browser.close();
})();