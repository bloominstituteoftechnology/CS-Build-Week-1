//
//  World.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import Foundation

class World {
	
	// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
	// MARK: - Properties
	var cells = [Cell]()
	let size: Int
	
	// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
	// MARK: - Computed Properties
	
	
	lazy var cellNeighbors = { (cell: Cell) -> [Cell] in
		let neighboringCells = { (left: Cell, right: Cell) -> Bool in
			let diff = (abs(left.x - right.x), abs(left.y - right.y))
			switch diff {
			case (1, 1), (1, 0), (0, 1):
				return true
			default:
				return false
			}
		}
		return self.cells.filter { neighboringCells(cell, $0) }
	}
	
	init(size: Int) {
		self.size = size
		createRandom()
	}
	
	func updateCells() {
		var updatedCells = [Cell]()
		let livingCells = cells.filter { $0.state == .alive }
		
		for cell in cells {
			let aliveNeighbors = livingCells.filter { $0.isNeighbor(to: cell) }
			switch aliveNeighbors.count {
			case 2...3 where cell.state == .alive:
				updatedCells.append(cell)
			case 3 where cell.state == .dead:
				let aliveCell = Cell(x: cell.x, y: cell.y, state: .alive)
				updatedCells.append(aliveCell)
			default:
				let dyingCell = Cell(x: cell.x, y: cell.y, state: .dead)
				updatedCells.append(dyingCell)
			}
		}
		
		cells = updatedCells
	}
	
	func createRandom() {
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				let randomState = Int.random(in: 0...2)
				let cell = Cell(x: x, y: y, state: randomState == 0 ? .alive : .dead)
				cells.append(cell)
			}
		}
	}
}
