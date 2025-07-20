const IconGroup = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="16"
      fontWeight="bold"
    >
      <tspan fontStyle="italic">G</tspan>
      <tspan dx="1" dy=".2em" fontSize="20">
        *
      </tspan>
    </text>
  </svg>
);
export default IconGroup;
