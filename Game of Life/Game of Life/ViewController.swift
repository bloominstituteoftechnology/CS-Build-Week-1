//
//  ViewController.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/24/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    // MARK: - Properites

    // MARK: - Actions

    @IBAction func playPausebutton(_ sender: Any) {
    }

    @IBAction func stepButton(_ sender: UIButton) {
    }

    @IBAction func clearButton(_ sender: UIButton) {
    }

    @IBAction func presetsButton(_ sender: Any) {
        let alertController = UIAlertController(title: "Example Patterns", message: "Select a common Game of Life pattern.", preferredStyle: .alert)

        alertController.addAction(UIAlertAction(title: "Blinker", style: .default) { (_) in
            print("Blinker")
        })

        alertController.addAction(UIAlertAction(title: "Toad", style: .default) { (_) in
            print("Toad")
        })

        alertController.addAction(UIAlertAction(title: "Beacon", style: .default) { (_) in
            print("Beacon")
        })

        alertController.addAction(UIAlertAction(title: "Glider", style: .default) { (_) in
            print("Glider")
        })

        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))

        present(alertController, animated: true, completion: nil)
    }

    // MARK: - Outlets

    @IBOutlet weak var generationLabel: UILabel!
    @IBOutlet weak var populationLabel: UILabel!

    // MARK: - View Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    // MARK: - Private
}

