export default class Path {
  constructor(options, SVG_NS) {
    //smooth parameters
    this.smoothing = 0.18;
    //

    this.segments = [];
    this.strokeColor = options.strokeColor;
    this.strokeWidth = options.strokeWidth;
    this.dom = document.createElementNS(SVG_NS, "path");
    this.dom.setAttributeNS(null, "fill", "none");
    this.dom.setAttributeNS(null, "stroke", options.strokeColor);
    this.dom.setAttributeNS(null, "stroke-width", options.strokeWidth);
    this.dom.setAttributeNS(null, "stroke-linecap", "round");
    this.dom.setAttributeNS(null, "d", "M0,0 L100,100");
  }
  add(point) {
    this.segments.push(point);
  }
  smooth() {
    const points = this.segments.map((obj) =>
      Object.values(Object.values(obj)[2])
    );
    // console.log(points);
    const line = this.svgPath(points, window.innerHeight - 100);
    this.dom.setAttributeNS(null, "d", line);
  }

  update() {
    let line = "";
    for (let i = 0; i < this.segments.length; i++) {
      line +=
        (i == 0 ? "M" : " L") +
        this.segments[i].point.x +
        "," +
        this.segments[i].point.y;
    }
    this.dom.setAttributeNS(null, "d", line);
  }

  line(pointA, pointB) {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  }

  controlPoint(current, previous, next, reverse) {
    const p = previous || current;
    const n = next || current;
    const l = this.line(p, n);

    const angle = l.angle + (reverse ? Math.PI : 0);
    const length = l.length * this.smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  }

  bezierCommand(point, i, a) {
    const cps = this.controlPoint(a[i - 1], a[i - 2], point);
    const cpe = this.controlPoint(point, a[i - 1], a[i + 1], true);
    const close = "";
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}${close}`;
  }

  svgPath(points, h) {
    // const d = points.reduce(
    //   (acc, e, i, a) =>
    //     i === 0
    //       ? `M ${a[a.length - 1][0]},${h} L ${e[0]},${h} L ${e[0]},${e[1]}`
    //       : `${acc} ${this.bezierCommand(e, i, a)}`,
    //   ""
    // );
    const d = points.reduce(
      (acc, e, i, a) =>
        i === 0
          ? `M${e[0]},${e[1]} L ${e[0]},${e[1]}`
          : `${acc} ${this.bezierCommand(e, i, a)}`,
      ""
    );
    return d;
    // return `<path d="${d}" class="svg-path" />`;
  }
}
