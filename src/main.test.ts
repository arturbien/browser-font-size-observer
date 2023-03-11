import { JSDOM } from "jsdom";
import BrowserFontSizeObserver from "./";

afterEach(() => {
  document.getElementsByTagName("html")[0].innerHTML = "";
});

test("A custom element is added to the DOM when an instance of BrowserFontSizeObserver is created", () => {
  const browserFontSizeObserver = new BrowserFontSizeObserver(() => {});
  const customElement =
    document.documentElement.querySelector("browser-font-size");
  expect(customElement).toBeTruthy();
});

test("Custom element is removed from the DOM when observer is disconnected", () => {
  const browserFontSizeObserver = new BrowserFontSizeObserver(() => {});
  browserFontSizeObserver.disconnect();
  const customElement =
    document.documentElement.querySelector("browser-font-size");
  expect(customElement).toBeFalsy();
});
