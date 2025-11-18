import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { colors } from "../../constants/colors";

export default function TimeIcon({ size = 25, color = colors.primary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        d="M12 7v5l3 2"
      />
    </Svg>
  );
}
