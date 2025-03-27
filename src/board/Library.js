import Card from '../cards/card'
import { INITIAL_DECK } from '../data/data'
import BoardRegion from './BoardRegion'

export default class Library extends BoardRegion {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.setSize()
    this.buildRegion()
  }

  setSize() {
    const { x, y, cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene.board.params

    this.x = x + xPadding
    this.y = y + yPadding * 4 + cardHeight * 3
    this.width = cardWidth
    this.height = cardHeight
    this.color = color
    this.regionName = 'Library'
  }

  addCardBack() {
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

    this.cardBack.setInteractive()

    this.cardBack.on('pointerdown', () => this.drawCard(this))
  }

  addCards() {
    INITIAL_DECK.forEach((cardName) => {
      const card = new Card(this.scene, 0, 0, cardName, 0, -1)
      this.group.add(card)
      this.group.killAndHide(card)
    })
  }

  drawCard() {
    if (!this.group.getLength()) {
      return
    }

    const card = this.group.getFirst()
    const handSize = this.scene.board.hand.group.getLength()
    card.setDisplaySize(
      this.scene.board.params.cardWidth - 2,
      this.scene.board.params.cardHeight - 2
    )
    card.setPosition(
      handSize * this.scene.board.params.cardWidth +
        this.scene.board.params.cardWidth / 2 +
        1,
      this.scene.board.params.cardHeight / 2 + 1
    )
    card.setInteractive({
      draggable: true
    })
    card.active = true
    card.visible = true
    card.orderInHand = handSize
    this.scene.board.hand.group.add(card, true)
    this.scene.board.hand.add(card, true)
    this.group.remove(card)

    // card.on('pointerover', () => {
    //   this.preview
    //     .setTexture(card.name)
    //     .setDisplaySize(
    //       this.cardWidth * 2.5 - 1,
    //       (this.cardWidth * 2.5 - 1) * 1.4
    //     )
    //     .setActive(true)
    //     .setVisible(true)
    //     .setAbove(this.logGraphics)
    // })

    // card.on('pointerout', () => {
    //   this.preview.setActive(false).setVisible(false)
    // })
  }
}
