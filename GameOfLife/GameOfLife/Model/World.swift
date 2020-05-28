//
//  World.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import Foundation

class World {
	var cells = [Cell]()
	let size: Int
	
	init(size: Int) {
		self.size = size
		
		for x in 0..<size {
			for y in 0..<size {
				let randomState = Int.random(in: 0...2)
				let cell = Cell(x: x, y: y, state: randomState == 0 ? .alive : .dead)
				cells.append(cell)
			}
		}
	}
}
