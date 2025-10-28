import BoardRegion from './BoardRegion'

export default class Battlefield extends BoardRegion {
  constructor(scene, board, x = 0, y = 0) {
    super(scene, x, y)

    this.buildRegion(board)
    this.setSize(board)
  }

  setSize(board) {
    const { boardWidth, cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene[`board${board}`].params

    this.x = xPadding * 2 + cardWidth
    this.y = yPadding
    this.width = boardWidth - cardWidth - xPadding * 3
    this.height = cardHeight * 3 + yPadding * 2
    this.color = color
    this.regionName = 'Battlefield'
  }
}
