//
//  RulesViewController.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

class RulesViewController: UIViewController {

    // MARK: - Properites
    var gridView: GridView?

    // MARK: - Actions
    @IBAction func okButton(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }

    @IBAction func secondsSegmentedControl(_ sender: UISegmentedControl) {
        switch(sender.selectedSegmentIndex) {
        case 1:
            gridView?.timeInterval = 0.50
        case 2:
            gridView?.timeInterval = 0.75
        case 3:
            gridView?.timeInterval = 1.00
        default:
            gridView?.timeInterval = 0.25
        }
    }

    // MARK: - Outlets

    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
}
