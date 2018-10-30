import React from 'react'
import './index.css'
//import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap'
import * as THREE from 'three'


class ConThree extends React.Component {
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.lastStep = Date.now()
    this.mouseX = 0
    this.mouseY = 0

    //const windowHalfX = window.innerWidth / 2;
    //const windowHalfY = window.innerHeight / 2;

    // ADD GRID
    const size = this.gridmax * 25, step = 50;

    const linegeometry = new THREE.Geometry();

    for (var i = -size; i <= size; i += step) {
      linegeometry.vertices.push(new THREE.Vector3(-size, 0, i));
      linegeometry.vertices.push(new THREE.Vector3(size, 0, i));

      linegeometry.vertices.push(new THREE.Vector3(i, 0, -size));
      linegeometry.vertices.push(new THREE.Vector3(i, 0, size));
    }

    // ADD CUBES
    this.cubegeometry = new THREE.CubeGeometry(50, 50, 50);
    this.cubematerial = new THREE.MeshLambertMaterial({ 
    color: 0xffffff, 
    shading: THREE.FlatShading, 
    overdraw: true 
    });

    // ADD LIGHTS
    this.ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
    const directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();

    //ADD SCENE
    //this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4

    //ADD RENDERER
    //this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer = new THREE.CanvasRenderer()
    //this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    // document.addEventListener(
    //   'mousemove', onDocumentMouseMove, false);
  
    // window.addEventListener(
    //   'resize', onWindowResize, false);
  

    //ADD CUBE
    //const geometry = new THREE.BoxGeometry(1, 1, 1)
    //const material = new THREE.MeshBasicMaterial({ color: 'firebrick'     })
    //const material2 = new THREE.MeshBasicMaterial({color: 'green'})
    //this.cube1 = new THREE.Mesh(geometry, material)
    //this.cube2 = new THREE.Mesh(geometry, material2)
    //this.scene.add(this.cube1)
    //this.scene.add(this.cube2)


    // INITIALIZE GRID
    this.initGrid()
    this.seedLife()
    this.stepConway()
    this.animate()

    //this.start()
  }

  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  // CONWAY METHODS
  initGrid = () => {
    this.gridmax = 100;
    this.grid = new Array(this.gridmax);
    for (var i = 0; i < this.gridmax; i++) {
      this.grid[i] = new Array(this.gridmax);
      for (var j = 0; j < this.gridmax; j++) {
        this.grid[i][j] = false;
      }
    }
  }

  seedLife() {
    this.h = this.gridmax / 2;
    this.grid[this.h][this.h - 1] = true;
    this.grid[this.h][this.h] = true;
    this.grid[this.h][this.h + 1] = true;
    this.grid[this.h - 1][this.h] = true;
    this.grid[this.h + 1][this.h - 1] = true;
  }

  stepConway() {
    this.gridold = this.grid;
    this.initGrid();
    for (var i = 1; i < this.gridmax - 1; i++) {
      for (var j = 1; j < this.gridmax - 1; j++) {
        var neighbours = 0;
  
        if (this.gridold[i - 1][j - 1]) neighbours++;
        if (this.gridold[i][j - 1]) neighbours++;
        if (this.gridold[i + 1][j - 1]) neighbours++;
  
        if (this.gridold[i - 1][j]) neighbours++;
        if (this.gridold[i + 1][j]) neighbours++;
  
        if (this.gridold[i - 1][j + 1]) neighbours++;
        if (this.gridold[i][j + 1]) neighbours++;
        if (this.gridold[i + 1][j + 1]) neighbours++;
  
        this.grid[i][j] = (neighbours === 3) || 
          ((neighbours === 2) && this.gridold[i][j]);
      }
    }
  }

  preInit() {
    let container = document.createElement('div');
    document.body.appendChild(container);
  
    let camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 10, 5000);
  
    camera.position.x = 200;
    camera.position.y = 500;
  }

  // onWindowResize = () => {
  //   camera.left = window.innerWidth / -2;
  //   camera.right = window.innerWidth / 2;
  //   camera.top = window.innerHeight / 2;
  //   camera.bottom = window.innerHeight / -2;
  
  //   camera.updateProjectionMatrix();
  
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  // onDocumentMouseMove = (event) => {
  //   mouseX = (event.clientX - windowHalfX);
  //   mouseY = (event.clientY - windowHalfY);
  // }

  // END CONWAY METHODS

  // start = () => {
  //   if (!this.frameId) {
  //     this.frameId = requestAnimationFrame(this.animate)
  //   }
  // }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
  //  this.cube1.rotation.x += 0.01
  //  this.cube1.rotation.y += 0.01
  //  this.cube2.rotation.x -= 0.10
  //  this.cube2.rotation.y -= 0.10
  //  this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
   this.gridRender()
 }

 buildScene = () => {
  this.linematerial = new THREE.LineBasicMaterial({ 
    color: 0x000000, 
    opacity: 0.2 
  });
  this.scene = new THREE.Scene();
  const sceneline = new THREE.Line(this.linegeometry, this.linematerial);
  sceneline.type = THREE.LinePieces;
  this.scene.add(sceneline);
  for (let i = 0; i < this.gridmax; i++) {
    for (let j = 0; j < this.gridmax; j++) {
      if (this.grid[i][j] === true) {
        var cube = new THREE.Mesh(this.cubegeometry, this.cubematerial);
        cube.scale.y = 1;

        cube.position.x = i * 50 - this.gridmax * 25 + 25;
        cube.position.y = 25;
        cube.position.z = j * 50 - this.gridmax * 25 + 25;

        this.scene.add(cube);
      }
    }
  }
  this.scene.add(this.ambientLight);
  this.scene.add(this.directionalLight);
  }

  gridRender = () => {
    if (Date.now() - this.lastStep > 200) {
      this.lastStep = Date.now();
      this.buildScene();
      this.step();
    }
    var timer = Date.now() * 0.00005;
  
    timer += this.mouseX * 0.001;
  
    this.camera.position.x = Math.cos(timer) * 2000;
    this.camera.position.z = Math.sin(timer) * 2000;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 1 + 1000;
    this.camera.lookAt(this.scene.position);
  
    this.directionalLight.position.x = this.camera.position.x;
    this.directionalLight.position.y = this.camera.position.y;
    this.directionalLight.position.z = this.camera.position.z;
    this.directionalLight.position.normalize();
  
    this.renderer.render(this.scene, this.camera);
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