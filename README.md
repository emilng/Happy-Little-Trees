Happy Little Trees (HLT)
===================

Happy Little Trees is a tool for creative image generation using patterns.

"Happy little trees" was a term coined by Bob Ross in the "Joy of Painting" television program but I figure it also works to refer to the visual information stored in a tree data structure.

### Use case
1. Draw a shape onto a layer.

2. Repeat and rotate the layer six times to create a snowflake pattern on a new layer.

3. The shape properties from step 1 can be changed when creating copies of the snowflake layer to create an unlimited number of unique snowflakes.


### Data Format

number data:
single number
array of numbers
a function returning a single number or array of numbers

matrix data:
same as number data but replace number with matrix

```
node: {
  x: <number>,
  y: <number>,
  rotation: <number>,
  regX: <number>,
  regY: <number>,
  width: <number>,
  height: <number>,
  transform: <matrix>,
  drawCommands: <commands>,
  childData: {
    x: <number data>,
    y: <number data>,
    rotation: <number data>,
    regX: <number data>,
    regY: <number data>,
    width: <number data>,
    height: <number data>,
    transform: <matrix data>,
    drawCommands: <draw command data>,
    layoutCommands: <layout command data>
  }
  childNodes: <array of nodes populated with childData>
}
```
