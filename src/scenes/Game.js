import { Scene } from 'phaser'
import Board from '../board/Board'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  Init() {}

  create() {
    const boardArgs = {
      scene: this,
      x: 0,
      y: 0,
      width: this.game.canvas.width,
      height: this.game.canvas.height
    }

    this.board = new Board(boardArgs)

    this.board.createRegions()

    this.scale.on('resize', (canvasSize) => {
      this.board.resize(canvasSize)
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
