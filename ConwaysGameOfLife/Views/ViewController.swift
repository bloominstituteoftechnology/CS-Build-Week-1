//
//  ViewController.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/24/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var boardView: UIView!
    @IBOutlet var genLabel: UILabel!
    private var testbutton:UIButton = UIButton()
    
    var life = Life()
    let gameBoard: GameBoard
    var genCount = 1
    var runAnimation = true
    
    required init?(coder aDecoder: NSCoder) {
        gameBoard = GameBoard(createLife: life)
        
        super.init(coder: aDecoder )
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        gameBoard.frame = boardView.frame
        gameBoard.center = CGPoint(x: gameBoard.frame.size.width/2, y: gameBoard.frame.size.height/2)
        boardView.addSubview(gameBoard)
        
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 21))
        label.center = CGPoint(x: 80, y: 105)
        label.textAlignment = NSTextAlignment.center
        label.text = "Generations"
        self.view.addSubview(label)
        
        self.genLabel = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 21))
        self.genLabel.center = CGPoint(x: 300, y: 105)
        self.genLabel.textAlignment = NSTextAlignment.center
        self.genLabel.text = "\(self.genCount)"
        self.view.addSubview(genLabel)
        
        let testButton   = UIButton(type: UIButton.ButtonType.system) as UIButton
        testButton.frame = CGRect(x: 40, y: 560, width: 80, height: 20)
        testButton.backgroundColor = UIColor.white
        testButton.setTitle("Stop", for: UIControl.State.normal)
        testButton.addTarget(self, action:#selector(self.testButtonClicked), for: .touchUpInside)
        self.view.addSubview(testButton)
        
        animate()
    }
 
    public func animate() {
        if !runAnimation {return}
        DispatchQueue.main.asyncAfter(deadline: .now()) {
            self.life.updateCells()
            self.genCount += 1
            self.genLabel.text = "\(self.genCount)"
            self.gameBoard.setNeedsDisplay()
            self.animate()
        }
    }
    

    @objc func testButtonClicked(sender:UIButton){
        if runAnimation == true {
            runAnimation = false
        } else if runAnimation == false {
            runAnimation = true
            animate()
        }
    }
    
    
}

