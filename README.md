## WebsiteClosers Multi-Page Scraper

An efficient and reliable scraper designed to extract business listings from websiteclosers.com.
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

## Output Data

- Reference Image
- Business Name
- Short Description
- Raw Asking Price
- Numeric Asking Price
- Raw Cash Flow
- Numeric Cash Flow
- Availability
- Broker Name
- Timestamp
- Offer Link

## Getting started

You can run the Actor locally using:

```bash
apify run
```
To scrape provide an input like this:

```json
{
	"startUrl": "https://www.websiteclosers.com/businesses-for-sale/page/1/",
	"type" : "Max Items",
	"max" : 2
}
```
The expected output:
```powershell
Page No: 1 Link No:  0 {
  link: 'https://www.websiteclosers.com/businesses/ai-tech-enabled-immigration-services-agency-320-active-engagements-25-call-to-contract-conversions-13-000-average-ltv-low-3-churn-rate-2/116744/',
  image: 'https://www.websiteclosers.com/wp-content/uploads/2025/10/640x480-Jinee-400x400.png',
  title: 'AI Tech-Enabled Immigration Services Agency | 320+ Active Engagements | 25% Call-to-Contract Conversions | $13,000 Average LTV | Low 3% Churn Rate',
  desc: 'WebsiteClosers® presents an AI Tech-Enabled Immigration Services Company revolutionizing how professionals pursue Talent-Based Visas.',
  rawprice: '$ 16,000,000',
  numprice: 16000000,
  rawprofit: '$ 3,250,827',
  numprofit: 3250827,
  available: true,
  broker: 'WebsiteClosers®',
  timestamp: 2025-10-24T23:08:18.860Z
}
Page No: 1 Link No:  1 {
  link: 'https://www.websiteclosers.com/businesses/sba-pre-qualified-sports-events-company-80-repeat-client-base-37k-per-tournament-2-000-spectators-per-event-strong-instagram-following/116866/',
  image: 'https://www.websiteclosers.com/wp-content/uploads/2025/10/640x480-18-400x400.png',
  title: 'SBA Pre-Qualified Sports Events Company | 80% Repeat Client Base | $37K Per Tournament | 2,000+ Spectators Per Event | Strong Instagram Following',
  desc: 'WebsiteClosers® presents an SBA Pre-Qualified Youth Basketball Tournament & Exposure Event Company known for organizing high-demand competitions that attract players,.',
  rawprice: '$ 1,100,000',
  numprice: 1100000,
  rawprofit: '$ 426,782',
  numprofit: 426782,
  available: true,
  broker: 'WebsiteClosers®',
  timestamp: 2025-10-24T23:08:18.861Z
}
```


