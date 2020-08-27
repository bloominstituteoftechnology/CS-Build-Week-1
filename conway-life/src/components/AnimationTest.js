import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import moment from "moment";
import getPixel from "../utils/getPixel";
import setPixel from "../utils/setPixel";
import { drawGrid } from "../utils/drawGrid";
import { Cell } from "../utils/cell";
import { Grid } from "../utils/grid";
import { createEventListeners } from "../utils/createEventListeners";
const AnimationTest = (props) => {
  const { width, height, cellSizePx, generations } = props;
  let maxGenerations = generations;
  let [gens, setGens] = useState(0);
  const canvasRef = useRef(null);
  let cells = [];
  let nX = Math.floor(width / cellSizePx) - 2;
  let nY = Math.floor(height / cellSizePx) - 2;
  let pX = width - nX * cellSizePx;
  let pY = height - nY * cellSizePx;
  let pL = pX / 2;
  let pR = pX / 2;
  let pT = pY / 2;
  let pB = pY / 2;

  let [grid, setGrid] = useState(
    new Grid({
      w: nX,
      l: nY,
      cellSize: cellSizePx,
      context: canvasRef.current,
      pL,
      pT,
    })
  );

  useEffect(() => {
    grid.setUp();
    // console.log("grid is MADE");
    cells = grid.thing;
    let canvas = canvasRef.current;
    draw(canvas.getContext("2d"), canvasRef.current);
    createEventListeners({
      canvas,
      pL,
      pT,
      pR,
      pB,
      height,
      width,
      cellSizePx,
      nX,
      nY,
      cells,
      stopAnimation,
      update,
    });
    grid.drawAll(canvas.getContext("2d"));
  }, []);
  const [stopAnimation, setStopAnimation] = useState(true);
  const draw = (context, canvas) => {
    drawGrid({
      context,
      gridWidth: width,
      gridHeight: height,
      canvas,
      stopAnimation,
      grid,
      s: cellSizePx,
      pL,
      pR,
      pT,
      pB,
      nX,
      nY,
    });
  };
  const firstUpdate = useRef(true);
  function update() {}
  const doAnimation = (elapsedTime) => {
    if (canvasRef === null) {
    }

    let genz = gens;
    setGens(genz + 1);
    const canvas = canvasRef.current; // refers to the ref attribute in render()
    const context = canvas.getContext("2d"); // etc.
    // console.log(canvas);

    newGen();
    gens += 1;
  };
  const cancelAnimation = useAnimationFrame(moment.now(), doAnimation);

  function newGen() {
    let queueToKill = [];
    let queueToRes = [];
    // console.log(
    //   "okay... so here's the cellbuffer before we loop through it ",
    //   cellBuffer
    // );
    // console.log("and here's grid.... ", grid);
    for (const x in grid.thing) {
      for (const y in grid.thing[x]) {
        let thisCell = grid.thing[x][y];

        let neighbors = thisCell.neighbors;
        let livingNeighbors = 0;
        //extract individual X/Y coordinates of all neighbors, wee
        let neighRay = [];
        neighRay.push(neighbors.leftNeigh);
        neighRay.push(neighbors.rightNeigh);
        neighRay.push(neighbors.topNeigh);
        neighRay.push(neighbors.bottomNeigh);
        neighRay.push(neighbors.tLNeigh);
        neighRay.push(neighbors.tRNeigh);
        neighRay.push(neighbors.bLNeigh);
        neighRay.push(neighbors.bRNeigh);

        for (const i in neighRay) {
          let neigh = neighRay[i];
          if (neigh != -1 && neigh.y < grid.l && neigh.x < grid.w) {
            if (grid.thing[neigh.x][neigh.y].alive === true) {
              livingNeighbors += 1;
            }
          }

          //now let's see if you have enough neighbors (or too many)
        }
        if (thisCell.alive === true) {
          if (livingNeighbors < 2 || livingNeighbors > 3) {
            queueToKill.push(grid.thing[thisCell.x][thisCell.y]);

            // grid.thing[thisCell.x][thisCell.y].kill(
            //   canvasRef.current.getContext("2d")
            // );
          }
        } else {
          if (livingNeighbors === 3) {
            queueToRes.push(grid.thing[thisCell.x][thisCell.y]);

            // grid.thing[thisCell.x][thisCell.y].resurrect(
            //   canvasRef.current.getContext("2d")
          }
        }
        // );
        // console.log("he had ", livingNeighbors, " neighbors");
      }
    }

    for (const i in queueToKill) {
      let squareNum = queueToKill[i].squareNum;

      queueToKill[i].kill(canvasRef.current.getContext("2d"));
    }
    for (const i in queueToRes) {
      // let squareNum = queueToKill[i].squareNum;

      // cellsToScan[squareNum] = queueToRes[i];
      queueToRes[i].resurrect(canvasRef.current.getContext("2d"));
    }

    // for (const i in neighborLifeQueue) {
    //   console.log("he's a neighbor");
    //   neighborLifeQueue[i].neighborToLiving = false;
    // }
    // console.log("gonna kill ", queueToKill);
    // console.log("gonna res ", queueToRes);
  }

  /**
   * Render the canvas
   */
  return (
    <>
      <h1>Generation: {gens}</h1>
      <canvas ref={canvasRef} width={props.width} height={props.height} />{" "}
      <button
        onClick={() => {
          // console.log("starting?");
          cancelAnimation(false);
        }}
      >
        START
      </button>{" "}
      <button
        onClick={() => {
          // console.log("stopping?");
          cancelAnimation(true);
          // setPlay(false);
        }}
      >
        STOP
      </button>
      {/* <button
        onClick={() => {
          for (let i = 0; i < 100; i++)
            setTimeout(function () {
              newGen();
            }, 1000);
        }}
      >
        NEXT
      </button>
      <button
        onClick={() => {
          // console.log("readin?");
          // console.log("cells", cells);
          // console.log("celBuffer", cellBuffer);
          // console.log("grid", grid.thing);
        }}
      >
        READIT
      </button> */}
    </>
  );
};

export default AnimationTest;
