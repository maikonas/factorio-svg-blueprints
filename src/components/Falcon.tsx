import { BasicPathShape } from "./BasicPathShape";

const shape = new Path2D('M -77 0 A 1 1 0 0 0 76 0 C 76 -10 75 -21 69 -32 L 77 -37 L 77 -56 L 73 -71 L 62 -71 L 58 -58 L 58 -50 L 54 -54 L 20 -131 L 12 -131 L 12 -76 L 9 -76 L 9 -92 L -9 -92 L -9 -76 L -12 -76 L -12 -131 L -19 -131 L -54 -55 C -66 -42 -77 -22 -77 -4 Z');

const Falcon = () => {
  return (<BasicPathShape shape={shape} scale={1/140} />);
}

export { Falcon }