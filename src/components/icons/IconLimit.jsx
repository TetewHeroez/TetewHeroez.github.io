const IconLimit = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <text
      x="50%"
      y="45%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="14"
      fontWeight="bold"
    >
      lim
    </text>
    <text
      x="50%"
      y="85%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="10"
      fontWeight="bold"
    >
      x→
      <tspan dy=".1em">∞</tspan>
    </text>
  </svg>
);
export default IconLimit;
