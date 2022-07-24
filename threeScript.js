import win from 'global'
import * as THREE from 'three'

import fragment from './shaders/fragment.glsl'

let sizes = {w:window.innerWidth,h:window.innerHeight}


export default class Sketch {
  constructor(options){

window.addEventListener('resize',()=>{
sizes.w = window.innerWidth
sizes.h = window.innerHeight
 
  this.camera.aspect = sizes.w/sizes.h

  this.camera.updateProjectionMatrix()


    this.renderer.setSize( sizes.w,sizes.h )

})



    this.renderer = new THREE.WebGLRenderer( { antialias: true } )
    this.renderer.setSize( sizes.w,sizes.h )
    this.renderer.setClearAlpha(0) 
    this.container  = options.dom
    this.container.appendChild(this.renderer.domElement)


    this.camera  =  new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    this.camera.position.z = 1

    this.scene = new THREE.Scene()

    this.addMesh()

    this.time = 0

    this.render()

    this.handeImages()
  }


  handeImages(){
    let images  = [...document.querySelectorAll('img')]

    images.forEach(im=>{
      let mat  = this.material.clone()
      
    })

  }

  addMesh(){
    this.geometry  =   new THREE.PlaneBufferGeometry(1,1)

    this.material =  new THREE.ShaderMaterial({
      extensions:{
        derivatives:"extension GL_OES_standard_derivatives : enable"
      },
      side:THREE.DoubleSide,
      uniforms:{
          time:{type:'f',value:0},
          texture1: {type:'f',value:null},
          resolution:{type:'v4',value: new THREE.Vector4()},
          uvRate1:{
            value:new THREE.Vector2(1,1)
          }
      },

    })

    this.mesh = new THREE.Mesh( this.geometry, this.material )

    this.scene.add( this.mesh );

  }


  render(){
    this.time++

  	this.mesh.rotation.x += 0.02
	  this.mesh.rotation.y += 0.01

    window.requestAnimationFrame(this.render.bind(this))

	  this.renderer.render( this.scene, this.camera );

  }
}



