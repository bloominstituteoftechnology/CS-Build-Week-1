import React, { useState } from 'react';

function Generation() {
    const [gen, setGen] = useState(0);

    const nextGen = () => {

    };

    return (
        <div>
            <h2>Generations: {nextGen}</h2>
        </div>
    )
};

export default Generation;