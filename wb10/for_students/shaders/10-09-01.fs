/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

varying vec3 v_normal;
varying vec3 v_position;

// note that this is in VIEW COORDINATES
const vec3 lightDirWorld = vec3(0,0,1);
const vec3 baseColor = vec3(1,.8,.4);
const vec3 specularColor = vec3(1, 1, 1);

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;
uniform float shininess;

/* number of checks over the UV range */
uniform float checks;

void main() {
    vec3 viewDir = normalize( - v_position);

    // convert the lighting direction in view-space coordinates
    vec3 lightDir = normalize((viewMatrix * vec4(lightDirWorld,0.)).xyz);
    // re-normalize the interpolated normal vector
    vec3 normal = normalize(v_normal);
    // get angle of reflection to compute alignment
    // without using `reflect`, alignment can be computed by taking the halfway vetor H and evaluating dot(N,H)
    vec3 reflDir = reflect(-lightDir, normal);
    float alignment = max(dot(viewDir, reflDir),0.);

    vec3 specular = specularColor * pow(alignment, pow(2.,shininess));

    // Begin checker pattern: 
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float d = max(dx = abs(0.5 - mod(x,1.0)), dy = abs(0.5 - mod(y,1.0)));
    float dc = mod(xc+yc, 2.0);

    gl_FragColor = vec4(mix(light, dark, dc), 1.0) + vec4(specular, 1);
}
