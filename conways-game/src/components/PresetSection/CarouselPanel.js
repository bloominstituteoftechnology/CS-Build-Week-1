import React, { Component } from 'react';
import styled from "styled-components";
import { colors } from "../../utils/variables";
const CarouselWrapper = styled.div`
    background: ${ colors.grey };
    min-height: 30rem;
`;
class CarouselPanel extends Component {
    state = {  }
    render() { 
        return (  
            <CarouselWrapper>
                
            </CarouselWrapper>
        );
    }
}
 
export default CarouselPanel;