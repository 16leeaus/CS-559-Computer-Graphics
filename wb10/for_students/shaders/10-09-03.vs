/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
uniform sampler2D colormap;
uniform float angle;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    float height = texture2D(colormap, uv).b;    // get the green value

    // alter the position by raising it by the height
    // we know the direction from the normal (which should be a unit vector)
    vec3 pos = position + height * normal * angle;

    // pass the texture coordinate to the fragment
    v_uv = uv;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
