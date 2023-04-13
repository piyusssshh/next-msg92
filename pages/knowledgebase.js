// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

const ParentComponent = () => {
  const data = json.global.knowledgebase; 
  return (
    <>    
      <ProductComponent pageData={data} />    
    </>
  );
};

export default ParentComponent;
