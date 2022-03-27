import React from 'react';
import '../style.css';

export default function TotalIndicator() {
    return(
        <div>
            <div className='totalIndicator'>Усього символів: </div>
            <div className='totalIndicator'>Усього слів:</div>
        </div>
    );
}