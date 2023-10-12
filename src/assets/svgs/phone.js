import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      height="18px"
      viewBox="0 0 18 18"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.6 7.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V17c0 .6-.4 1-1 1C7.6 18 0 10.4 0 1c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1L3.6 7.8z"
        transform="translate(-85 -126) translate(85 126)"
        fill="#808080"
        fillRule="evenodd"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
}

export default SvgComponent;
