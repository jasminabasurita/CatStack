const onCollision = (player, item) => item.kill()

const cleanSlate = () => {
  func.children.forEach(child => child.kill())
  ifStatement.children.forEach(child => child.kill())
  returnStatement.children.forEach(child => child.kill())

  firstFunc = func.create(100, 50, "func")
  firstFunc.inputEnabled = true
  firstFunc.input.enableDrag(true)
  game.physics.arcade.enable(firstFunc)
  firstFunc.body.immovable = true

  firstIf = ifStatement.create(350, 50, "ifStatement")
  firstIf.inputEnabled = true
  firstIf.input.enableDrag(true)
  game.physics.arcade.enable(firstIf)
  firstIf.body.immovable = true

  firstReturn = returnStatement.create(500, 50, "returnStatement")
  firstReturn.inputEnabled = true
  firstReturn.input.enableDrag(true)
  game.physics.arcade.enable(firstReturn)
  firstReturn.body.immovable = true
}
