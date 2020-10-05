import Point from "./Point.js";
export default class Circle {
  constructor(options, SVG_NS) {
    this.fillColor = options.fillColor || "black";
    this.radius = options.radius || 5;
    this.strokeColor = options.strokeColor || "black";
    this.strokeWidth = options.strokeWidth || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.dom = document.createElementNS(SVG_NS, "circle");
    // cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"
    this.position = new Point(this.x, this.y);
    // console.log(this.position);
    this.dom.setAttributeNS(null, "r", this.radius);
    this.dom.setAttributeNS(null, "stroke", this.strokeColor);
    this.dom.setAttributeNS(null, "stroke-width", this.strokeWidth);
    this.dom.setAttributeNS(null, "fill", this.fillColor);
    this.update();
  }
  update() {
    this.dom.setAttributeNS(null, "cx", this.position.point.x);
    this.dom.setAttributeNS(null, "cy", this.position.point.y);
  }
}
