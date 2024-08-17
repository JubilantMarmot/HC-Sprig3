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
..000000000000..` ]
)
setSolids([Player, Wall, Spike1])

setMap(map`
wwwwwwwwww
wwwwwwwwww
..........
..........
..........
..........
..........
p...z.....
wwwwwwwwww
wwwwwwwwww`)
/////

const xBounds = [0, 9]
const yBounds = [2, 7]

const TickLevel = () => {
  for (let x = xBounds[0]; x < xBounds[1]; x++) {
    for (let y = yBounds[0]; y < yBounds[1]; y++) {
      const nextTiles = getTile(x + 1, y + 1)
      if (!nextTiles || nextTiles.length === 0) {continue}

      const tile = nextTiles[0]
      tile.x -= 1

      if (tile.x === xBounds[0]) {
        //tile.remove()
      }
    }
  }
}

setInterval(TickLevel, 1000)

const GetPlayer = () => getFirst(Player)

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
