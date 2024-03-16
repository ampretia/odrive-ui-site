import Konva from "konva";

import { TURN, VALUES, TRACK } from './constants.js'

import { useDriveStore } from "@/stores/drive.js";

export class DrawTrack {

    constructor(layer, layout, debug = false) {
        this.layer = layer
        this.layout = layout
        this.debug = debug
        this.store = useDriveStore()
    }

    draw() {
        // initial location - where the centre of the firsst track piece will go
        let x = 350
        let y = 400

        // current rotation of the pieces
        let rotation = 0

        // exit vector of the last peice
        let lastExitVector = new Vector(x - 1, y, x, y)

        // for each element taken in suplied order
        for (let i = 0; i < this.layout.track.length; i++) {

            let { newDrawnElement, exitVector, newRotation } = this.getElement(rotation, this.layout.track[i], lastExitVector)
            this.layout.track[i].exitVector=exitVector

            // add the shape to the layer
            this.layer.add(newDrawnElement);

            // if debug add, centre points and the exit vector
            if (this.debug) {
                // add debug points
                this.layer.add(new Konva.Circle({
                    x: exitVector.xo,
                    y: exitVector.yo,
                    radius: 4,
                    fill: 'red',
                }))

                this.layer.add(new Konva.Circle({
                    x: exitVector.xe,
                    y: exitVector.ye,
                    radius: 4,
                    fill: 'blue',
                }))

            }

            rotation = newRotation
            lastExitVector = exitVector
        }
    }

    _calculate_new_centre(lastExitVector, length) {
        let b = lastExitVector.magnitude
        let a = length 
        let s = (a + b) / b

        let x = ((lastExitVector.xe - lastExitVector.xo) * s) + lastExitVector.xo
        let y = ((lastExitVector.ye - lastExitVector.yo) * s) + lastExitVector.yo

        return { x, y }
    }

    /**
     * 
     * Gets the Konva element to draw a straight piece of track
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} rotation 
     * @param {TrackPiece} roadpiece 
     * @returns 
     */
    getStraight(rotation, roadpiece, lastExitVector) {

        // reduce real width down
        let width = VALUES.roadLength * VALUES.scale
        let height = VALUES.roadWidth * VALUES.scale

        // start/finish is different
        let colour = roadpiece.type === TRACK.STRAIGHT ? 'grey' : 'yellow'

        // where to draw this piece based on the previous exit vector
        let { x, y } = this._calculate_new_centre(lastExitVector, width/2)

        // create as a new group as multiple shapes may be overlaid.
        // location, offset and rotation are defined in the groupo
        let newDrawnElement = new Konva.Group({
            x,
            y,
            offsetX: width / 2,
            offsetY: height / 2,
            rotation,
        })

        // main track is rectangle at the origin of the group
        var r = new Konva.Rect({
            width,
            height,
            fill: colour,
            stroke: 'black',
            strokeWidth: 2,
        });

        newDrawnElement.add(r)

        const exitX = (((width / 2) * Math.cos(rotation * Math.PI / 180)) + x)
        const exitY = (((width / 2) * Math.sin(rotation * Math.PI / 180)) + y)

        // exit vector from the origin of the piece to the end, middle of the track
        const exitVector = new Vector(x, y, exitX, exitY)

        return { newDrawnElement, exitVector, newRotation: rotation }
    }

    getStartFinish(rotation, roadpiece, lastExitVector) {

        // reduce real width down
        let width = (roadpiece.type === TRACK.START ? VALUES.startLength : VALUES.finishLength) * VALUES.scale
        let height = VALUES.roadWidth * VALUES.scale

        // start/finish is different
        let colour = 'yellow'
        let { x, y } = this._calculate_new_centre(lastExitVector, width/2)

        // create as a new group as multiple shapes may be overlaid.
        // location, offset and rotation are defined in the groupo
        let newDrawnElement = new Konva.Group({
            x,
            y,
            offsetX: width / 2,
            offsetY: height / 2,
            rotation,
        })

        // main track is rectangle at the origin of the group
        var r = new Konva.Rect({
            width,
            height,
            fill: colour,
            stroke: 'black',
            strokeWidth: 2,
        });

        newDrawnElement.add(r)

        var arrow = new Konva.Arrow({
            points: [width / 4, height / 2, width * 3 / 4, height / 2],
            pointerLength: 10,
            pointerWidth: 5,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4,
        })
        newDrawnElement.add(arrow)


        const exitX = (((width / 2) * Math.cos(rotation * Math.PI / 180)) + x)
        const exitY = (((width / 2) * Math.sin(rotation * Math.PI / 180)) + y)

        // exit vector from the origin of the piece to the end, middle of the track
        const exitVector = new Vector(x, y, exitX, exitY)

        return { newDrawnElement, exitVector, newRotation: rotation }
    }

    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} rotation 
     * @param {TrackPiece} roadpiece 
     * @param {Vector} lastExitVector 
     * @returns 
     */
    getCurve(rotation, roadpiece, lastExitVector) {

        // Values for the track size; will be shown as  konva arc of 90degress
        let ir = VALUES.innerRadius * VALUES.curveScale
        let or = VALUES.outerRadius * VALUES.curveScale
        let angle = 90

        // offset is the centre of the konva shape; 
        // this is defined as the interaction of the two lines
        // leaving the connecting edges perpdendicular to the track edge
        let offset = ir + (VALUES.roadWidth * VALUES.scale * 0.5)

        // to create pieces in all orientations, if the piece is such that a 
        // car would 'be turning to the left' or 'turning to the right' 
        // the actual piece rotation needs to be tweaked; so for 'to the right'
        // cases add 270 to get the correct visual representation
        let tr = roadpiece.turn === TURN.LEFT ? rotation : rotation + 270
        
        let { x, y } = this._calculate_new_centre(lastExitVector, offset)
        
        var arc = new Konva.Arc({
            x,
            y,
            innerRadius: ir,
            outerRadius: or,
            offsetX: offset,
            offsetY: offset,
            angle: angle,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 2,
            rotation: tr
        });

        // calculate the exit vector of the piece 
        // exit pi
        let exitVector;
        let yd = y - lastExitVector.ye
        let xd = lastExitVector.xe - x
        // console.log(`xd=${xd}  yd =${yd}`)

        if (roadpiece.turn === TURN.LEFT) {
            let exitX = x + yd
            let exitY = y + xd
            exitVector = new Vector(x, y, exitX, exitY)
            rotation -= 90
        } else {
            let exitX = x - yd
            let exitY = y - xd
            exitVector = new Vector(x, y, exitX, exitY)
            rotation += 90
        }

        return { newDrawnElement: arc, exitVector, newRotation: rotation };
    }

    getElement(rotation, trackpiece, lastExitVector) {
        if (trackpiece.type === TRACK.STRAIGHT) {
            return this.getStraight(rotation, trackpiece, lastExitVector)
        } else if (trackpiece.type === TRACK.START || trackpiece.type === TRACK.FINISH) {
            return this.getStartFinish(rotation, trackpiece, lastExitVector)
        } else {
            return this.getCurve(rotation, trackpiece, lastExitVector)
        }
    }

}


export class Vector {
    constructor(xo, yo, xe, ye) {
        this.xo = xo
        this.yo = yo
        this.xe = xe
        this.ye = ye

        this.magnitude = (xe - xo)

        let sum = ((xe - xo) ** 2) + ((ye - yo) ** 2)
        if (sum == 0) {
            this.magnitude = 0
        } else {
            this.magnitude = Math.sqrt(sum)
        }
    }
}
