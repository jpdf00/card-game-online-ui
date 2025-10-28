import { PARAMS } from '../data/data'
import Battlefield from './Battlefield'
import CommandZone from './CommandZone'
import Exile from './Exile'
import Graveyard from './Graveyard'
import Hand from './Hand'
import Library from './Library'

export default class Board extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, width, height, totalPlayers, board }) {
    super(scene, x, y)
    scene.add.existing(this)

    this.setParams({ x, y, width, height, totalPlayers, board })
  }

  setParams({ x, y, width, height, totalPlayers, board }) {
    const dimensions = {
      x,
      y,
      width,
      height,
      totalPlayers,
      board
    }

    this.width = this.calculateWidth(dimensions)
    this.height = this.calculateHeight(dimensions)
    this.x = this.calculateX(dimensions)
    this.y = this.calculateY(dimensions)

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
      canvasWidth: width,
      canvasHeight: height,
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
    // this.graphics.strokeRoundedRect(0, 0, this.width, this.height, 5)

    // this.graphics.fillStyle(0xff0000, 0.1)
    // this.graphics.fillRoundedRect(0, 0, this.width, this.height, 5)

    // this.add(this.graphics)
  }

  calculateWidth({ width, totalPlayers }) {
    return (width * PARAMS.boardWidthScale) / Math.floor((totalPlayers + 1) / 2)
  }

  calculateHeight({ height, totalPlayers }) {
    if (totalPlayers === 1) {
      return height * PARAMS.boardHeightScale
    }

    return (height * PARAMS.boardHeightScale) / 2
  }

  calculateX({ x, width, totalPlayers, board }) {
    return x + (width * PARAMS.boardWidthScale) / Math.floor((totalPlayers + 1) / 2) * Math.floor((board - 1) / 2)
  }

  calculateY({ y, height, totalPlayers, board }) {
    if (totalPlayers === 1 || board % 2 === 0) {
      return y
    }

    if (totalPlayers % 2 === 1 && board === totalPlayers) {
      return height / 4
    }

    return height / 2
  }

  createRegions(board) {
    this.commandZone = new CommandZone(this.scene, board)
    this.exile = new Exile(this.scene, board)
    this.graveyard = new Graveyard(this.scene, board)
    this.library = new Library(this.scene, board)
    this.battlefield = new Battlefield(this.scene, board)
    this.hand = new Hand(this.scene, board)

    this.add(this.commandZone)
    this.add(this.exile)
    this.add(this.graveyard)
    this.add(this.library)
    this.add(this.battlefield)
    this.add(this.hand)

    this.render(board)
  }

  resize(dimensions) {
    this.setParams(dimensions)

    this.render(dimensions.board)
  }

  render(board) {
    this.commandZone.render(board)
    this.exile.render(board)
    this.graveyard.render(board)
    this.library.render(board)
    this.battlefield.render(board)
    this.hand.render(board)
  }
}
