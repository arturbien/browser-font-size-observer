import { JSDOM } from "jsdom";
import BrowserFontSizeObserver from "./";

test("A pixel is created", () => {
  const browserFontSizeObserver = new BrowserFontSizeObserver();
  const customElement =
    document.documentElement.querySelector("browser-font-size");
  expect(customElement).toBeTruthy();
});
