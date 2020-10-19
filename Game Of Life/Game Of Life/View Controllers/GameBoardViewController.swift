//
//  GameBoardViewController.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/17/20.
//

import UIKit

class GameBoardViewController: UIViewController {
    let numViewPerRow = 15
    
    var cells = [String: UIView]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let width = view.frame.width / CGFloat(numViewPerRow)
                
        for j in 0...20 {
            for i in 0...numViewPerRow {
                let cellView = UIView()
                cellView.backgroundColor = .secondarySystemBackground
                cellView.frame = CGRect(x: CGFloat(i) * width, y: CGFloat(j) * width, width: width, height: width)
                cellView.layer.borderWidth = 0.5
                cellView.layer.borderColor = UIColor.label.cgColor
                view.addSubview(cellView)
                
                let key = "\(i)|\(j)"
                cells[key] = cellView
            }
        }
        view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTouch)))
//        cells["10|10"]?.backgroundColor = .red
    }
    @objc func handleTouch(gesture: UIGestureRecognizer) {
        let location = gesture.location(in: view)
        print(location)
        
        let width = view.frame.width / CGFloat(numViewPerRow)
        
        let i = Int(location.x / width)
        let j = Int(location.y / width)

        print("Column: \(i)", "Row: \(j)")
        
        let key = "\(i)|\(j)"
        let cellView = cells[key]
        
        if cellView?.backgroundColor == .label {
            cellView?.backgroundColor = .secondarySystemBackground
        } else {
            cellView?.backgroundColor = .label
        }
    }
}
