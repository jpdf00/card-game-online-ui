import BoardRegion from './BoardRegion'

export default class Hand extends BoardRegion {
  constructor(scene, board, x = 0, y = 0) {
    super(scene, x, y)

    this.buildRegion(board)
    this.setSize(board)
    // this.addContainer(board)
  }

  setSize(board) {
    const { boardWidth, cardWidth, cardHeight, xPadding, yPadding, color } =
      this.scene[`board${board}`].params

    this.x = xPadding * 2 + cardWidth
    this.y = yPadding * 4 + cardHeight * 3
    this.width = boardWidth - cardWidth - xPadding * 3
    this.height = cardHeight
    this.color = color
    this.regionName = 'Hand'

    this.group.children.each((card, index) => {
      card.setDisplaySize(cardWidth - 2, cardHeight - 2)

      card.setPosition(
        index * cardWidth + cardWidth / 2 + 1,
        cardHeight / 2 + 1
      )
    })
  }

  // addContainer(board) {
  //   const { boardWidth, cardWidth, cardHeight, xPadding, yPadding, color } =
  //     this.scene[`board${board}`].params

  //   this.scrollableArea = this.scene.add.container(this.x, this.y)
  //   this.scrollableArea.name = 'Mask'
  //   const maskShape = this.scene.make.graphics()
  //   maskShape.fillStyle(0xff0000)
  //   maskShape.fillRect(this.x, this.y, this.width, this.height) // Adjust position and size as needed
  //   const mask = maskShape.createGeometryMask()
  //   this.scrollableArea.setMask(mask)

  //   this.scene.input.on(
  //     'wheel',
  //     (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
  //       // Adjust the container's Y position based on scroll wheel input
  //       this.scrollableArea.x -= deltaX * 0.5 // Adjust scroll speed

  //       // Clamp the container's position to prevent scrolling out of bounds
  //       const maxScrollX = 0 // Top limit
  //       const minScrollX = -(this.scrollableArea.width - maskShape.width) // Bottom limit
  //       this.scrollableArea.x = Phaser.Math.Clamp(
  //         this.scrollableArea.x,
  //         minScrollX,
  //         maxScrollX
  //       )
  //     }
  //   )
  //   let startX = 0
  //   let startContainerX = 0

  //   this.scene.input.on('pointerdown', (pointer) => {
  //     startX = pointer.x
  //     startContainerX = this.scrollableArea.x
  //   })

  //   this.scene.input.on('pointermove', (pointer) => {
  //     if (pointer.isDown) {
  //       const deltaX = pointer.x - startX
  //       this.scrollableArea.x = startContainerX + deltaX

  //       // Clamp position
  //       const maxScrollX = 0
  //       const minScrollX = -(this.scrollableArea.width - maskShape.width)
  //       this.scrollableArea.x = Phaser.Math.Clamp(
  //         this.scrollableArea.x,
  //         minScrollX,
  //         maxScrollX
  //       )
  //     }
  //   })
  //   const debug = new Phaser.GameObjects.Graphics(this.scene)
  //   debug.lineStyle(2, 0xff0000, 1) // green border
  //   debug.strokeRect(this.x, this.y, this.width, this.height)
  //   this.add(debug)
  // }
}
