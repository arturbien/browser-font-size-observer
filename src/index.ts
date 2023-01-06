type State = {
  browserFontSize: number;
  ratio: number;
};
type OnChangeHandler = (state: State) => void;

class BrowserFontSizeObserver {
  static #customElementName = "browser-font-size";
  static #pixel: HTMLElement | null = null;

  static #createPixel() {
    if (!BrowserFontSizeObserver.#pixel) {
      const customElement = document.createElement(
        BrowserFontSizeObserver.#customElementName
      );
      Object.assign(customElement.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: "0px",
        height: "0px",
        overflow: "hidden",
        pointerEvents: "none",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
      });

      const shadowRoot = customElement.attachShadow({ mode: "closed" });
      const iframe = document.createElement("iframe");
      shadowRoot.appendChild(iframe);

      document.documentElement.appendChild(customElement);
      iframe.contentWindow.document.write(
        `<div style="width:1rem;height:1rem;"></div>`
      );
      const pixel = iframe.contentWindow.document.querySelector(
        "div"
      ) as HTMLDivElement;

      BrowserFontSizeObserver.#pixel = pixel;
    }
    return BrowserFontSizeObserver.#pixel;
  }

  #state: State | null = null;
  #resizeObserver: ResizeObserver | null = null;
  #onChangeHandler: OnChangeHandler | null = null;

  #setState(size: number) {
    this.#state = {
      browserFontSize: size,
      ratio: size / 16,
    };
  }

  constructor(onChangeHandler?: OnChangeHandler) {
    const pixel = BrowserFontSizeObserver.#createPixel();
    const size = pixel.offsetWidth;
    this.#setState(size);

    if (onChangeHandler) {
      this.#onChangeHandler = onChangeHandler;
    }
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const size = entry.borderBoxSize
          ? entry.borderBoxSize[0].inlineSize
          : (entry.target as HTMLElement).offsetWidth;

        this.#setState(size);
        this.#onChangeHandler?.(this.#state);
      }
    });
    this.#resizeObserver.observe(pixel);
  }

  disconnect() {
    this.#onChangeHandler = null;
  }

  get state() {
    return this.#state;
  }
}

export default BrowserFontSizeObserver;
