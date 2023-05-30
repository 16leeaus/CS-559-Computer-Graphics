/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

// get the texture from the program
uniform sampler2D tex;

varying vec3 v_normal;
varying vec3 v_position;
uniform float shininess;

// note that this is in WORLD COORDINATES
const vec3 lightDirWorld = vec3(0, 1, 1);
const vec3 baseColor = vec3(1, 0.8, 0.4);

void main()
{
    // convert the lighting direction in view-space coordinates
    vec3 lightDir = normalize((viewMatrix * vec4(lightDirWorld,0.)).xyz);
    // re-normalize the interpolated normal vector
    vec3 normal = normalize(v_normal);

    // Diffuse lighting:
    float light = dot(normal, lightDir);
    vec4 diffuse = vec4(light * baseColor, 1);

    //gl_FragColor = vec4(.5, .5, 0 , 1.);
    gl_FragColor = texture2D(tex, v_uv) + diffuse;
}

