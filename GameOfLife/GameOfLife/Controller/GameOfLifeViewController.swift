//
//  GameOfLifeViewController.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/26/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import SwiftUI
import UIKit

class GameOfLifeViewController: UIViewController {
	
	var startTime: Date!
	var elapsedTime: TimeInterval!
	
	lazy var gameView: GameView = {
		let view = GameView(worldSize: 200, cellSize: 10)
		view.translatesAutoresizingMaskIntoConstraints = false
		view.isUserInteractionEnabled = true
		view.backgroundColor = .label
		view.layer.borderWidth = 8
		view.layer.borderColor = UIColor.systemGray.cgColor
		view.clipsToBounds = false
		return view
	}()
	
	let stepButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Step", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(stepGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let playButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Play", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(runGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let resetButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Reset", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(resetGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	var timer: CADisplayLink!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		setupUI()
	}
	
	private func setupUI() {
		view.backgroundColor = .systemBackground
		view.addSubview(gameView)
		view.addSubview(stepButton)
		view.addSubview(playButton)
		view.addSubview(resetButton)
		view.bringSubviewToFront(gameView)
		NSLayoutConstraint.activate([
			gameView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
			gameView.widthAnchor.constraint(equalToConstant: 300),
			gameView.heightAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 1),
			gameView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
			
			stepButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			stepButton.heightAnchor.constraint(equalToConstant: 40),
			stepButton.leadingAnchor.constraint(equalTo: gameView.leadingAnchor),
			stepButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3),
			
			resetButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			resetButton.heightAnchor.constraint(equalToConstant: 40),
			resetButton.leadingAnchor.constraint(equalTo: stepButton.trailingAnchor, constant: 16),
			resetButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3),
			
			playButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			playButton.heightAnchor.constraint(equalToConstant: 40),
			playButton.trailingAnchor.constraint(equalTo: gameView.trailingAnchor),
			playButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3)
		])
	}
	
	@objc private func stepGame() {
		gameView.world.updateCells()
		gameView.setNeedsDisplay()
	}
	
	@objc private func runGame() {
		gameView.autoRun()
	}
	
	@objc private func resetGame() {
		gameView.world.cells = []
		gameView.setNeedsDisplay()
	}
}

@available(iOS 13, *)
struct GameOfLifePreview: PreviewProvider {
	static var previews: some View {
		GameOfLifeViewController().asPreview()
			.edgesIgnoringSafeArea(.all)
			.colorScheme(.dark)
	}
}
