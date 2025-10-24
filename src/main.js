import { Actor } from 'apify';
import { RequestList, PlaywrightCrawler } from 'crawlee'
import * as cheerio from 'cheerio';
await Actor.init();
const input = await Actor.getInput();
const urls = [];
const { startUrl, type, max } = input;
if (startUrl.split('/')[2] != 'www.websiteclosers.com') {
    console.log('Thats not a valid URL');
} else {
    let defPage = (startUrl.match(/\d+/) === null || parseInt(startUrl.match(/\d+/)) === 0) ? 1 : parseInt(startUrl.match(/\d+/)[0]);
    let pageNum;
    let item;
    if (type == "Max Items") {
        if (max < 12) {
            pageNum = 1
            item = max - 1
        } else {
            pageNum = Math.ceil(max / 12);
            item = (max - 1) % 12
        }
    } else {
        pageNum = max;
    };
    for (let i = defPage; i < (defPage + pageNum); i++) {
        console.log(i)
        if (i == 23) {
            break;
        }
        urls.push('https://www.websiteclosers.com/businesses-for-sale/page/' + i + '/');;
    }
    const requestList = await RequestList.open('urls', urls);

    const crawler = new PlaywrightCrawler({
        requestList,
        maxConcurrency: 1,
        maxRequestRetries: 3,
        requestHandlerTimeoutSecs: 15,
        requestHandler: async ({ page, request }) => {
            await page.waitForLoadState('networkidle');
            const html = await page.content();
            const $ = cheerio.load(html);
            const object = [];
            $('div.post_item').each((i, element) => {
                if (item != undefined) {
                    if (parseInt(request.url.match(/\d+/)[0]) == (defPage + pageNum) - 1 && i == item + 1) {
                        crawler.stop();
                        return false;
                    }
                }
                let price = $(element).find('div.botoom.flex div div.asking_price strong');
                let profit = $(element).find('div.botoom.flex div div.cash_flow strong');
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
                console.log('Page No:', parseInt(request.url.match(/\d+/)[0]), 'Link No: ', i, infoObject);
                object.push(infoObject);
            });
            await Actor.pushData(object);
        },

        failedRequestHandler: async ({ request }) => {
            crawler.stop();
        }

    });
    await crawler.run();
}

await Actor.exit();
