import React from 'react';
import '../styles/Templates.css';

const Templates = (props) => {
  return (
    <div className='Templates'>
      <h1 className='title'>Templates</h1>
      <div className="button" onClick={() => props.handleTemplate('glider')}>Glider</div>
      <div className="button" onClick={() => props.handleTemplate('small_exploder')}>Small Exploder</div>
      <div className="button" onClick={() => props.handleTemplate('exploder')}>Exploder</div>
      <div className="button" onClick={() => props.handleTemplate('spaceship')}>Spaceship</div>
    </div>
  );
}
 
export default Templates;