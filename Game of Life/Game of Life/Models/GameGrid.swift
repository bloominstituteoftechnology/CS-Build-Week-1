//
//  GameGrid.swift
//  Game of Life
//
//  Created by Chris Dobek on 7/27/20.
//  Copyright © 2020 Chris Dobek. All rights reserved.
//

import Foundation

public enum Patterns {
    case random
    
    // Still Lives
    case behive
    
    // Oscillators
    case blinker
    case toad
    case beacon
    case pulsar
    case pentadecathlon
    
    // Spaceships
    case glider
}

class GameGrid: NSObject {
    let size: Int
    var cells: [Cell] = []
    
    var generation = 0
    var population: Int {
        cells.filter{$0.state == .alive }.count
    }
    
    public init(gridSize: Int) {
        self.size = gridSize
        
        // Create grid ttt
        for y in 0..<size {
            for x in 0..<size {
                let cell = Cell(x: x, y: y)
                cells.append(cell)
            }
        }
        
        super.init()
    }
    
    private func randomizeGrid() {
        for cell in cells {
            let randomState = Int.random(in: 0...5)
            cell.state = randomState == 0 ? .alive : .dead
        }
    }
    
    func clearGrid() {
        for cell in cells {
            cell.state = .dead
        }
        generation = 0
    }
    
    
}
