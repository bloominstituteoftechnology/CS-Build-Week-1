//
//  SettingsViewController.swift
//  Game Of Life
//
//  Created by Jarren Campos on 10/23/20.
//

import UIKit

class SettingsViewController: UIViewController {

    @IBOutlet var collectionView: UICollectionView!
    @IBOutlet var speedSlider: UISlider!
    
    static var currentCellColor: UIColor = .label
    static var currentGameSpeed: Double = 0.1
    
    var colorImages: [UIColor] = [
        UIColor.label,
        UIColor.red,
        UIColor.green
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }
    @IBAction func gameSpeedSlider(_ sender: Any) {
        SettingsViewController.currentGameSpeed = Double(speedSlider.value)
    }
    
}

extension SettingsViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 3
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellColor", for: indexPath)
        cell.backgroundColor = colorImages[indexPath.row]
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if indexPath.row == 0 {
            SettingsViewController.currentCellColor = .label
        } else if indexPath.row == 1 {
            SettingsViewController.currentCellColor = .red
        } else if indexPath.row == 2 {
            SettingsViewController.currentCellColor = .green
        }
    }
    
}
