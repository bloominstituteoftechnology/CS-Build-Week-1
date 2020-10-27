//
//  SquareCollectionViewCell.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/22/20.
//

import UIKit

class SquareCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var squareView: UIView!
    
    func configureWithState(_ isAlive: Bool) {
        self.squareView.backgroundColor = isAlive ?  SettingsViewController.currentCellColor : .secondarySystemBackground
    }
}
