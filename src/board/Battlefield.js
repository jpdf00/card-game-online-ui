import BoardRegion from './BoardRegion'

export default class Battlefield extends BoardRegion {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.setSize()
    this.buildRegion()
  }

  setSize() {
    const {
      x,
      y,
      boardWidth,
      cardWidth,
      cardHeight,
      xPadding,
      yPadding,
      color
    } = this.scene.board.params

    this.x = x + xPadding * 2 + cardWidth
    this.y = y + yPadding
    this.width = boardWidth - cardWidth - xPadding * 3
    this.height = cardHeight * 3 + yPadding * 2
    this.color = color
    this.regionName = 'Battlefield'
  }
}
