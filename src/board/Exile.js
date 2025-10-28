import BoardRegion from './BoardRegion'

export default class Exile extends BoardRegion {
  constructor(scene, board, x = 0, y = 0) {
    super(scene, x, y)

    this.setSize(board)
    this.buildRegion(board)
  }

  setSize(board) {
    const { cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene[`board${board}`].params

    this.x = xPadding
    this.y = yPadding * 2 + cardHeight
    this.width = cardWidth
    this.height = cardHeight
    this.color = color
    this.regionName = 'Exile'
  }
}
