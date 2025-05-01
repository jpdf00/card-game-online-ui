import { PARAMS } from '../data/data'
import Battlefield from './Battlefield'
import CommandZone from './CommandZone'
import Exile from './Exile'
import Graveyard from './Graveyard'
import Hand from './Hand'
import Library from './Library'

export default class Board extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, width, height }) {
    super(scene, x, y)
    scene.add.existing(this)

    this.setParams({ width, height })
  }

  setParams({ width, height }) {
    this.width = width * PARAMS.boardWidthScale
    this.height = height * PARAMS.boardHeightScale

    this.cardHeight = this.height * PARAMS.cardScale
    this.cardWidth = this.cardHeight / PARAMS.cardRatio

    this.xPadding =
      this.width *
      ((1 - (this.cardWidth / this.width) * 8) / 3) *
      (1 - PARAMS.cardScale * 4)
    this.yPadding = this.height * ((1 - PARAMS.cardScale * 4) / 5)

    this.params = {
      x: this.x,
      y: this.y,
      boardWidth: this.width,
      boardHeight: this.height,
      cardWidth: this.cardWidth,
      cardHeight: this.cardHeight,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      color: 0xffffff
    }

    // if (this.graphics) {
    //   this.graphics.clear()
    // }

    // this.graphics = new Phaser.GameObjects.Graphics(this.scene)

    // this.graphics.lineStyle(1, 0xff0000, 1)
    // this.graphics.strokeRoundedRect(this.x, this.y, this.width, this.height, 5)

    // this.graphics.fillStyle(0xff0000, 0.1)
    // this.graphics.fillRoundedRect(this.x, this.y, this.width, this.height, 5)

    // this.add(this.graphics)
  }

  createRegions() {
    this.commandZone = new CommandZone(this.scene)
    this.exile = new Exile(this.scene)
    this.graveyard = new Graveyard(this.scene)
    this.library = new Library(this.scene)
    this.battlefield = new Battlefield(this.scene)
    this.hand = new Hand(this.scene)

    this.add(this.commandZone)
    this.add(this.exile)
    this.add(this.graveyard)
    this.add(this.library)
    this.add(this.battlefield)
    this.add(this.hand)

    this.render()
  }

  resize({ width, height }) {
    this.setParams({ width, height })

    this.render()
  }

  render() {
    this.commandZone.render()
    this.exile.render()
    this.graveyard.render()
    this.library.render()
    this.battlefield.render()
    this.hand.render()
  }
}
