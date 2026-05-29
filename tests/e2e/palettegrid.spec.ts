import { expect, test } from "@playwright/test";

test("page loads with generator controls", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/PaletteGrid/);
  await expect(page.getByRole("heading", { name: /Generate a starter design system/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Generate system/i }).first()).toBeVisible();
});

test("palette size flow updates color cards", async ({ page }) => {
  await page.goto("/");
  await page.locator("#generator").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Palette size 3" }).click();
  await expect(page.getByTestId("color-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Palette size 6" }).click();
  await expect(page.getByTestId("color-card")).toHaveCount(6);
});

test("generate and mood flows update output", async ({ page }) => {
  await page.goto("/");
  await page.locator("#generator").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const primaryCard = page.locator('[data-role="primary"]');
  const primaryBefore = await primaryCard.textContent();
  await page.locator("#generator").getByRole("button", { name: /^Generate system$/ }).click();
  await expect(primaryCard).not.toHaveText(primaryBefore ?? "");
  await page.getByLabel("Mood").selectOption("pastel-product");
  await page.getByLabel("Mood").selectOption("future-neon");
  await expect(page.getByText("Future Neon").first()).toBeVisible();
});

test("export and preview are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("--color-")).toBeVisible();
  await expect(page.getByTestId("preview-canvas").getByText("Hero Preview")).toBeVisible();
  await expect(page.getByTestId("preview-canvas").getByText("Typography Preview")).toBeVisible();
  await page.getByLabel("Font pairing").selectOption("syne-inter");
  await expect(page.getByRole("heading", { name: "Syne + Inter" })).toBeVisible();
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByText("Generator controls")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
