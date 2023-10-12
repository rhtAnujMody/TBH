import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      viewBox="0 0 256 256"
      {...props}>
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}>
        <Path
          d="M68.162 10.398H21.838c-5.38 0-9.742 4.362-9.742 9.742v3.065h65.808V20.14c0-5.38-4.362-9.742-9.742-9.742z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#808080"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M57.628 14.469H32.373a2 2 0 01-2-2C30.373 5.593 35.966 0 42.841 0h4.318c6.875 0 12.469 5.593 12.469 12.469a2 2 0 01-2 2zm-23.017-4H55.39C54.488 6.761 51.141 4 47.159 4h-4.318c-3.981 0-7.329 2.761-8.23 6.469zM16.154 27.346l3.555 60.704A2.07 2.07 0 0021.776 90h46.449a2.072 2.072 0 002.068-1.949l3.554-60.704H16.154z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#808080"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M32.87 81.108a2 2 0 01-2.114-1.879l-2.275-38.856a2 2 0 011.88-2.113 2.007 2.007 0 012.113 1.88l2.275 38.855a1.998 1.998 0 01-1.879 2.113zM47 79.112a2 2 0 01-4 0V40.256a2 2 0 014 0v38.856zM59.244 79.229a2 2 0 01-3.994-.234l2.275-38.855a1.986 1.986 0 012.113-1.88 1.999 1.999 0 011.879 2.113l-2.273 38.856z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
