//
//  GameBoardViewController.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/17/20.
//

import UIKit

class GameBoardViewController: UIViewController {
    
    static var rowCount = 15
    static var columnCount = 10
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print(make2DArray(rows: GameBoardViewController.rowCount, cols: GameBoardViewController.columnCount))
    }
    
    func make2DArray(rows: Int, cols: Int) {
        
        let arr = Matrix(rows: rows, columns: cols)
        
        print(arr)

    }
}
