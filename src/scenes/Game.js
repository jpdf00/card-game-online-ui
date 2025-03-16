import { Scene } from 'phaser'
import Card from '../cards/card'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  Init() {}

  create() {
    const INITIAL_DECK = [
      'Sol Ring',
      'Arcane Signet',
      'Thought Vessel',
      'Mind Stone'
    ]
    this.setParams()
    this.preview = this.add.image(
      this.canvasWidth - this.cardWidth * 1.25 - 1,
      this.yPadding + this.cardWidth * 1.25 * 1.4,
      ''
    )
    this.preview.setActive(false).setVisible(false)

    this.commandZoneGraphics = this.add.graphics()
    this.exileGraphics = this.add.graphics()
    this.graveyardGraphics = this.add.graphics()
    this.libraryGraphics = this.add.graphics()
    this.battlefieldGraphics = this.add.graphics()
    this.handGraphics = this.add.graphics()
    this.logGraphics = this.add.graphics()

    this.commandZoneLabel = this.add.text(0, 0, 'Command\nZone', {
      color: '#ffffff',
      align: 'center',
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    })

    this.exileLabel = this.add.text(0, 0, 'Exile', {
      color: '#ffffff',
      align: 'center',
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    })

    this.graveyardLabel = this.add.text(0, 0, 'Graveyard', {
      color: '#ffffff',
      align: 'center',
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    })

    this.libraryLabel = this.add.text(0, 0, 'Library', {
      color: '#ffffff',
      align: 'center',
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    })

    // Adds Library as a group
    this.library = this.add.group()
    this.hand = this.add.group()
    this.battlefield = this.add.group()
    this.graveyard = this.add.group()

    INITIAL_DECK.forEach((cardName) => {
      const card = new Card(this, 0, 0, cardName, 0, -1)
      this.library.add(card)
      this.library.killAndHide(card)
    })

    this.cardBack = this.add.image(0, 0, 'mtg_card_back')

    this.cardBack.setInteractive()
    this.cardBack.on('pointerdown', () => this.drawCard(this))

    this.createBoard()

    this.zone = this.add.zone(650, 460, 800, 200)
    this.zone.setRectangleDropZone(800, 200)

    // listener fired when we start dragging
    this.input.on(
      'dragstart',
      function (pointer, card) {
        // is the card in hand?
        if (this.hand.contains(card) || this.battlefield.contains(card)) {
          // remove card from hand
          this.hand.remove(card)

          // bring the card in front
          card.setDepth(this.hand.countActive())

          // tween to animate the card
          this.tweens.add({
            targets: card,
            angle: 0,
            x: pointer.x,
            y: pointer.y,
            displayWidth: this.cardWidth,
            displayHeight: this.cardHeight,
            duration: 150
          })
        }
      },
      this
    )

    // listener fired when we are dragging
    this.input.on(
      'drag',
      function (pointer, card) {
        // if the card is not in hand and not on the board...
        if (!this.hand.contains(card) && !this.battlefield.contains(card)) {
          // move the card to pointer position
          card.x = pointer.x
          card.y = pointer.y
        }
      },
      this
    )

    // listener fired when we are dragging and the input leaves the drop zone
    this.input.on(
      'drop',
      function (pointer, card) {
        card.setDepth(0)

        // move the card on its final position
        this.tweens.add({
          targets: card,
          angle: 0,
          x: card.x,
          y: card.y,
          displayWidth: this.cardWidth,
          displayHeight: this.cardHeight,
          duration: 150,
          callbackScope: this,
          onComplete: function () {
            // add the card to board group
            this.battlefield.add(card)

            card.setInteractive({
              draggable: true
            })
          }
        })
      },
      this
    )

    this.scale.on('resize', () => {
      this.setParams()

      this.createBoard()
    })

    this.input.once('pointerdown', () => {
      // this.scene.start('GameOver')
    })
  }

  setParams() {
    this.cardScale = 0.2
    this.cardRatio = 1.4

    this.canvasHeight = this.game.canvas.height
    this.canvasWidth = this.game.canvas.width

    this.cardHeight = this.canvasHeight * this.cardScale
    this.cardWidth = this.cardHeight / this.cardRatio

    this.yPadding = this.canvasHeight * 0.04
    this.xPadding = this.canvasWidth * 0.02
  }

  drawCard() {
    if (!this.library.getLength()) {
      return
    }

    const card = this.library.getFirst()
    card.setDisplaySize(this.cardWidth, this.cardHeight)
    card.setPosition(
      this.hand.getLength() * this.cardWidth +
        this.cardWidth * 1.5 +
        this.xPadding * 2,
      this.cardHeight * 3.5 + this.yPadding * 4
    )
    card.setInteractive({
      draggable: true
    })
    card.orderInHand = this.hand.getLength()
    card.active = true
    card.visible = true
    this.hand.add(card, true)
    this.library.remove(card)

    card.on('pointerover', () => {
      this.preview
        .setTexture(card.name)
        .setDisplaySize(
          this.cardWidth * 2.5 - 1,
          (this.cardWidth * 2.5 - 1) * 1.4
        )
        .setActive(true)
        .setVisible(true)
        .setAbove(this.logGraphics)
    })

    card.on('pointerout', () => {
      this.preview.setActive(false).setVisible(false)
    })
  }

  createBoard() {
    this.createCommandZone()
    this.createExile()
    this.createGraveyard()
    this.createLibrary()
    this.createBattlefield()
    this.createHand()
    this.createLog()
  }

  createCommandZone() {
    this.commandZoneGraphics.clear()

    this.commandZoneGraphics.lineStyle(1, 0xffffff, 0.85)
    this.commandZoneGraphics.fillStyle(0xffffff, 0.1)

    this.commandZoneGraphics.strokeRoundedRect(
      this.xPadding - 1,
      this.yPadding - 1,
      this.cardWidth + 2,
      this.cardHeight + 2,
      5
    )
    this.commandZoneGraphics.fillRoundedRect(
      this.xPadding,
      this.yPadding,
      this.cardWidth,
      this.cardHeight,
      5
    )

    this.commandZoneLabel.setPosition(
      this.xPadding + this.cardWidth / 2 - this.commandZoneLabel.width / 2,
      this.yPadding + this.cardHeight / 2 - this.commandZoneLabel.height / 2
    )
  }

  createExile() {
    this.exileGraphics.clear()

    this.exileGraphics.lineStyle(1, 0xffffff, 0.85)
    this.exileGraphics.fillStyle(0xffffff, 0.1)

    this.exileGraphics.strokeRoundedRect(
      this.xPadding - 1,
      this.cardHeight + this.yPadding * 2 - 1,
      this.cardWidth + 2,
      this.cardHeight + 2,
      5
    )
    this.exileGraphics.fillRoundedRect(
      this.xPadding,
      this.cardHeight + this.yPadding * 2,
      this.cardWidth,
      this.cardHeight,
      5
    )

    this.exileLabel.setPosition(
      this.xPadding + this.cardWidth / 2 - this.exileLabel.width / 2,
      this.yPadding * 2 + this.cardHeight * 1.5 - this.exileLabel.height / 2
    )
  }

  createGraveyard() {
    this.graveyardGraphics.clear()

    this.graveyardGraphics.lineStyle(1, 0xffffff, 0.85)
    this.graveyardGraphics.fillStyle(0xffffff, 0.1)

    this.graveyardGraphics.strokeRoundedRect(
      this.xPadding - 1,
      this.cardHeight * 2 + this.yPadding * 3 - 1,
      this.cardWidth + 2,
      this.cardHeight + 2,
      5
    )
    this.graveyardGraphics.fillRoundedRect(
      this.xPadding,
      this.cardHeight * 2 + this.yPadding * 3,
      this.cardWidth,
      this.cardHeight,
      5
    )

    this.graveyardLabel.setPosition(
      this.xPadding + this.cardWidth / 2 - this.graveyardLabel.width / 2,
      this.yPadding * 3 + this.cardHeight * 2.5 - this.graveyardLabel.height / 2
    )
  }

  createLibrary() {
    this.libraryGraphics.clear()

    this.libraryGraphics.lineStyle(1, 0xffffff, 0.85)
    this.libraryGraphics.fillStyle(0xffffff, 0.1)

    this.libraryGraphics.strokeRoundedRect(
      this.xPadding - 1,
      this.cardHeight * 3 + this.yPadding * 4 - 1,
      this.cardWidth + 2,
      this.cardHeight + 2,
      5
    )
    this.libraryGraphics.fillRoundedRect(
      this.xPadding,
      this.cardHeight * 3 + this.yPadding * 4,
      this.cardWidth,
      this.cardHeight,
      5
    )

    this.libraryLabel.setPosition(
      this.xPadding + this.cardWidth / 2 - this.libraryLabel.width / 2,
      this.yPadding * 4 + this.cardHeight * 3.5 - this.libraryLabel.height / 2
    )

    this.cardBack.setPosition(
      this.cardWidth / 2 + this.xPadding,
      this.cardHeight * 3 + this.cardHeight / 2 + this.yPadding * 4
    )
    this.cardBack.setDisplaySize(this.cardWidth, this.cardHeight)
  }

  createBattlefield() {
    this.battlefieldGraphics.clear()

    this.battlefieldGraphics.lineStyle(1, 0xffffff, 0.85)
    this.battlefieldGraphics.fillStyle(0xffffff, 0.1)

    this.battlefieldGraphics.strokeRoundedRect(
      this.xPadding * 2 + this.cardWidth - 1,
      this.yPadding - 1,
      this.canvasWidth - this.cardWidth * 3.5 - this.xPadding * 3 + 2,
      this.cardHeight * 3 + this.yPadding * 2 + 2,
      5
    )
    this.battlefieldGraphics.fillRoundedRect(
      this.xPadding * 2 + this.cardWidth,
      this.yPadding,
      this.canvasWidth - this.cardWidth * 3.5 - this.xPadding * 3,
      this.cardHeight * 3 + this.yPadding * 2,
      5
    )
  }

  createHand() {
    this.handGraphics.clear()

    this.handGraphics.lineStyle(1, 0xffffff, 0.85)
    this.handGraphics.fillStyle(0xffffff, 0.1)

    this.handGraphics.strokeRoundedRect(
      this.xPadding * 2 + this.cardWidth - 1,
      this.cardHeight * 3 + this.yPadding * 4 - 1,
      this.canvasWidth - this.cardWidth * 3.5 - this.xPadding * 3 + 2,
      this.cardHeight + 2,
      5
    )
    this.handGraphics.fillRoundedRect(
      this.xPadding * 2 + this.cardWidth,
      this.cardHeight * 3 + this.yPadding * 4,
      this.canvasWidth - this.cardWidth * 3.5 - this.xPadding * 3,
      this.cardHeight,
      5
    )
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
