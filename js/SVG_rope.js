import Physic from "./Physic.js";
import Point from "./Point.js";
// import Group from "./Group.js";
import Path from "./Path.js";
import Circle from "./Circle.js";

export default class SVG_rope {
  constructor(view, origin, options) {
    this.options = options;
    this.view = view;
    this.SVG_NS = "http://www.w3.org/2000/svg";
    this.prev = 0;
    this.mouse = new Point();
    this.origin = origin;

    this.setup();
  }

  setup() {
    this.nbItems = 15;
    this.ropeLength = this.options ? this.options.ropeLength : 500 || 500;
    this.relaxationIterations = 40;
    this.gravity = 9.81;
    this.pixelsPerMeter = 300;
    this.handleId = this.nbItems - 1; // Math.ceil(Math.random() * 3);

    this.items = [];
    // this.view = new Group(this.SVG_NS);

    this.path = new Path(
      {
        // "#E4E6DE"
        strokeColor: `rgb(${Math.random() * 100},0,${Math.random() * 255})`,
        strokeWidth: 1,
      },
      this.SVG_NS
    );
    this.view.addChild(this.path.dom);

    this.handle = new Circle(
      {
        fillColor: "white",
        radius: Math.random() * 4 + 2,
      },
      this.SVG_NS
    );
    this.view.addChild(this.handle.dom);

    for (let i = 0; i < this.nbItems; i++) {
      let x = this.origin.x + ((i * this.ropeLength) / this.nbItems) * 0.1;
      let y = this.origin.y;
      this.items[i] = {
        x: x,
        y: y,
        prev_x: x,
        prev_y: y,
        isPinned: false,
      };
      this.path.add(new Point(x, y));
    }
    this.items[0].isPinned = true;

    //this.draw();
  }

  updateHandle() {
    let segment = this.path.segments[this.handleId];
    let p = segment.point;
    if (this.mouse) {
      let d = this.mouse.getDistance(p);
      if (d < 150) {
        let diff = this.mouse.subtract(p);
        this.items[this.handleId].x += diff.x * 0.9;
        this.items[this.handleId].y += diff.y * 0.9;
      }
    }
  }

  update(delta) {
    let itemLength = this.ropeLength / this.nbItems;
    let ellapsedTime = delta;

    this.updateHandle();

    // Apply verlet integration

    let item;
    let prev_x;
    let prev_y;
    for (let i in this.items) {
      item = this.items[i];
      prev_x = item.x;
      prev_y = item.y;
      if (!item.isPinned) {
        Physic.ApplyUnitaryVerletIntegration(
          item,
          ellapsedTime,
          this.gravity,
          this.pixelsPerMeter
        );
      }
      item.prev_x = prev_x;
      item.prev_y = prev_y;
    }

    // Apply relaxation

    let previous;
    let next;
    for (let it = 0; it < this.relaxationIterations; it++) {
      for (let i in this.items) {
        item = this.items[i];
        if (!item.isPinned) {
          if (i > 0) {
            previous = this.items[i - 1];
            Physic.ApplyUnitaryDistanceRelaxation(item, previous, itemLength);
          }
        }
      }
      for (let i in this.items) {
        item = this.items[this.nbItems - 1 - i];
        if (!item.isPinned) {
          if (i > 0) {
            next = this.items[this.nbItems - i];
            Physic.ApplyUnitaryDistanceRelaxation(item, next, itemLength);
          }
        }
      }
    }
  }

  draw(e) {
    if (e) {
      //   console.log(e);
      const delta = e - this.prev;
      this.prev = e;
      this.update(delta / 1000);

      for (let i in this.items) {
        let item = this.items[i];
        this.path.segments[i].point.x = item.x;
        this.path.segments[i].point.y = item.y;
      }

      this.handle.position = this.path.segments[this.handleId];
      this.handle.update();

      // this.path.update();
      this.path.smooth();
    }

    //requestAnimationFrame(this.draw.bind(this));
  }
}
