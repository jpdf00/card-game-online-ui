import Phaser from 'phaser'

export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, cardName, frame, orderInHand) {
    super(scene, x, y, cardName, frame)

    this.name = cardName
    this.orderInHand = orderInHand
  }
}
