export default class Physic {
  constructor() {}
  static ApplyUnitaryVerletIntegration(
    item,
    ellapsedTime,
    gravity,
    pixelsPerMeter
  ) {
    item.x = 2 * item.x - item.prev_x; // No acceleration here
    item.y =
      2 * item.y -
      item.prev_y +
      gravity * ellapsedTime * ellapsedTime * pixelsPerMeter;
  }
  static ApplyUnitaryDistanceRelaxation(item, from, targettedLength) {
    let dx = item.x - from.x;
    let dy = item.y - from.y;
    let dstFrom = Math.sqrt(dx * dx + dy * dy);
    if (dstFrom > targettedLength && dstFrom != 0) {
      item.x -= (dstFrom - targettedLength) * (dx / dstFrom) * 0.5;
      item.y -= (dstFrom - targettedLength) * (dy / dstFrom) * 0.5;
    }
  }
}
