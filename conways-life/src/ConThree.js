import React from 'react'
import './index.css'
//import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap'
import * as THREE from 'three'


// var grid;
// var gridold;
// var gridmax;

// function initGrid() {
//   gridmax = 100;
//   grid = new Array(gridmax);
//   for (var i = 0; i < gridmax; i++) {
//     grid[i] = new Array(gridmax);
//     for (var j = 0; j < gridmax; j++) {
//       grid[i][j] = false;
//     }
//   }
// }

// function seedLife() {
//     var h = gridmax / 2;
//     grid[h][h - 1] = true;
//     grid[h][h] = true;
//     grid[h][h + 1] = true;
//     grid[h - 1][h] = true;
//     grid[h + 1][h - 1] = true;
// }

// function stepConway() {
//     gridold = grid;
//     initGrid();
//     for (var i = 1; i < gridmax - 1; i++) {
//       for (var j = 1; j < gridmax - 1; j++) {
//         var neighbours = 0;
  
//         if (gridold[i - 1][j - 1]) neighbours++;
//         if (gridold[i][j - 1]) neighbours++;
//         if (gridold[i + 1][j - 1]) neighbours++;
  
//         if (gridold[i - 1][j]) neighbours++;
//         if (gridold[i + 1][j]) neighbours++;
  
//         if (gridold[i - 1][j + 1]) neighbours++;
//         if (gridold[i][j + 1]) neighbours++;
//         if (gridold[i + 1][j + 1]) neighbours++;
  
//         grid[i][j] = (neighbours === 3) || 
//           ((neighbours === 2) && gridold[i][j]);
//       }
//     }
//   }



// const ConThree = () => {
//     initGrid()
//     seedLife()
//     stepConway()
//     return (
//       null
//     )
// }


class ConThree extends React.Component {
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}


export default ConThree