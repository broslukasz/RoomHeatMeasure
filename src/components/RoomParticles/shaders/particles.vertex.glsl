uniform float uSize;
uniform float uTime;

varying vec3 vColor;

void main()
{
  float floatingFactor = 0.01;
  /**
    * Position
    */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // ToDo Particle animation to be improved
  // modelPosition.x += sin(uTime + modelPosition.x) * floatingFactor;
  // modelPosition.x += sin(uTime + modelPosition.y) * floatingFactor;
  // modelPosition.x += sin(uTime + modelPosition.z) * floatingFactor;

  // modelPosition.y += sin(uTime + modelPosition.x) * floatingFactor;
  // modelPosition.y += sin(uTime + modelPosition.y) * floatingFactor;
  // modelPosition.y += sin(uTime + modelPosition.z) * floatingFactor;

  // modelPosition.z += sin(uTime + modelPosition.x) * floatingFactor;
  // modelPosition.z += sin(uTime + modelPosition.y) * floatingFactor;
  // modelPosition.z += sin(uTime + modelPosition.z) * floatingFactor;


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  /**
    * Size
    */
  gl_PointSize = uSize;

  /**
    * Size attenuation
    */
  gl_PointSize *= ( 1.0 / - viewPosition.z );

  /**
    * Color
    */

  vColor = color;
}