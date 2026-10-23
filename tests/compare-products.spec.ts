import { test, expect } from '../fixtures/pages.fixture';

test(
  'COMP-01: Slip Joint Pliers costs less than Claw Hammer',
  async ({ catalogPage, productPage }, testInfo) => {
    const productA = 'Slip Joint Pliers';
    const productB = 'Claw Hammer';

    await catalogPage.open();
    await catalogPage.openProduct(productA);

    await expect(productPage.name).toHaveText(productA);

    const nameA = (await productPage.name.innerText()).trim();
    const priceA = await productPage.getPriceInCents();

    await catalogPage.open();
    await catalogPage.openProduct(productB);

    await expect(productPage.name).toHaveText(productB);

    const nameB = (await productPage.name.innerText()).trim();
    const priceB = await productPage.getPriceInCents();

    await testInfo.attach('product-comparison', {
      body: JSON.stringify(
        {
          productA: { name: nameA, priceInCents: priceA },
          productB: { name: nameB, priceInCents: priceB },
          comparisonRule: 'Product A costs less than product B',
        },
        null,
        2,
      ),
      contentType: 'application/json',
    });

    expect(nameA).not.toBe(nameB);
    expect(priceA).toBeGreaterThan(0);
    expect(priceB).toBeGreaterThan(0);

    expect(
      priceA,
      `${nameA} must cost less than ${nameB}`,
    ).toBeLessThan(priceB);
  },
);