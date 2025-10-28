import { Scene } from 'phaser'
import Board from '../board/Board'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  Init() {}

  create() {
    const totalPlayers = 6

    const boardArgs = {
      scene: this,
      x: 0,
      y: 0,
      width: this.game.canvas.width,
      height: this.game.canvas.height,
      totalPlayers
    }

    let board = 1

    do {
      boardArgs.board = board

      this[`board${board}`] = new Board(boardArgs)

      this[`board${board}`].createRegions(board)

      board += 1
    } while (board <= totalPlayers)

    const previewX =
      this.game.canvas.width -
      this.game.canvas.width * 0.125 +
      (this.game.canvas.width * 0.125) / 2

    const previewY = (this.game.canvas.width * 0.125 * 1.4) / 2

    this.preview = this.add.image(previewX, previewY, '')

    this.preview.setActive(false).setVisible(false)

    this.scale.on('resize', (canvasSize) => {
      const { width, height } = canvasSize

      const previewX = width - width * 0.125 + (width * 0.125) / 2

      const previewY = (width * 0.125 * 1.4) / 2

      this.preview.setX(previewX)
      this.preview.setY(previewY)

      const boardArgsResize = { x: 0, y: 0, width, height, totalPlayers }

      board = 1

      do {
        boardArgsResize.board = board

        this[`board${board}`].resize(boardArgsResize)

        board += 1
      } while (board <= totalPlayers)
    })

    // this.input.once('pointerdown', () => {
    //   // this.scene.start('GameOver')
    // })
  }

  createLog() {
    this.logGraphics.clear()

    this.logGraphics.lineStyle(1, 0xffffff, 0.85)
    this.logGraphics.fillStyle(0x000000, 0.1)

    this.logGraphics.strokeRoundedRect(
      this.canvasWidth - this.cardWidth * 2.5 - 2,
      this.yPadding - 1,
      this.cardWidth * 2.5 + 1,
      this.cardHeight * 3 + this.yPadding * 2 + 2,
      5
    )
    this.logGraphics.fillRoundedRect(
      this.canvasWidth - this.cardWidth * 2.5,
      this.yPadding,
      this.cardWidth * 2.5,
      this.cardHeight * 3 + this.yPadding * 2,
      5
    )
  }

  update() {}
}
