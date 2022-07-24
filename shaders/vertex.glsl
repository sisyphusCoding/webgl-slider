
uniform float distFromCenter;
uniform float time;
varying vec2 vUv;
uniform vec2 pixels;
float pi = 3.145;

void main() {



    vUv = (uv-vec2(0.5))* (0.8-0.2*distFromCenter*(2.-distFromCenter)) + vec2(0.5);

    vec3 pos = position;

    pos.y += sin(pi*uv.x)*0.01;
    pos.z += sin(pi*uv.x)*0.02;

    pos.y += sin(time*.1)*0.005;
    vUv.y -= sin(time*.1)*0.005;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1);
}
