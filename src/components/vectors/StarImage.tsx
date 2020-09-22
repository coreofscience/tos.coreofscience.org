import React from 'react';
const SMARTIMAGE = `
<svg width="25" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.5 0l2.806 8.637h9.082l-7.347 5.338 2.806 8.638-7.347-5.338-7.347 5.338 2.806-8.638L.612 8.637h9.082L12.5 0z" fill="#904C14"/>
</svg>`;

const StarImgage = ({ ...props }) => (
  <img
    src={`data:image/svg+xml;base64,${btoa(SMARTIMAGE)}`}
    alt='core of science logo'
    {...props}
  />
);
export default StarImgage;
