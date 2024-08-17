/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/
/////
const Player = "p"

const Wall = "w"

const Spike1 = "z"
const Spike2 = "x"

const SpikeSprites = [Spike1, Spike2]
setLegend(
  [ Player, bitmap`
................
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCC0...
...0C0C0CC0C0...
...0000000000...
...0023003200...
...0000000000...
...0030000300...
...0030000300...
...0033333300...
...0000000000...
................` ],
  [ Wall, bitmap`
0000000000000000
00............00
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
00............00
0000000000000000` ],
  
  [ Spike1, bitmap`
................
................
................
................
................
................
................
................
................
................
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..` ],
  [ Spike2, bitmap`
................
................
................
................
................
................
................
..........D.....
.........DDDD...
........DD.DDD..
.DDD..DD44.D4D..
.D.D444D444.4.44
.4D.4444444444..
44D4.4D4D4.D44D.
44444.44D44....D
.DDDDDDD4..DDDDD` ],
)
setSolids([Player, Wall])

setMap(map`
wwwwwwwwww
wwwwwwwwww
..........
..........
..........
..........
..........
.p..z.....
wwwwwwwwww
wwwwwwwwww`)
/////

/////
const RandInt = (max) => {
  return Math.floor(Math.random() * max)
}
/////

let gameTime = 0
setInterval(() => gameTime += 1, 1000)

const GetPlayer = () => getFirst(Player)

const CheckSpikeCollision = () => {
  const plr = GetPlayer()
  if (!plr) {return}
  
  let sprites = getTile(plr.x, plr.y)
  if (!sprites) {return}

  sprites = sprites.filter(sprite => SpikeSprites.indexOf(sprite.type) !== -1)
  if (sprites.length === 0) {return}

  plr.remove()
  addText(`You lose!\nTime: ${gameTime}s`, {
    x: 6,
    y: 7,
    color: color`3`
  })
}

const xBounds = [-1, 9]
const yBounds = [2, 7]

const CreateSpike = () => addSprite(xBounds[1], yBounds[1], SpikeSprites[RandInt(SpikeSprites.length)])

const createSpike = () =>
  setTimeout(() => {
    CreateSpike()
    createSpike()
  }, (RandInt(4) * 1000) + 1000)

setTimeout(() => {
  CreateSpike()
  createSpike()
}, 1500)

const TickLevel = () => {
  for (let x = xBounds[0]; x <= xBounds[1]; x++) {
    for (let y = yBounds[0]; y <= yBounds[1]; y++) {
      const nextTiles = getTile(x + 1, y + 1)
      if (!nextTiles || nextTiles.length === 0) {continue}

      const tile = nextTiles[0]
      if (SpikeSprites.indexOf(tile.type) === -1) {continue}

      const atEdge = tile.x === xBounds[0] + 1
      tile.x -= 1

      if (atEdge && tile.x === xBounds[0] + 1) {
        tile.remove()
      }
    }
  }

  CheckSpikeCollision()
}

setInterval(TickLevel, 400)

let canJump = true
const JumpPlayer = () => {
  if (!canJump) {return}
  const plr = GetPlayer()
  if (!plr) {return}
  
  canJump = false
  plr.y -= 1

  setTimeout(() => {
    plr.y += 1
    canJump = true
  }, 1000)
}

onInput("w", JumpPlayer)
