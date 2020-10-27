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
        UIColor.green,
        UIColor.purple,
        UIColor.blue,
        UIColor.orange,
        UIColor.systemPink
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
        return colorImages.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellColor", for: indexPath)
        cell.backgroundColor = colorImages[indexPath.row]
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let cell = collectionView.cellForItem(at: indexPath)
        if indexPath.row == 0 {
            SettingsViewController.currentCellColor = .label
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 1 {
            SettingsViewController.currentCellColor = .red
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 2 {
            SettingsViewController.currentCellColor = .green
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 3 {
            SettingsViewController.currentCellColor = .purple
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 4 {
            SettingsViewController.currentCellColor = .blue
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 5 {
            SettingsViewController.currentCellColor = .orange
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        } else if indexPath.row == 6 {
            SettingsViewController.currentCellColor = .systemPink
            cell?.layer.borderColor = UIColor.label.cgColor
            cell?.layer.borderWidth = 1
        }
    }
    
}
