import { Actor, PlaywrightCrawler } from 'apify';
import axios from 'axios';
import * as cheerio from 'cheerio';
await Actor.init();
const input = await Actor.getInput();
const object = [];
const crawler = new PlaywrightCrawler
let { startUrl } = input;
if (startUrl.split('/')[2] != 'www.websiteclosers.com') {
    console.log('Thats not a valid URL')
} else {
    let defPage = (startUrl.match(/\d+/) === null || parseInt(startUrl.match(/\d+/)) === 0) ? 1 : parseInt(startUrl.match(/\d+/)[0]);
    let { type } = input;
    let { max } = input;
    let page;
    let item;
    if (type == "Max Items") {
        page = Math.floor(max / 12) + 2
        item = (max > 12) ? (max % 12) : max
        await searchData(defPage, page, item);
    }
    async function searchData(def, amount, res) {
        console.log(def)
        console.log(amount)
        console.log(res)
        for (let j = def; j < amount; j++) {
            let url = 'https://www.websiteclosers.com/businesses-for-sale/page/' + j + '/';
            let response = await axios.get(url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                },
            });
            const $ = cheerio.load(response.data);
            $('div.post_item').each((i, element) => {
                if (i == res && j == amount - 1) {
                    return false
                } else {
                    let price = $(element).find('div.botoom.flex div div.asking_price strong')
                    let profit = $(element).find('div.botoom.flex div div.cash_flow strong')
                    const infoObject = {
                        link: $(element).find('a').prop('href'),
                        image: $(element).find('a').attr('data-bg'),
                        title: $(element).find('div.post_content a.post_title').text(),
                        desc: $(element).find('div.post_content div.the_content').text().trim().split('.')[0] + '.',
                        rawprice: (price.length == 0) ? 'N/A' : price.text(),
                        numprice: (price.length == 0) ? 'N/A' : parseInt(price.text().split('$')[1].replaceAll(',', '')),
                        rawprofit: (profit.length == 0) ? 'N/A' : profit.text(),
                        numprofit: (profit.length == 0) ? 'N/A' : parseInt(profit.text().split('$')[1].replaceAll(',', '')),
                        available: ($(element).find('a span').text().toLowerCase()) === 'available',
                        broker: $(element).find('div.post_content div.the_content').text().trim().split(' ')[0],
                        timestamp: new Date(Date.now())
                    };
                    console.log('Pagina', j, 'Link No: ', i, infoObject);
                    object.push(infoObject);
                }

            });
        }
        await Actor.pushData(object);
    }
}

await Actor.exit();
