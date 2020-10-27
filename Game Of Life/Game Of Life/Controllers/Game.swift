//
//  Game.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/22/20.
//

import Foundation

struct State {
    var cells: [Cell] = []
    
    subscript(index: Int) -> Cell {
        get {
            return cells[index]
        } set {
            cells[index] = newValue
        }
    }
}

typealias StateObserver = ((State) -> Void)?

class Game {
    let width: Int
    let height: Int
    var currentState: State
    
    init(width: Int, height: Int) {
        self.width = width
        self.height = height
        let cells = Array(repeating: Cell.makeDeadCell(), count: width*height)
        currentState = State(cells: cells)
    }
    
    func addStateObserver(_ observer: StateObserver) {
        observer?(createInitialState())
        Timer.scheduledTimer(withTimeInterval: SettingsViewController.currentGameSpeed, repeats: true) { _ in
            observer?(self.iterate())
        }
    }
    
    func reset() {
        self.createInitialState()
    }
    
    func random() {
        self.createRandomState()
    }
    
    func play() {
        
    }
    func iterate() -> State  {
        var nextState = currentState
        if GameBoardViewController.stop != true {
        for i in 0...width - 1 {
            for j in 0...height - 1 {
                let positionInTheArray = j*width + i
                nextState[positionInTheArray] = Cell(isAlive: state(x: i, y: j))
            }
        }
        }
        self.currentState = nextState
        return nextState
    }
    
    func state(x: Int, y: Int) -> Bool {
        let numberOfAliveNeighbours = aliveNeighbors(x: x, y: y)
        let position = x + y*width
        
        let wasPrevioslyAlive = currentState[position].isAlive
        if wasPrevioslyAlive {
            return numberOfAliveNeighbours == 2 || numberOfAliveNeighbours == 3
        } else {
            return numberOfAliveNeighbours == 3
        }
    } 
    
    func aliveNeighbors(x: Int, y: Int) -> Int {
        var numberOfAliveNeighbours = 0
        for i in x-1...x+1 {
            for j in y-1...y+1 {
                if (i == x && y == j) || (i >= width) || (i < 0) || (j < 0 ) {continue}
                
                let index = j*width + i
                
                guard index >= 0 && index < width*height else {continue}
                if currentState[index].isAlive {
                    numberOfAliveNeighbours += 1
                }
            }
        }
        return numberOfAliveNeighbours
    }
    
    func setInitialState(_ state: State) {
        currentState = state
    }
    
    @discardableResult
    func createRandomState() -> State{
        let maxItems = width*height - 1
        let initialStatePoints = self.generateRandom(between: 0...maxItems, count: maxItems/8)
        
        for point in initialStatePoints{
            currentState[point] = Cell.makeLiveCell()
        }
        return self.currentState
    }
    
    #warning("Need to implement correctly")
    @discardableResult
    func createInitialState() -> State {
        let maxItems = width*height - 1
        let initialStatePoints = self.generateRandom(between: 0...maxItems, count: maxItems/8)

        for point in initialStatePoints{
            currentState[point] = Cell.makeDeadCell()
        }
        return self.currentState
    }
    
    private func generateRandom(between range: ClosedRange<Int>, count: Int) -> [Int] {
        return Array(0...count).map { _ in
            Int.random(in: range)
        }
    }

}

extension State: Equatable {
public static func == (lhs: State, rhs: State) -> Bool {
    for lhsCell in lhs.cells {
        for rhsCell in rhs.cells {
            if lhsCell.isAlive != rhsCell.isAlive {
                return false
            }
        }
    }
    return true
}
}
