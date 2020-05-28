//
//  GameView.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import UIKit

class GameView: UIView {
	var world: World = World(size: 100)
	var cellSize = 10
	
	convenience init(worldSize: Int, cellSize: Int) {
		let frame = CGRect(x: 0, y: 0, width: worldSize * cellSize, height: worldSize * cellSize)
		self.init(frame: frame)
		self.world = World(size: worldSize)
		self.cellSize = cellSize
	}
	
	convenience init() {
		let frame = CGRect(x: 0, y: 0, width: 1000, height: 1000)
		self.init(frame: frame)
	}
	
	override init(frame: CGRect) {
		super.init(frame: frame)
	}
	
	@available(*, unavailable)
	required init?(coder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	override func draw(_ rect: CGRect) {
		let context = UIGraphicsGetCurrentContext()
		context?.saveGState()
		
		for cell in world.cells {
			let rect = CGRect(x: cell.x * cellSize, y: cell.y * cellSize, width: cellSize, height: cellSize)
			let color = cell.state == .alive ? UIColor.label.cgColor : UIColor.systemBackground.cgColor
			context?.addRect(rect)
			context?.setFillColor(color)
			context?.fill(rect)
		}
		
		context?.restoreGState()
	}
}
