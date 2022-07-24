

import vertex from './shaders/vertex.glsl?raw'

import fragment from './shaders/fragment.glsl?raw'



import * as THREE from 'three'


let sizes = {w:window.innerWidth,h:window.innerHeight}

const textureLoad = new THREE.TextureLoader()

const img0 = textureLoad.load('/trial-0.jpg')

const img1 = textureLoad.load('/trial-1.jpg')

const img2 = textureLoad.load('/trial-2.jpg')

const img3 = textureLoad.load('/trial-3.jpg')

const img4 = textureLoad.load('/trial-4.jpg')


export default class Sketch {
  constructor(options){

window.addEventListener('resize',()=>{
sizes.w = window.innerWidth
sizes.h = window.innerHeight
 
  this.camera.aspect = sizes.w/sizes.h

  this.camera.updateProjectionMatrix()

    this.renderer.setSize( sizes.w,sizes.h)

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

    this.materials = []
    this.meshes=[]

    this.handeImages()
  }


  handeImages(){

    let images  = [...document.querySelectorAll('img')]
    //let images = [img0,img1,img2,img3,img4]
    console.log(images)

      

      images.forEach((im,i)=>{

        let imag = new Image()
        if(im){
        imag.src = im.src 
        }
      let geo = new THREE.PlaneBufferGeometry(1,.6,20,20)

      let mat = this.material.clone()
      this.materials.push(mat)
      mat.uniforms.texture1.value = new THREE.Texture(imag)
      //mat.wireframe = true
      mat.uniforms.texture1.value.needsUpdate = true
        
      let mesh = new THREE.Mesh(geo,mat)
      let tY = i* 0.8
      mesh.position.y = tY
      mesh.rotation.y = - 0.5
      mesh.rotation.x = -0.1
      mesh.rotation.z = -0.1
      this.meshes.push(mesh)
      this.scene.add(mesh)



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
          distFromCenter:{type:'f',value:0},
          time:{type:'f',value:0},
          texture1: {type:'t',value:null},
          resolution:{type:'v4',value: new THREE.Vector4()},
          uvRate1:{
            value:new THREE.Vector2(1,1)
          }
      },
      transparent:true,
      fragmentShader:fragment,
      vertexShader:vertex
    })

    this.mesh = new THREE.Mesh( this.geometry, this.material )

  }


  render(){

    this.time+=0.5

    if(this.materials){
    this.materials.forEach(m=>{
      m.uniforms.time.value = this.time 
    })
    }

    //this.material.uniforms.time.value = this.time
    window.requestAnimationFrame(this.render.bind(this))

	  this.renderer.render( this.scene, this.camera );
  

  }
}



