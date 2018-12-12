import React from 'react';
import '../App.css';

const Controls = (props) => {
    return ( 
        <div className = 'controls'>
           <label className = 'label'>
            Rows:
            <input className = 'input' type = 'text' value = {props.rows} onChange = {props.rowsOnChange} />
            </label>
            <label className = 'label'>
            Columns:
            <input className = 'input' type = 'text' value = {props.columns} onChange = {props.columnsOnChange} />
            </label>
            <label className = 'label'>
            Interval:
            <input className = 'input' type = 'text' value = {props.interval} onChange = {props.intervalChange} />
            </label>
        </div>
     );
}
 
export default Controls;