export const TRACK = {
    STRAIGHT: "straight",
    CURVE: "curve",
    START_FINISH: "start_finish",
    START:"start",
    FINISH:"finish"
}

export const TURN = {
    LEFT: "left",
    RIGHT: "right"
}

const roadWidth = 222
const roadLength = 559

const startLength = 200
const finishLength = roadLength - startLength

const scale = 0.3

const innerRadius = 168
const outerRadius = 390
const curveScale = 0.3

export const VALUES = {
    roadWidth, roadLength, scale, innerRadius, outerRadius, curveScale,finishLength,startLength
}

