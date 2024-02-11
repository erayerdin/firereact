// Copyright (c) 2024 Eray Erdin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type LogoFrameProps = {
  darkColor: string;
  midColor: string;
  lightColor: string;
}

const LogoFrame = ({darkColor, midColor, lightColor}: LogoFrameProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={512}
    height={512}
  >
    <defs>
      <linearGradient
        id="b"
        x1={-3.88}
        x2={129.828}
        y1={21.921}
        y2={119.157}
        gradientTransform="scale(.8543 1.17055)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#FFF" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
      </linearGradient>
      <path
        id="a"
        d="M95.798 33.625a3.436 3.436 0 0 0-2.336-2.699 3.454 3.454 0 0 0-3.48.823l-17.71 17.816-14.03-26.51A3.34 3.34 0 0 0 55.25 21.2a3.34 3.34 0 0 0-2.995 1.854l-7.613 14.492L25.392 1.914c-1.54-2.898-5.903-2.131-6.416 1.108L.498 121.17l49.532 27.704a10.432 10.432 0 0 0 10.01 0L110 121.17 95.798 33.625Z"
      />
    </defs>
    <g
      fill="none"
      stroke="#61dafb"
      transform="translate(256 258.365) scale(22.26087)"
    >
      <ellipse
        rx={11}
        ry={4.2}
        style={{
          stroke: lightColor,
          strokeOpacity: 1,
        }}
      />
      <ellipse
        rx={11}
        ry={4.2}
        style={{
          stroke: midColor,
          strokeOpacity: 1,
        }}
        transform="rotate(60)"
      />
      <ellipse
        rx={11}
        ry={4.2}
        style={{
          fill: "none",
          fillOpacity: 1,
          stroke: darkColor,
          strokeOpacity: 1,
        }}
        transform="rotate(120)"
      />
    </g>
  </svg>
)
export default LogoFrame
