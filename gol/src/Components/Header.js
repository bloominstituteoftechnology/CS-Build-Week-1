import React from 'react';

const Header = (props) => {
    return (
        <div className = 'container'>
            <div className = 'header'>
                <label className = 'label'>
                Rows:
                <input className = 'input' type = 'text' value = {props.rows}/>
                </label>
                <label className='label'>
                Columns:
                <input className = 'input' type = 'text' value = {props.columns} />
                </label>
            </div>
            <div className='buttons'>
                <button className='submit' onClick={props.start}>Start</button>
                <button className='submit' onClick={props.stop}>Stop</button>
            </div>
        </div>
    )
}
 
export default Header;