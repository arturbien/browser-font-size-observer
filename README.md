# browser-font-size-observer
<p>
  <a href="https://www.npmjs.com/package/browser-font-size-observer"><img src="https://flat.badgen.net/npm/v/browser-font-size-observer" alt="browser-font-size-observer version" /></a>
  <a href="https://www.npmjs.com/package/browser-font-size-observer"><img src="https://flat.badgen.net/npm/license/browser-font-size-observer" alt="browser-font-size-observer license" /></a>
</p>

A library that tracks the browser's font size setting.

## Installation

To install, run:

```sh
# yarn
yarn add browser-font-size-observer

# npm
npm install browser-font-size-observer
```

## Usage

```js
import BrowserFontSizeObserver from "browser-font-size-observer";

const observer = new BrowserFontSizeObserver((state) => {
  console.log(state);
});

console.log(observer.state); // { browserFontSize: 16, ratio: 1 }

// To stop observing
observer.disconnect();
```

## Use Case

One potential use case for this library is in browser extensions, chatbots or other widgets that are embedded on top of another website. In these scenarios, the containing website may have a fixed font size, which means that any changes to the browser's font size setting may not be reflected in the extension or a widget.

By using the BrowserFontSizeObserver, the extension or widget can track changes to the browser's font size setting and adjust its own layout or styles accordingly, even if the containing website does not change.

## Browser Compatibility

It is worth noting that different browsers may behave differently when it comes to changes in the browser's font size setting.

In Chrome and Firefox, changes to the browser's font size setting will only affect webpages whose html tag has a font-size specified in the rem or em unit. If the html tag has a font-size specified in any other unit (such as px), the font size of the webpage will not change when the browser's font size setting is changed.

Safari, on the other hand, will change the font size of a webpage regardless of the unit used for the font-size of the html tag.

Keep this in mind when using the BrowserFontSizeObserver library, as the resulting ratio of the state object may not always match the browser's font size setting in these different browsers.

## API

### `BrowserFontSizeObserver`

#### `constructor(onChangeHandler?: OnChangeHandler)`

Creates an instance of `BrowserFontSizeObserver`.

##### Parameters

- `onChangeHandler` (optional): A callback function that will be called whenever the browser font size changes. The callback will be passed an object with the following shape: `{ browserFontSize: number, ratio: number }`.

#### `disconnect()`

Stops observing for changes to the browser font size.

#### `state: State`

An object with the following shape: `{ browserFontSize: number, ratio: number }`.

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE) for more details.
