import BoardRegion from './BoardRegion'

export default class Exile extends BoardRegion {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.setSize()
    this.buildRegion()
  }

  setSize() {
    const { x, y, cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene.board.params

    this.x = x + xPadding
    this.y = y + yPadding * 2 + cardHeight
    this.width = cardWidth
    this.height = cardHeight
    this.color = color
    this.regionName = 'Exile'
  }
}
