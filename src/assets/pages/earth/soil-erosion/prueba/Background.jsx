import React, { useEffect } from 'react';
import './Background.css';
import Header from '../../../../../components/Header/Header';

const Background = () => {
    useEffect(() => {
        const svgNode = document.querySelector('svg');
        const fePointLightNode = svgNode.querySelector('fePointLight');

        const handleMove = (event) => {
            const x = event.clientX || event.touches[0].clientX;
            const y = event.clientY || event.touches[0].clientY;
            fePointLightNode.setAttribute('x', x);
            fePointLightNode.setAttribute('y', y);
        };

        svgNode.addEventListener('mousemove', handleMove);
        svgNode.addEventListener('touchmove', handleMove);

        return () => {
            svgNode.removeEventListener('mousemove', handleMove);
            svgNode.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <>
            <svg width="100%" height="100%"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <filter id="light">
                    <feGaussianBlur stdDeviation="3" result="blurred"></feGaussianBlur>
                    <feColorMatrix in="blurred" type="luminanceToAlpha" result="bumpMap"></feColorMatrix>
                    <feDiffuseLighting in="bumpMap" surfaceScale="3" result="light">
                        <fePointLight x="225" y="150" z="30"></fePointLight>
                    </feDiffuseLighting>
                    <feComposite in="light" in2="SourceGraphic"
                        operator="arithmetic"
                        k1="1" k2="0" k3="0" k4="0">
                    </feComposite>
                </filter>
                <pattern id="pattern1" width="450" height="800" patternUnits="userSpaceOnUse">
                    <image xlinkHref="https://res.cloudinary.com/alvov/image/upload/v1484667915/codepen-lighting-experiment_jxj0pq.jpg" width="450" height="500"></image>
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern1)" filter="url(#light)"></rect>
            </svg>
        </>
    );
};

export default Background;
