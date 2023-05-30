/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

// get the texture from the program
uniform sampler2D tex;

/* number of checks over the UV range */
uniform float checks;

void main() {   
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float d = max(dx = abs(0.5 - mod(x,1.0)), dy = abs(0.5 - mod(y,1.0)));
    float dc = mod(xc+yc, 2.0); 

    vec4 img = texture2D(tex, v_uv);

    gl_FragColor =  texture2D(tex, v_uv) * vec4(mix(light, dark, dc), 1.0);
}
