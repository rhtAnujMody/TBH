import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0,0,256,256"
    width="30px"
    height="30px"
    {...props}>
    <G
      fill="#f9ad37"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      strokeDasharray=""
      strokeDashoffset={0}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: 'normal',
      }}>
      <G transform="scale(5.12,5.12)">
        <Path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z" />
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
