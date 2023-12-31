import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={31}
      height={27}
      viewBox="0 0 31 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path fill="url(#pattern0)" d="M0 0H31V27H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_143_11" transform="scale(.01075 .01235)" />
        </Pattern>
        <Image
          id="image0_143_11"
          width={93}
          height={81}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABRCAYAAACws6q4AAAACXBIWXMAAC4jAAAuIwF4pT92AAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDMgNzkuMTY0NTI3LCAyMDIwLzEwLzE1LTE3OjQ4OjMyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA3LTA4VDEzOjAxOjI4KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA3LTA4VDEzOjAxOjI4KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNy0wOFQxMzowMToyOCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N2YwZTk0OS1kMDhjLTQyNGQtYThhZi1iZWY1YjI3MWZlNmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYmE5MDdmYy03OTY2LTU2NDMtYTMxOC01MThmMDJiNzNkZjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZTllMjY5Ny0yZGY4LWNmNDMtOTNhYS03YmM3N2U4MjMwMWMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNlOWUyNjk3LTJkZjgtY2Y0My05M2FhLTdiYzc3ZTgyMzAxYyIgc3RFdnQ6d2hlbj0iMjAyMy0wNy0wOFQxMzowMToyOCswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5N2YwZTk0OS1kMDhjLTQyNGQtYThhZi1iZWY1YjI3MWZlNmQiIHN0RXZ0OndoZW49IjIwMjMtMDctMDhUMTM6MDE6MjgrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz56PLXsAAAG70lEQVR4nO2dW4wURRSGv2EFjOsiFwmIKN4RBeWigMpFkBhRo6gxmmiCJCpERBAThMQgvuAlUR/EB+UB1ICAgTVq0AjRBIPLrjeIKEgwgICKhksWExZld30402xN70xPd09denrnSzp091bX1P7UnK5z6lRt5uTaUVSwSyfXDeiIVER3wBmuG+DjIuBtYCjSIVo01FkFNAJrgGc11FcySRK9D7AVOMdA3T2BecAo4GYD9UciSeblFcwIrjIeeMjwZxTFdE+/ELgWEbPZ97k7gW+U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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
