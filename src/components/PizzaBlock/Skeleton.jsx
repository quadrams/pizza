import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="125" r="120" />
    <rect x="0" y="270" rx="6" ry="6" width="276" height="25" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="87" />
    <rect x="117" y="423" rx="26" ry="26" width="152" height="45" />
    <rect x="0" y="432" rx="6" ry="6" width="90" height="28" />
  </ContentLoader>
);

export default Skeleton;
