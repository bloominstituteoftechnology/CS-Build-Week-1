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
	
	let gameView: UIView = {
		let view = UIView()
		view.translatesAutoresizingMaskIntoConstraints = false
		view.backgroundColor = .label
		return view
	}()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		setupUI()
		printCoords()
	}
	
	private func setupUI() {
		view.backgroundColor = .systemBackground
		view.addSubview(gameView)
		NSLayoutConstraint.activate([
			gameView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
			gameView.widthAnchor.constraint(equalToConstant: 300),
			gameView.heightAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 1),
			gameView.centerXAnchor.constraint(equalTo: view.centerXAnchor)
		])
	}
	
	private func printCoords() {
		guard isViewLoaded else { return }
		print(gameView.center)
		print(gameView.bounds.size.width)
		print(gameView.bounds.size.height)
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
