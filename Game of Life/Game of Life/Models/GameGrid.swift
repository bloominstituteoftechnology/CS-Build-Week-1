//
//  GameGrid.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

public enum Patterns {
    // Still Lifes
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
        cells.filter{ $0.state == .alive }.count
    }

    public init(gridSize: Int) {
        self.size = gridSize

        // Create grid
        for x in 0..<size {
            for y in 0..<size {
                let cell = Cell(x: x, y: y)
                cells.append(cell)
            }
        }
    }

    func randomizeGrid() {
        for cell in cells {
            let randomState = Int.random(in: 0...1)
            cell.state = randomState == 0 ? .alive : .dead
        }
    }

    func clearGrid() {
        for cell in cells {
            cell.state = .dead
        }
    }

    public func useExamplePattern(pattern: Patterns = .glider) {
        print(pattern)

        clearGrid()

        switch pattern {
        case .behive:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 2).state = .alive

            cellAt(x: 2, y: 3).state = .alive
            cellAt(x: 5, y: 3).state = .alive

            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 4, y: 4).state = .alive

        case .blinker:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 2).state = .alive
            cellAt(x: 5, y: 2).state = .alive

        case .toad:
            cellAt(x: 4, y: 3).state = .alive
            cellAt(x: 5, y: 3).state = .alive
            cellAt(x: 6, y: 3).state = .alive

            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 4, y: 4).state = .alive
            cellAt(x: 5, y: 4).state = .alive

        case .beacon:
            cellAt(x: 2, y: 2).state = .alive
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 2, y: 3).state = .alive

            cellAt(x: 5, y: 4).state = .alive
            cellAt(x: 4, y: 5).state = .alive
            cellAt(x: 5, y: 5).state = .alive

        case .pulsar:
            // Row 1
            cellAt(x: 6, y: 2).state = .alive
            cellAt(x: 6, y: 3).state = .alive
            cellAt(x: 6, y: 4).state = .alive
            cellAt(x: 7, y: 4).state = .alive

            cellAt(x: 12, y: 2).state = .alive
            cellAt(x: 12, y: 3).state = .alive
            cellAt(x: 12, y: 4).state = .alive
            cellAt(x: 11, y: 4).state = .alive

            // Row 2
            cellAt(x: 2, y: 6).state = .alive
            cellAt(x: 3, y: 6).state = .alive
            cellAt(x: 4, y: 6).state = .alive
            cellAt(x: 4, y: 7).state = .alive

            cellAt(x: 7, y: 6).state = .alive
            cellAt(x: 8, y: 6).state = .alive
            cellAt(x: 8, y: 7).state = .alive
            cellAt(x: 6, y: 7).state = .alive
            cellAt(x: 6, y: 8).state = .alive
            cellAt(x: 7, y: 8).state = .alive

            cellAt(x: 10, y: 6).state = .alive
            cellAt(x: 11, y: 6).state = .alive
            cellAt(x: 10, y: 7).state = .alive
            cellAt(x: 12, y: 7).state = .alive
            cellAt(x: 11, y: 8).state = .alive
            cellAt(x: 12, y: 8).state = .alive

            cellAt(x: 14, y: 6).state = .alive
            cellAt(x: 15, y: 6).state = .alive
            cellAt(x: 16, y: 6).state = .alive
            cellAt(x: 14, y: 7).state = .alive

            // Row 3
            cellAt(x: 2, y: 12).state = .alive
            cellAt(x: 3, y: 12).state = .alive
            cellAt(x: 4, y: 12).state = .alive
            cellAt(x: 4, y: 11).state = .alive

            cellAt(x: 6, y: 10).state = .alive
            cellAt(x: 7, y: 10).state = .alive
            cellAt(x: 6, y: 11).state = .alive
            cellAt(x: 8, y: 11).state = .alive
            cellAt(x: 7, y: 12).state = .alive
            cellAt(x: 8, y: 12).state = .alive

            cellAt(x: 11, y: 10).state = .alive
            cellAt(x: 12, y: 10).state = .alive
            cellAt(x: 12, y: 11).state = .alive
            cellAt(x: 10, y: 11).state = .alive
            cellAt(x: 10, y: 12).state = .alive
            cellAt(x: 11, y: 12).state = .alive

            cellAt(x: 14, y: 11).state = .alive
            cellAt(x: 14, y: 12).state = .alive
            cellAt(x: 15, y: 12).state = .alive
            cellAt(x: 16, y: 12).state = .alive

            // Row 4
            cellAt(x: 6, y: 14).state = .alive
            cellAt(x: 6, y: 15).state = .alive
            cellAt(x: 6, y: 16).state = .alive
            cellAt(x: 7, y: 14).state = .alive

            cellAt(x: 12, y: 14).state = .alive
            cellAt(x: 12, y: 15).state = .alive
            cellAt(x: 12, y: 16).state = .alive
            cellAt(x: 11, y: 14).state = .alive

        case .pentadecathlon:
            // Object 1
            cellAt(x: 5, y: 4).state = .alive
            cellAt(x: 6, y: 4).state = .alive
            cellAt(x: 7, y: 4).state = .alive
            cellAt(x: 6, y: 5).state = .alive
            cellAt(x: 6, y: 6).state = .alive
            cellAt(x: 5, y: 7).state = .alive
            cellAt(x: 6, y: 7).state = .alive
            cellAt(x: 7, y: 7).state = .alive

            // Object 2
            cellAt(x: 5, y: 9).state = .alive
            cellAt(x: 6, y: 9).state = .alive
            cellAt(x: 7, y: 9).state = .alive
            cellAt(x: 5, y: 10).state = .alive
            cellAt(x: 6, y: 10).state = .alive
            cellAt(x: 7, y: 10).state = .alive

            // Object 3
            cellAt(x: 5, y: 12).state = .alive
            cellAt(x: 6, y: 12).state = .alive
            cellAt(x: 7, y: 12).state = .alive
            cellAt(x: 6, y: 13).state = .alive
            cellAt(x: 6, y: 14).state = .alive
            cellAt(x: 5, y: 15).state = .alive
            cellAt(x: 6, y: 15).state = .alive
            cellAt(x: 7, y: 15).state = .alive

        case .glider:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 3).state = .alive
            cellAt(x: 4, y: 4).state = .alive
            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 2, y: 4).state = .alive
        }
    }

    func cellAt(x: Int, y: Int) -> Cell {
        var absolutePosition: Int
        // 3, 2 on 25 x 25 grid
        absolutePosition = ((x) * size) + y
        return cells[absolutePosition]
    }

    func cellTapped(at index: Int) {
        if cells[index].state == .alive {
            cells[index].state = .dead
        } else {
            cells[index].state = .alive
        }
        // Recompute population
        print("population = \(population)")
    }

    func performGameTurn() {
        generation += 1
    }

}
