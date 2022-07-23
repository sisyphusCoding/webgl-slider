import win from 'global'
import './style.css'

const block = document.querySelector('#app')



const wrap = document.querySelector('#wrap')

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
 
    console.log(o.dist)

  })

  rounded = Math.round(position)

  let diff = (rounded - position)

  position+= Math.sign(diff) * Math.pow(Math.abs(diff),0.8)*0.015




  
  wrap.style.transform = `translate3d(0,${position*100 + 50}px,0)`

  window.requestAnimationFrame(raf)
}

raf()
