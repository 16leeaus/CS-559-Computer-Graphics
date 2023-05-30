/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

uniform vec3 light;
uniform vec3 dark;
uniform float checks;

void main()
{
    float angle = atan(v_uv.y - 0.5, v_uv.x - 0.5);
    float intensity = pow(sin(angle * checks) * 0.5 + 0.5, 2.0);
    vec3 col = mix(light, dark, intensity);
    gl_FragColor = vec4(col, 1.0);
}

  