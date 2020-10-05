export default class Recangle {
  constructor(options, SVG_NS) {
    this.fillColor = options.fillColor || "white";
    this.width = options.width || window.innerWidth;
    this.height = options.height || window.innerHeight;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.dom = document.createElementNS(SVG_NS, "rect");
    this.dom.setAttributeNS(null, "width", this.width);
    this.dom.setAttributeNS(null, "height", this.height);
    this.dom.setAttributeNS(null, "x", this.x);
    this.dom.setAttributeNS(null, "y", this.y);
    this.dom.setAttributeNS(null, "style", "fill:" + this.fillColor);
  }
}
