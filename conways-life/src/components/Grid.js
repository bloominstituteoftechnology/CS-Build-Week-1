import React from "react";
import Cell from "./Cell";

class Grid extends React.Component{
    renderCell = i => {
        return(
            <Cell />
        )
    }
    render(){
        return(
            <div style={{maxWidth: "1500px", maxHeight: "1500px", border:"1px solid black", margin:"0 auto",}}>
                <Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell /><Cell />
            </div>
        )
    }

};

export default Grid;