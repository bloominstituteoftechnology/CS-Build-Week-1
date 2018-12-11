
// cell Node
class Node {
  constructor(num) {
    this.num = num;
    this.isAlive = false;
    this.isClickable = true;
  }
  makeDead() {
    this.isAlive = false;
  }
  makeAlive() {
    this.isAlive = true;
  }
}



// init 16x16 grid

var currentNodeHolder = ['nada'];
var nextNodeHolder = [];

for (let i = 0; i < 16; i++) {
  nextNodeHolder.push([]);
}

for (let i = 0; i < nextNodeHolder.length; i++) {
  for (let j = 0; j < 16; j++) {
    nextNodeHolder[i].push(new Node(0))
  }
}

console.log(nextNodeHolder.length)
console.log(nextNodeHolder[0].length)

// buffer
console.log('LEN', currentNodeHolder.length)
currentNodeHolder = nextNodeHolder.slice(0);
console.log('LEN', currentNodeHolder.length)



// make grid bigger
// user can add grids functionality

// add new row to beginning and end
let len = nextNodeHolder[0].length;
nextNodeHolder.unshift([])
nextNodeHolder.push([])

// fill in new rows
for (let i = 0; i < len; i++) {
  nextNodeHolder[0].push(new Node())
  nextNodeHolder[nextNodeHolder.length -1].push(new Node())
}

// add new column to beginning and end of each row(includes new rows)
nextNodeHolder.forEach(row => {
  row.push(new Node())
  row.unshift(new Node())
});

console.log(nextNodeHolder.length)
console.log(nextNodeHolder[0].length)

// buffer
console.log('LENADD', currentNodeHolder.length)
currentNodeHolder = nextNodeHolder.slice(0);
console.log('LENADD', currentNodeHolder.length)





/*

0-1, 0-1
0-1, 0
0-1, 0+1

0, 0-1
0, 0
0, 0+1

0+1, 0-1
0+1, 0
0+1, 0+1



0, 0
0, -1
0, +1
-1, -1
-1, 0
-1, +1
+1, -1
+1, 0
+1, +1


------------------
// Before algorithm

1. cells are clickable to toggle
2. user can choose presets, dropdown
3. user can choose how big matrix is - limit 500ish? - test performance .. dropdown?
4. user can start & stop animation, buttons
5. user can clear the grid, button


// algorithm init - when user clicks play

1. make cells un-clickable


2.
-- start animation loop --

play = true;
while (play) {
  all code
}

3.
-- start nested loop, for each--

let len = nextNodeHolder.length;

for (let i = 0; i < len; i++) {
  for (let j = 0; j < len; j++) {
    add the algorithm below
  }
}

check itself - alive or dead
check 8 neighbors - 
If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.

if nextNodeHolder[i][j].isAlive === true {
  let checker = 0;
  nextNodeHolder[i][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i][j+1].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j+1].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j+1].isAlive === true ? checker++ : null
  if checker === 2 || checker === 3 {
    null
  } else {
    nextNodeHolder[i][j].makeDead();
  }
}

if nextNodeHolder[i][j].isAlive === false {
  let checker = 0;
  nextNodeHolder[i][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i][j+1].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j].isAlive === true ? checker++ : null
  nextNodeHolder[i-1][j+1].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j-1].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j].isAlive === true ? checker++ : null
  nextNodeHolder[i+1][j+1].isAlive === true ? checker++ : null
  if checker === 3 {
    nextNodeHolder[i][j].makeAlive();
  } else {
    null
  }
}

--end nested loop--


4.
Buffer - Swap current and next grids
currentNodeHolder = nextNodeHolder.slice(0);

5.
add 1 to generation timer


6.
repeat


7.
-- End Animation loop when user clicks stop --
play = false

----------------------------------------------------------

*need to figure out edge case of OOB nodes when checking neighbors
maybe you can either increase grid size, or wrap static grid, or not consider them at all

// not consider them at all
if nextNodeHolder[i][j].isAlive === false {
  let checker = 0;

  if (!nextNodeHolder[i][j-1]) {
    null
  } else {
    nextNodeHolder[i][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i][j+1]) {
    null
  } else {
    nextNodeHolder[i][j+1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j-1]) {
    null
  } else {
    nextNodeHolder[i-1][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j]) {
    null
  } else {
    nextNodeHolder[i-1][j].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j+1]) {
    null
  } else {
    nextNodeHolder[i-1][j+1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j-1]) {
    null
  } else {
    nextNodeHolder[i+1][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j]) {
    null
  } else {
    nextNodeHolder[i+1][j].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j+1]) {
    null
  } else {
    nextNodeHolder[i+1][j+1].isAlive === true ? checker++ : null
  }
  if checker === 3 {
    nextNodeHolder[i][j].makeAlive();
  } else {
    null
  }
}



// possible add to grid - might be bad performance/crash program due to infinite growth
if nextNodeHolder[i][j].isAlive === false {
  let checker = 0;

  if (!nextNodeHolder[i][j-1]) {
    makeGridBigger();
    nextNodeHolder[i][j-1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i][j+1]) {
    makeGridBigger();
    nextNodeHolder[i][j+1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i][j+1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j-1]) {
    makeGridBigger();
    nextNodeHolder[i-1][j-1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i-1][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j]) {
    makeGridBigger();
    nextNodeHolder[i-1][j].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i-1][j].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i-1][j+1]) {
    makeGridBigger();
    nextNodeHolder[i-1][j+1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i-1][j+1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j-1]) {
    makeGridBigger();
    nextNodeHolder[i+1][j-1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i+1][j-1].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j]) {
    makeGridBigger();
    nextNodeHolder[i+1][j].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i+1][j].isAlive === true ? checker++ : null
  }
  if (!nextNodeHolder[i+1][j+1]) {
    makeGridBigger();
    nextNodeHolder[i+1][j+1].isAlive === true ? checker++ : null
  } else {
    nextNodeHolder[i+1][j+1].isAlive === true ? checker++ : null
  }
  if checker === 3 {
    nextNodeHolder[i][j].makeAlive();
  } else {
    null
  }
}


*need some kind of timer function to speedup/slowdown
done at end of each loop/new state
show timer ui


*you only show currentNodeHolder, and do calculations on nextNodeHolder and swap(buffer)

state = currentNodeHolder
currentNodeHolder = nextNodeHolder.slice(0);
state = currentNodeHolder





** display maybe, no canvas

function App() {
  return (
    <div className="App">
      {currentNodeHolder.map((row, index) => {
        return (
          <div>
            {currentNodeHolder[index].map(col => {
              return (
                <span>{col.isAlive ? <span> 1 </span> : <span> 0 </span>}</span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}


*/

