export default class BoardRegion extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y)
  }

  buildRegion() {
    this.addGroup()
    this.addZone()
    this.addCardBack()
    this.addCards()
  }

  render() {
    this.setSize()
    this.renderGraphics()
  }

  renderGraphics() {
    if (this.graphics) {
      this.graphics.clear()
    }

    this.graphics = new Phaser.GameObjects.Graphics(this.scene)

    this.graphics.lineStyle(1, this.color, 0.85)
    this.graphics.fillStyle(this.color, 0.1)

    this.graphics.strokeRoundedRect(0, 0, this.width, this.height, 5)
    this.graphics.fillRoundedRect(1, 1, this.width - 2, this.height - 2, 5)

    this.add(this.graphics)
    this.addLabel()
  }

  addCardBack() {}

  addCards() {}

  addLabel() {
    if (this.label) {
      this.remove(this.label, true)
    }

    this.label = this.scene.add.text(0, 0, this.regionName, {
      color: '#ffffff',
      align: 'center',
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    })

    this.add(this.label)

    this.label.setPosition(
      this.width / 2 - this.label.width / 2,
      this.height / 2 - this.label.height / 2
    )
  }

  addGroup() {
    if (!this.group) {
      this.group = this.scene.add.group()
    }
  }

  addZone() {
    if (!this.zone) {
      this.zone = this.scene.add.zone(
        this.width / 2,
        this.height / 2,
        this.width,
        this.height
      )
      this.zone.setRectangleDropZone(this.width, this.height)
      this.add(this.zone)
    }
  }
}
