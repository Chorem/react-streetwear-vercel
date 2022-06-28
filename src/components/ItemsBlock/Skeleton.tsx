import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader 
    className="ClothesBlock"
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="260" rx="10" ry="10" width="260" height="17" /> 
    <rect x="0" y="290" rx="10" ry="10" width="260" height="90" /> 
    <rect x="0" y="0" rx="0" ry="0" width="260" height="240" /> 
    <rect x="0" y="390" rx="10" ry="10" width="105" height="30" /> 
    <rect x="155" y="390" rx="10" ry="10" width="100" height="30" />
  </ContentLoader>
)


