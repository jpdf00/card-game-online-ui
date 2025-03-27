import BoardRegion from './BoardRegion'

export default class Graveyard extends BoardRegion {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.setSize()
    this.buildRegion()
  }

  setSize() {
    const { x, y, cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene.board.params

    this.x = x + xPadding
    this.y = y + yPadding * 3 + cardHeight * 2
    this.width = cardWidth
    this.height = cardHeight
    this.color = color
    this.regionName = 'Graveyard'
  }
}
