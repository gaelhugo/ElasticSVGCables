export default class Group {
  constructor(SVG_NS) {
    this.dom = document.createElementNS(SVG_NS, "svg");
    this.dom.setAttributeNS(
      null,
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );
    document.body.appendChild(this.dom);
  }
  addChild(path) {
    this.dom.appendChild(path);
  }
  getDom() {
    return this.dom;
  }
}
