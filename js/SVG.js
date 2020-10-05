import Group from "./Group.js";
import Point from "./Point.js";
import SVG_rope from "./SVG_rope.js";

class SVG {
  constructor() {
    // SUPER IMPORTANT !!
    this.SVG_NS = "http://www.w3.org/2000/svg";
    this.ropeNumber = 250;
    this.ropes = [];
    this.mouse = new Point(2000, 2000);
    this.setup();
  }
  setup() {
    document.addEventListener("mousemove", this.mousemove.bind(this));
    document.addEventListener("mousedown", this.mousedown.bind(this));
    document.addEventListener("mouseup", this.mouseup.bind(this));
    document.addEventListener("touchmove", this.mousemove.bind(this));
    this.view = new Group(this.SVG_NS);
    const gap = window.innerWidth / this.ropeNumber;
    for (let i = 0; i < this.ropeNumber; i++) {
      this.ropes.push(
        new SVG_rope(
          this.view,
          new Point(gap * i + gap / 2, window.innerHeight),
          {
            ropeLength: 700 + (400 - Math.random() * 800),
          }
        )
      );
    }

    this.draw();
  }
  draw(e) {
    for (const rope of this.ropes) {
      rope.mouse = this.mouse;
      rope.draw(e);
    }
    requestAnimationFrame(this.draw.bind(this));
  }
  mousemove(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.changedTouches) {
      this.mouse.point.x = e.changedTouches[0].pageX;
      this.mouse.point.y = e.changedTouches[0].pageY;
    } else {
      this.mouse.point.x = e.clientX;
      this.mouse.point.y = e.clientY;
    }
  }
  mousedown(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log("down");
    // this.view.fullySelected = true;
  }
  mouseup(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log("up");
    // this.view.fullySelected = false;
  }
}

window.onload = () => {
  new SVG();
};
