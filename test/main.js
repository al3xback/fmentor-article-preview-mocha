import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-article-preview-mocha/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a card wrapper element with a class of 'card'", () => {
		const cardEl = document.querySelector('.card');

		assert.ok(cardEl);
	});

	it("should have a card image wrapper element with a class of 'card__image'", () => {
		const cardImgEl = document.querySelector('.card__image');

		assert.ok(cardImgEl);
	});

	it("should have a card content wrapper element with a class of 'card__content'", () => {
		const cardContentEl = document.querySelector('.card__content');

		assert.ok(cardContentEl);
	});
});
