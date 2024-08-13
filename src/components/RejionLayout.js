import React from 'react';  

const RegionLayout = () => {  
  return (  
    <div style={{ display: 'flex', alignItems: 'center' }}>  
      <h2 style={{ marginRight: '10px' }}>Region</h2>  
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>  
        <div style={{ width: '20px', height: '20px', backgroundColor: 'blue', marginRight: '5px' }}></div>  
        <p>Asia</p>  
      </div>  
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>  
        <div style={{ width: '20px', height: '20px', backgroundColor: 'purple', marginRight: '5px' }}></div>  
        <p>Europe</p>  
      </div>  
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>  
        <div style={{ width: '20px', height: '20px', backgroundColor: 'red', marginRight: '5px' }}></div>  
        <p>Africa</p>  
      </div>  
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>  
        <div style={{ width: '20px', height: '20px', backgroundColor: 'orange', marginRight: '5px' }}></div>  
        <p>Oceania</p>  
      </div>  
      <div style={{ display: 'flex', alignItems: 'center' }}>  
        <div style={{ width: '20px', height: '20px', backgroundColor: 'yellow', marginRight: '5px' }}></div>  
        <p>Americas</p>  
      </div>  
    </div>  
  );  
};  

export default RegionLayout;