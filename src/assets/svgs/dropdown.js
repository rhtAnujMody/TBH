import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path
        transform="matrix(-1 0 0 1 16 0)"
        fill="url(#pattern0)"
        fillOpacity={0.6}
        d="M0 0H16V16H0z"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_132_9" transform="scale(.00195)" />
        </Pattern>
        <Image
          id="image0_132_9"
          width={512}
          height={512}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
