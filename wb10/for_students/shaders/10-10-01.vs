/*
 * Placeholder shader
 * The student should replace this with their own shader file.
 */

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
