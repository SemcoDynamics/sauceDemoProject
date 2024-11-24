import {test, expect} from "playwright/test"
import tags from '../test-data/tags.json'
import articles from '../test-data/articles.json'

test.describe('Mock test', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
                const tags = {
                    "tags": [
                        "Dell",
                        "Apple",
                    ]
                }
            await route.fulfill({
                body: JSON.stringify(tags)
            })
        })
    });
    
    test('My first mocked test', async ({ page }) => {
        await page.goto('https://conduit.bondaracademy.com/')
        await page.waitForSelector('.tag-list')
        const taglist = page.locator('.tag-list')
        const taglistText = await taglist.textContent()
        expect(taglistText).toContain('Dell');
    
    });
     
});
test.describe('Mock test refractored', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
            await route.fulfill({
                //Parses test data json
                body: JSON.stringify(tags)
            })
        })
    });
    
    test('My first mocked test', async ({ page }) => {
        await page.goto('https://conduit.bondaracademy.com/')
        await page.waitForSelector('.tag-list')
    });
});
test.describe('Mock test 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', async route => {
            await route.fulfill({
                //Parses test data json
                body: JSON.stringify(articles)
            })
        })
    });
    
    test('My first mocked test', async ({ page }) => {
        await page.goto('https://conduit.bondaracademy.com/')
        await page.waitForSelector('.article-preview')
    });
    
});
test.describe('Mock API without a Json', () => {
    test('Mock 1 - Fetching API and editing value', async ({ page }) => {
        
        await page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', async route => {
            const response = await route.fetch();
            const responseBody = await response.json();
            //Mocking the response
            responseBody.articles[0].favoritesCount = 100
            responseBody.articles[0].title = 'The title of a job Well done!'
            await route.fulfill({
                response,
                //Parses test data json
                body: JSON.stringify(responseBody)
            })
        })
        await page.goto('https://conduit.bondaracademy.com/')
        const tagCard = 'app-article-preview'
        await page.waitForSelector(tagCard)

    });

});

test('Abort request', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/');

    await page.route('https://conduit-api.bondaracademy.com/api/tags', route => route.abort());
    await page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', route => route.abort());

    await page.waitForTimeout(5000);
});

