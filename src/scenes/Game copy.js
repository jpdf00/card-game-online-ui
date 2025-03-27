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
    // this.board.resize({
    //   width: this.game.canvas.width *0.85 / 2 ,
    //   height: this.game.canvas.height / 2
    // })

    this.preview = this.add.image(
      this.canvasWidth - this.cardWidth * 1.25 - 1,
      this.yPadding + this.cardWidth * 1.25 * 1.4,
      ''
    )

    this.preview.setActive(false).setVisible(false)

    // // listener fired when we start dragging
    // this.input.on(
    //   'dragstart',
    //   function (pointer, card) {
    //     // is the card in hand?
    //     if (this.hand.contains(card) || this.battlefield.contains(card)) {
    //       // remove card from hand
    //       this.hand.remove(card)

    //       // bring the card in front
    //       card.setDepth(this.hand.countActive())

    //       // tween to animate the card
    //       this.tweens.add({
    //         targets: card,
    //         angle: 0,
    //         x: pointer.x,
    //         y: pointer.y,
    //         displayWidth: this.cardWidth,
    //         displayHeight: this.cardHeight,
    //         duration: 150
    //       })
    //     }
    //   },
    //   this
    // )

    // // listener fired when we are dragging
    // this.input.on(
    //   'drag',
    //   function (pointer, card) {
    //     // if the card is not in hand and not on the board...
    //     if (!this.hand.contains(card) && !this.battlefield.contains(card)) {
    //       // move the card to pointer position
    //       card.x = pointer.x
    //       card.y = pointer.y
    //     }
    //   },
    //   this
    // )

    // // listener fired when we are dragging and the input leaves the drop zone
    // this.input.on(
    //   'drop',
    //   function (pointer, card) {
    //     card.setDepth(0)

    //     // move the card on its final position
    //     this.tweens.add({
    //       targets: card,
    //       angle: 0,
    //       x: card.x,
    //       y: card.y,
    //       displayWidth: this.cardWidth,
    //       displayHeight: this.cardHeight,
    //       duration: 150,
    //       callbackScope: this,
    //       onComplete: function () {
    //         // add the card to board group
    //         this.battlefield.add(card)

    //         card.setInteractive({
    //           draggable: true
    //         })
    //       }
    //     })
    //   },
    //   this
    // )

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