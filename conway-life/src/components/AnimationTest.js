import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import moment from "moment";
import { drawGrid } from "../utils/drawGrid";
import { Grid } from "../utils/grid";
import { createEventListeners } from "../utils/createEventListeners";
const AnimationTest = (props) => {
  const { width, height, cellSizePx } = props;
  // let maxGenerations = generations;
  let [gens, setGens] = useState(0);
  let [clickable] = useState(true);
  let [listenerToggle, setListenerToggle] = useState(true);
  let [msDelay, setMsDelay] = useState(0);
  const canvasRef = useRef(null);
  let nX = Math.floor(width / cellSizePx) - 2;
  let nY = Math.floor(height / cellSizePx) - 2;
  let pX = width - nX * cellSizePx;
  let pY = height - nY * cellSizePx;
  let pL = pX / 2;
  let pR = pX / 2;
  let pT = pY / 2;
  let pB = pY / 2;

  let grid = useRef(
    new Grid({
      w: nX,
      l: nY,
      cellSize: cellSizePx,
      context: canvasRef.current,
      pL,
      pT,
    })
  );
  const cells = useRef({
    // cells: grid.current.thing,
    pL,
    pT,
    pR,
    pB,
    height,
    width,
    cellSizePx,
    nX,
    nY,
    update,
    clickable,
  });
  const drawRef = useRef({ draw });
  useEffect(() => {
    grid.current.setUp();
    // console.log("grid is MADE");
    let canvas = canvasRef.current;
    drawRef.current.draw(canvas.getContext("2d"), canvasRef.current);
    cells.current.cells = grid.current.thing;
    cells.current.canvas = canvas;

    console.log(cells.current.canvas);
    setListenerToggle(createEventListeners({ ...cells.current }));
    grid.current.drawAll(canvas.getContext("2d"));
  }, []);

  function draw(context, canvas) {
    drawGrid({
      context,
      gridWidth: width,
      gridHeight: height,
      canvas,
      grid,
      s: cellSizePx,
      pL,
      pR,
      pT,
      pB,
      nX,
      nY,
    });
  }
  function update() {}
  const doAnimation = (elapsedTime) => {
    if (canvasRef === null) {
    }

    let genz = gens;
    setGens(genz + 1);

    // console.log(canvas);

    newGen();
    gens += 1;
  };
  const cancelAnimation = useAnimationFrame(moment.now(), doAnimation, msDelay);

  function newGen() {
    let queueToKill = [];
    let queueToRes = [];
    // console.log(
    //   "okay... so here's the cellbuffer before we loop through it ",
    //   cellBuffer
    // );
    // console.log("and here's grid.... ", grid);
    for (const x in grid.current.thing) {
      for (const y in grid.current.thing[x]) {
        let thisCell = grid.current.thing[x][y];

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
          if (
            neigh !== -1 &&
            neigh.y < grid.current.l &&
            neigh.x < grid.current.w
          ) {
            if (grid.current.thing[neigh.x][neigh.y].alive === true) {
              livingNeighbors += 1;
            }
          }

          //now let's see if you have enough neighbors (or too many)
        }
        if (thisCell.alive === true) {
          if (livingNeighbors < 2 || livingNeighbors > 3) {
            queueToKill.push(grid.current.thing[thisCell.x][thisCell.y]);

            // grid.current.thing[thisCell.x][thisCell.y].kill(
            //   canvasRef.current.getContext("2d")
            // );
          }
        } else {
          if (livingNeighbors === 3) {
            queueToRes.push(grid.current.thing[thisCell.x][thisCell.y]);

            // grid.current.thing[thisCell.x][thisCell.y].resurrect(
            //   canvasRef.current.getContext("2d")
          }
        }
        // );
        // console.log("he had ", livingNeighbors, " neighbors");
      }
    }

    for (const i in queueToKill) {
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
          listenerToggle[0](false);
        }}
      >
        START
      </button>{" "}
      <button
        onClick={() => {
          // console.log("stopping?");
          cancelAnimation(true);
          // console.log(listenerToggle);
          listenerToggle[0](true);

          // setPlay(false);
        }}
      >
        STOP
      </button>
      <button
        onClick={() => {
          grid.current.clearAll(canvasRef.current.getContext("2d"));
        }}
      >
        CLEAR
      </button>
      <button
        onClick={() => {
          setMsDelay(msDelay + 100);
        }}
      >
        'crease
      </button>
    </>
  );
};

export default AnimationTest;
