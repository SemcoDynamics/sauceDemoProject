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

