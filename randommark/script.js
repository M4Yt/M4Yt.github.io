"use strict"

// The size of each square in pixels (per side)
const size = 1

// Numbers will be 0-255 for easy colour representation
function newMathRand() {
    return Math.floor(Math.random() * 256)
}

function newCryptRand() {
    let arr = new Uint8Array(1)
    crypto.getRandomValues(arr)
    return arr[0]
}

// Turn the number into a shade of a colour
function makeShadeOfBlue(num) {
    return "#" + num.toString(16).padStart(6,"0")
}

function makeShadeOfGrey(num) {
    // absolute zero is red
    if (num === 0) return "#F00"
    // absolute max is green
    if (num === 255) return "#0F0"
    return "#" +
        num.toString(16).padStart(2,"0") +
        num.toString(16).padStart(2,"0") +
        num.toString(16).padStart(2,"0")
}

function makeShadeOfBlue2(num) {
    return "#" +
        num.toString(16).padStart(2,"0") +
        num.toString(16).padStart(2,"0") +
        "FF"
}

function makeShadeOfRed(num) {
    return "#" + num.toString(16).padStart(2,"0") +
        "0000"
}

// Get the position to draw the next square
function* getNextPos() {
    for (let y = 0; y < rand.height; y += size) {
        for (let x = 0; x < rand.width; x += size) {
            yield [x, y]
        }
    }
}

// Select canvases
const rand = document.querySelector("#canvas")
const randCanvas = rand.getContext("2d")

// Make a position generator
const positionGenerator = getNextPos()

// functions to render each canvas
function renderRand() {
    for (let i = 0; i < navigator.hardwareConcurrency*64; i++) {
        let position = positionGenerator.next()
        if (position.done) {
            let end = new Date()
            let time = end - start
            randCanvas.fillStyle = "white"
            randCanvas.font = "48px sans-serif"
            randCanvas.textAlign = "center"
            randCanvas.fillText(time + "ms", rand.width/2, rand.height/2)
            return
        }
        let colour = makeShadeOfRed(newMathRand())
        let [x, y] = position.value
        randCanvas.fillStyle = colour
        randCanvas.fillRect(x, y, size, size)
    }
    setTimeout(renderRand, 0)
}

const start = new Date()
let count = 0
renderRand()
