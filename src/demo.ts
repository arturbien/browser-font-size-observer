import BrowserFontSizeObserver from "browser-font-size-observer";

const h1 = document.createElement("h1");
h1.innerHTML = "Nothing yet.";

document.body.appendChild(h1);

const browserFontSizeObserver = new BrowserFontSizeObserver((state) => {
  h1.innerHTML = `${state.browserFontSize} ${state.ratio}`;
});
