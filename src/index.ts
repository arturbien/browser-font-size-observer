class BrowserFontSizeObserver {
  #customElement: HTMLElement;
  resizeObserver: ResizeObserver | null = null;

  constructor(
    private readonly onChangeHandler: (state: {
      browserFontSize: number;
      ratio: number;
    }) => void
  ) {
    this.#init();
  }

  async #init() {
    const pixel = await this.#createPixel();
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const size = entry.borderBoxSize
          ? entry.borderBoxSize[0].inlineSize
          : (entry.target as HTMLElement).offsetWidth;
        this.onChangeHandler({ browserFontSize: size, ratio: size / 16 });
      }
    });
    this.resizeObserver.observe(pixel);
  }

  async #createPixel() {
    this.#customElement = document.createElement("browser-font-size");
    Object.assign(this.#customElement.style, {
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
    const shadowRoot = this.#customElement.attachShadow({ mode: "closed" });
    const iframe = document.createElement("iframe");
    iframe.src = "about:blank";
    shadowRoot.appendChild(iframe);
    document.documentElement.appendChild(this.#customElement);

    const createPixelElement = (document: Document) => {
      document.open();
      document.write(`<div style="width:1rem;height:1rem;"></div>`);
      document.close();
      const pixel = document.querySelector("div") as HTMLDivElement;
      return pixel;
    };

    if (iframe.contentDocument) {
      return createPixelElement(iframe.contentDocument);
    } else {
      return new Promise<HTMLDivElement>((resolve) => {
        iframe.addEventListener("load", () => {
          iframe.onload = null;
          const pixel = createPixelElement(iframe.contentDocument);
          resolve(pixel);
        });
      });
    }
  }

  disconnect() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.#customElement.remove();
  }
}

export default BrowserFontSizeObserver;
