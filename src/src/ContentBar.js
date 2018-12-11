import React, { Component } from "react";
import StartStopButton from "./StartStopButton";

const ContentBar = () => {
    return ( 
        <div class="flex">
            <div class="col-md-12 top">
                <span>content</span>
            </div>
            <div class="col-md-12 bottom">
                <span>content</span>
                <StartStopButton />
            </div>
        </div>
     );
}
 
export default ContentBar;