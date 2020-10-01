import React from 'react';
const CANCELFILE = `
<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 16L2 2M16 2L2 16" stroke="#FCFCFC" stroke-width="3"/>
</svg>
`;

const CancelFile = ({ ...props }) => (
  <img
    src={`data:image/svg+xml;base64,${btoa(CANCELFILE)}`}
    alt='core of science logo'
    {...props}
  />
);

export default CancelFile;
