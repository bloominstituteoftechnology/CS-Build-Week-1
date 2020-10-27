//
//  GameBoardViewController.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/17/20.
//

import UIKit

class GameBoardViewController: UIViewController {
    
    @IBOutlet weak var collectionView: UICollectionView!
    var dataSource: [Cell]  = [] {
        didSet {
            self.collectionView.reloadData()
        }
    }
    @IBOutlet var playPauseButton: UIButton!
    
    let pixelSize = 20
    
    static var stop = false
    
    var boardWidth: Int {
        return Int(floor(collectionView.frame.size.width/CGFloat(pixelSize)))
    }
    var boardHeight: Int {
        return Int(floor(collectionView.frame.size.height/CGFloat(pixelSize)))
    }

    var game: Game!

    override var prefersStatusBarHidden: Bool {
        return true
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        game = Game(width: boardWidth, height: boardHeight)
        game.addStateObserver { [weak self] state in
            self?.display(state)
        }
    }
    
    func display(_ state: State) {
        self.dataSource = state.cells
    }
    
    @IBAction func resetAction(_ sender: UIButton) {
        game.reset()
    }
    @IBAction func playAction(_ sender: UIButton) {
        GameBoardViewController.stop.toggle()
        playPauseButton.isSelected = !playPauseButton.isSelected
        game.play()
    }
    @IBAction func randomAction(_ sender: UIButton) {
        game.random()
    }
}

extension GameBoardViewController: UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return dataSource.count
    }

    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "\(SquareCollectionViewCell.self)", for: indexPath) as! SquareCollectionViewCell
        cell.configureWithState(dataSource[indexPath.item].isAlive)
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: pixelSize, height: pixelSize)
    }

}
