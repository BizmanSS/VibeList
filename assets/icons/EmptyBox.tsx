import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function EmptyBoxIcon({ size = 120 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3 7.5L12 3l9 4.5-9 4.5-9-4.5z"
        stroke="#9CA3AF"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 7.5v9l9 4.5 9-4.5v-9"
        stroke="#9CA3AF"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12l9-4.5"
        stroke="#9CA3AF"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12L3 7.5"
        stroke="#9CA3AF"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
