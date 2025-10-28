import Card from '../cards/card'
import { INITIAL_DECK } from '../data/data'
import BoardRegion from './BoardRegion'

export default class Library extends BoardRegion {
  constructor(scene, board, x = 0, y = 0) {
    super(scene, x, y)

    this.buildRegion(board)
    this.setSize(board)
  }

  setSize(board) {
    const { cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene[`board${board}`].params

    this.x = xPadding
    this.y = yPadding * 4 + cardHeight * 3
    this.width = cardWidth
    this.height = cardHeight
    this.color = color
    this.regionName = 'Library'

    if (this.cardBack) {
      this.cardBack.setPosition(this.width / 2, this.height / 2)

      this.cardBack.setDisplaySize(this.width, this.height)
    }
  }

  addCardBack(board) {
    if (this.cardBack) {
      this.remove(this.cardBack, true)
    }

    this.cardBack = new Phaser.GameObjects.Image(
      this.scene,
      0,
      0,
      'mtg_card_back'
    )

    this.cardBack.setPosition(this.width / 2, this.height / 2)

    this.cardBack.setDisplaySize(this.width, this.height)

    this.add(this.cardBack)

    if (board === 1) {
      this.cardBack.setInteractive()

      this.cardBack.on('pointerdown', () => this.drawCard(this, board))
    }
  }

  addCards() {
    INITIAL_DECK.forEach((cardName) => {
      const card = new Card(this.scene, 0, 0, cardName, 0, -1)
      this.group.add(card)
      this.group.killAndHide(card)
    })
  }

  drawCard(myVar, board) {
    if (!this.group.getLength()) {
      return
    }

    const card = this.group.getFirst()

    const handSize = this.scene[`board${board}`].hand.group.getLength()

    card.setDisplaySize(
      this.scene[`board${board}`].params.cardWidth - 2,
      this.scene[`board${board}`].params.cardHeight - 2
    )

    card.setPosition(
      handSize * this.scene[`board${board}`].params.cardWidth +
        this.scene[`board${board}`].params.cardWidth / 2 +
        1,
      this.scene[`board${board}`].params.cardHeight / 2 + 1
    )

    card.setInteractive({
      draggable: true
    })

    card.active = true
    card.visible = true
    card.orderInHand = handSize
    this.scene[`board${board}`].hand.group.add(card, true)
    this.scene[`board${board}`].hand.add(card, true)
    this.scene[`board${board}`].hand.scrollableArea.add(card, true)
    this.group.remove(card)

    card.on('pointerover', () => {
      const canvasWidth = this.scene[`board${board}`].params.canvasWidth

      this.scene.preview
        .setTexture(card.name)
        .setDisplaySize(canvasWidth * 0.125, canvasWidth * 0.125 * 1.4)
        .setActive(true)
        .setVisible(true)
      // .setAbove(this.logGraphics)
    })

    card.on('pointerout', () => {
      this.scene.preview.setActive(false).setVisible(false)
    })
  }
}
