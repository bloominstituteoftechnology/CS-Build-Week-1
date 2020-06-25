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
    var gameGrid = GameGrid(size: 25)

    // MARK: - Actions

    @IBAction func playPausebutton(_ sender: Any) {
    }

    @IBAction func stepButton(_ sender: UIButton) {
    }

    @IBAction func clearButton(_ sender: UIButton) {
        gameGrid.clearGrid()
    }

    @IBAction func presetsButton(_ sender: Any) {
        let alertController = UIAlertController(title: "Example Patterns", message: "Select a Game of Life pattern:", preferredStyle: .alert)

        alertController.addAction(UIAlertAction(title: "Behive", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .behive)
        })

        alertController.addAction(UIAlertAction(title: "Blinker", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .blinker)
        })

        alertController.addAction(UIAlertAction(title: "Toad", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .toad)
        })

        alertController.addAction(UIAlertAction(title: "Beacon", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .beacon)
        })

        alertController.addAction(UIAlertAction(title: "Pulsar", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .pulsar)
        })

        alertController.addAction(UIAlertAction(title: "Pentadecathlon", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .pentadecathlon)
        })

        alertController.addAction(UIAlertAction(title: "Glider", style: .default) { (_) in
            self.gameGrid.useExamplePattern(pattern: .glider)
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

