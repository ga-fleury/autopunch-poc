import puppeteer from "puppeteer";

let weekDays = [];
var curr = new Date;

// retorna os dias DESTA SEMANA (não 7 dias a partir de hoje)
for (let i = 0; i <= 6; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  weekDays.push(day)
}

// async delay 
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

// remove os dias da semana que já foram
let dayOffset = curr.getDay() - curr.getDate();

/**
 * business week days
 */
let businessDays = weekDays.slice(1 + dayOffset, 6)

const duasPessoas = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://widget.getinapp.com.br/e63Rr91v', {
    waitUntil: "domcontentloaded",
  });

  console.log('inicializando...')
  console.log('\n')
  // aguarda o carregamento da página (3s)
  await delay(3000);

  await page.click('#rc_select_3')
  await page.click('text/2 Pessoas')


  for (let i = 0; i < businessDays.length; i++) {
    await page.click('#date')
    await delay(500)
    await page.click(`[title="${businessDays[i]}"]`)
    await page.click('#schedule')

    console.log(businessDays[i])

    try {
      await page.waitForSelector('#schedule_list_0')
      console.log('18h00');
    } catch (error) {
      console.log('\n')
    }

    try {
      await page.waitForSelector('#schedule_list_1')
      console.log('21h30');
    } catch (error) {
      console.log('\n')
    }
    console.log('\n')
  }



  console.log('fim')

  await browser.close();
};

duasPessoas();
