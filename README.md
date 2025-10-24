## WebsiteClosers Multi-Page Scraper

An efficient and reliable scraper designed to extract bussiness listings from websiteclosers.com.
This Actor starts from a provided URL and starts scraping by maximum items or number of pages.
The collected data is stored in a dataset for easy use.



## Included features

- Apify SDK
- Cheerio
- PlaywrightCrawler (by Crawlee)
- RequestList

## How it works

1. `Actor.getInput()` gets the input where the parameters are defined
2. pagination URLs are generated from the provided start URL
3. PlayWright starts loading each one of these pages
4. Cheerio parses and extracts targeted details
    ```javascript
     $('div.post_item').each((i, element) => {...});
    ```
5. `Actor.pushData()` store results in a dataset


## Getting started

You can run the Actor locally using:

```bash
apify run
```
To scrape provide an input like:

```json
{
	"startUrl": "https://www.websiteclosers.com/businesses-for-sale/page/3/",
	"type" : "Max Items",
	"max" : 13
}
```



