import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import moment from "moment";
import { drawGrid } from "../utils/drawGrid";
import { Grid } from "../utils/grid";
import { createEventListeners } from "../utils/createEventListeners";
import Button from "react-bootstrap/Button";

const AnimationTest = (props) => {
  const { width, height, cellSizePx, setAlert } = props;
  // , setCellSizePx used to be included for changing grid size.
  // let maxGenerations = generations;
  let [gens, setGens] = useState(0);
  let genRef = useRef(gens);
  let [clickable] = useState(true);
  let [listenerToggle, setListenerToggle] = useState(true);
  let [msDelay, setMsDelay] = useState(150);
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
    let canvas = canvasRef.current;
    drawRef.current.draw(canvas.getContext("2d"), canvasRef.current);
    cells.current.cells = grid.current.thing;
    cells.current.canvas = canvas;

    console.log(cells.current.canvas);
    setListenerToggle(createEventListeners({ ...cells.current }));
    grid.current.drawAll(canvas.getContext("2d"));
  }, []);

  useEffect(() => {
    genRef.current = gens;
  }, [gens]);

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
    console.log(genRef.current);
    setGens(genRef.current + 1);

    newGen();
    // gens += 1;
  };
  const cancelAnimation = useAnimationFrame(moment.now(), doAnimation, msDelay);

  function newGen() {
    let queueToKill = [];
    let queueToRes = [];
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
          }
        } else {
          if (livingNeighbors === 3) {
            queueToRes.push(grid.current.thing[thisCell.x][thisCell.y]);
          }
        }
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
  }

  /**
   * Render the canvas
   */
  return (
    <>
      <h1>Generation: {gens}</h1>
      <canvas ref={canvasRef} width={props.width} height={props.height} />{" "}
      <div className="buttonContainer">
        <Button
          className="userButton"
          variant="primary"
          onClick={() => {
            // console.log("starting?");
            cancelAnimation(false);
            listenerToggle[0](false);
            setAlert(``);
          }}
        >
          START
        </Button>{" "}
        <Button
          className="userButton"
          variant="danger"
          onClick={() => {
            // console.log("stopping?");
            cancelAnimation(true);
            // console.log(listenerToggle);
            listenerToggle[0](true);
            setAlert(``);
            genRef.current = 0;

            // setPlay(false);
          }}
        >
          STOP
        </Button>
        <Button
          className="userButton"
          variant="info"
          onClick={() => {
            grid.current.clearAll(canvasRef.current.getContext("2d"));
            setAlert(``);
            cancelAnimation(true);
            // console.log(listenerToggle);
            listenerToggle[0](true);
            setAlert(``);
            genRef.current = 0;
          }}
        >
          CLEAR
        </Button>
        <Button
          className="userButton"
          variant="info"
          onClick={() => {
            setMsDelay(msDelay + 50);
            setAlert(``);
          }}
        >
          SPEED (-)
        </Button>
        <Button
          className="userButton"
          variant="info"
          onClick={() => {
            setMsDelay(msDelay - 50);
            setAlert(``);
          }}
        >
          SPEED (+)
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            genRef.current = 0;

            grid.current.randomize(canvasRef.current.getContext("2d"));
            setAlert(``);
          }}
        >
          RANDOMIZE
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            genRef.current = 0;

            let retObj = false;

            grid.current.getPattern(
              "glider",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          DEMONOID
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            genRef.current = 0;

            let retObj = false;
            retObj = grid.current.getPattern(
              "Spaceship_119P4H1V0",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          SPACESHIP
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "popover",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          POPOVER
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "Spaceship_295P5H1V1",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          MOTHERSHIP
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "volcanoes",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          VOLCANOES
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "puffership",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          PUFFERSHIP
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "orbital",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          ORBITAL
        </Button>
        <Button
          className="userButton"
          onClick={() => {
            let retObj = false;
            genRef.current = 0;
            retObj = grid.current.getPattern(
              "spacetimeTear",
              canvasRef.current.getContext("2d"),
              retObj
            );
            console.log(retObj);
            if (retObj !== false) {
              setAlert(`Structure is too large for your display/viewport!`);
            } else {
              setAlert(``);
            }
          }}
        >
          RIFT
        </Button>
        {/* <br />
          <Button className="userButton"
            onClick={() => {
              //      this.context.clearRect(this.gridX, this.gridY, this.size, this.size);
              grid.current = {};
              canvasRef.current.getContext("2d").clearRect(0, 0, width, height);
              cancelAnimation(true);
              listenerToggle[0](true);
              setCellSizePx(cellSizePx - 2);
              setAlert(``);
            }}
          >
            Grid Density (-)
          </Button>
          <button className="userButton">Grid Density (+)</button> */}
      </div>
    </>
  );
};

export default AnimationTest;
