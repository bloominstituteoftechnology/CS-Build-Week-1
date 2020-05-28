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
}
