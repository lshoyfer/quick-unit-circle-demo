"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { Graphics, Stage, useTick } from "@pixi/react";

type rayPositionState = {
	x: number,
	y: number,
}

const posReducer = (_, { data }): rayPositionState => data;

function Rays() {
  	const [positions, updatePositions] = useReducer(posReducer, { x: 950, y: 500 });
  	const iter = useRef(0);

  	useTick((delta) => {
    	const i = (iter.current += 0.0075 * delta);

 		updatePositions({
			type: "update",
			data: {
				x: 500 + Math.cos(i) * 450,
				y: 500 - Math.sin(i) * 450,
			}
		});
	});
	const drawRay = useCallback((g) => {
		g.clear();
		
		g.lineStyle({ width: 5, color: 0x800080, cap: "round" });

		// main ray
		g.moveTo(500, 500);
		g.lineTo(positions.x, positions.y);

		// y-component
		g.lineStyle({ width: 3, color: 0x3eed6c, cap: "round", alpha: 0.5 });
		g.moveTo(positions.x, 500);
		g.lineTo(positions.x, positions.y);
		
	}, [positions]);

	return <Graphics draw={drawRay} />
}

export default function Home() {
	const drawAxisCircle = useCallback((g) => {
 	    g.clear();

		g.lineStyle(3, 0x000000);
		g.drawCircle(500, 500, 450);

		// x-axis
		g.moveTo(50, 500);
		g.lineTo(950, 500);
	
		// y-axis
		g.moveTo(500, 50);
		g.lineTo(500, 950);
	}, []);

  	return (
		<Stage className="canvas" width={1000} height={1000} options={{ backgroundAlpha: 0 }}>
			<Graphics draw={drawAxisCircle} />
			<Rays />
		</Stage>
	);
}
