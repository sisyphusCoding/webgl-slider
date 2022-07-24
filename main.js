import './style.css'
import Sketch  from './threeScript'


let sketch = new Sketch({
  dom:document.getElementById('canvasWrap')
})



let speed = 0
let position = 0
let rounded = 0

let elems = [...document.querySelectorAll('.n')]

console.log(elems)
window.addEventListener('wheel',(e)=>{
  speed += e.deltaY*0.0003
})

let objs = Array(5).fill({dist:0})



const raf = () =>{
  position +=speed
  speed*=0.8

  objs.forEach((o,i)=>{    
    o.dist = Math.min( Math.abs((position - i)),1)
    o.dist = 1- o.dist**2
    elems[i].style.transform = `scale(${ 1+0.5 * o.dist})`
 
 

    let scale = 1 + (0.15 * o.dist)
    
      sketch.meshes[i].position.y = i * .7 - position*.7
    
      sketch.meshes[i].scale.set(scale,scale,scale)
      
      sketch.meshes[i].material.uniforms.distFromCenter.value = o.dist



  })

  rounded = Math.round(position)

  let diff = (rounded - position)

  position+= Math.sign(diff) * Math.pow(Math.abs(diff),0.8)*0.035




  
  //wrap.style.transform = `translate3d(0,${position*100 + 50}px,0)`

  window.requestAnimationFrame(raf)
}

raf()


