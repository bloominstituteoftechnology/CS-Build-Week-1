//
//  AboutGameViewController.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/28/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import SwiftUI
import UIKit

class AboutGameViewController: UIViewController {
	
	let rulesLabel: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "Rules"
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 40, weight: .bold)
		return label
	}()
	
	let rule1Label: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "• Any live cell with less than 2 neighbors will die"
		label.numberOfLines = 0
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 20, weight: .semibold)
		return label
	}()
	
	let rule2Label: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "• Any live cell with 2 or 3 neighbors will live for the next generation"
		label.numberOfLines = 0
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 20, weight: .semibold)
		return label
	}()
	
	let rule3Label: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "• Any live cell with more then 3 neighbors will die"
		label.numberOfLines = 0
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 20, weight: .semibold)
		return label
	}()
	
	let rule4Label: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "• Any dead cell with exactly 3 neighbors will become a live cell"
		label.numberOfLines = 0
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 20, weight: .semibold)
		return label
	}()
	
	let aboutAlgoLabel: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "About this Algorithm"
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 40, weight: .bold)
		return label
	}()
	
	let aboutAlgoTextView: UITextView = {
		let textView = UITextView()
		textView.translatesAutoresizingMaskIntoConstraints = false
		textView.isUserInteractionEnabled = false
		textView.isEditable = false
		textView.text =
		"""
			This is going to be filled with some rudimentary text regarding my research and involvement in finding an efficient solution for solving the game of life and implementing it within an iOS app.
		"""
		textView.textColor = .label
		textView.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
		return textView
	}()
	
	let copyrightLabel: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.text = "Copyright Chad Rutherford© May 2020"
		label.numberOfLines = 0
		label.textColor = .label
		label.font = UIFont.systemFont(ofSize: 20, weight: .semibold)
		return label
	}()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		setupUI()
	}
	
	private func setupUI() {
		title = "About"
		view.backgroundColor = .systemBackground
		view.addSubview(rulesLabel)
		view.addSubview(rule1Label)
		view.addSubview(rule2Label)
		view.addSubview(rule3Label)
		view.addSubview(rule4Label)
		view.addSubview(aboutAlgoLabel)
		view.addSubview(aboutAlgoTextView)
		view.addSubview(copyrightLabel)
		NSLayoutConstraint.activate([
			rulesLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 20),
			rulesLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
			
			rule1Label.leadingAnchor.constraint(equalTo: rulesLabel.leadingAnchor, constant: 16),
			rule1Label.topAnchor.constraint(equalTo: rulesLabel.bottomAnchor, constant: 16),
			rule1Label.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -8),
			
			rule2Label.leadingAnchor.constraint(equalTo: rulesLabel.leadingAnchor, constant: 16),
			rule2Label.topAnchor.constraint(equalTo: rule1Label.bottomAnchor, constant: 16),
			rule2Label.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -8),
			
			rule3Label.leadingAnchor.constraint(equalTo: rulesLabel.leadingAnchor, constant: 16),
			rule3Label.topAnchor.constraint(equalTo: rule2Label.bottomAnchor, constant: 16),
			rule3Label.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -8),
			
			rule4Label.leadingAnchor.constraint(equalTo: rulesLabel.leadingAnchor, constant: 16),
			rule4Label.topAnchor.constraint(equalTo: rule3Label.bottomAnchor, constant: 16),
			rule4Label.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -8),
			
			aboutAlgoLabel.leadingAnchor.constraint(equalTo: rulesLabel.leadingAnchor),
			aboutAlgoLabel.topAnchor.constraint(equalTo: rule4Label.bottomAnchor, constant: 20),
			
			aboutAlgoTextView.topAnchor.constraint(equalTo: aboutAlgoLabel.bottomAnchor, constant: 20),
			aboutAlgoTextView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 16),
			aboutAlgoTextView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -16),
			aboutAlgoTextView.bottomAnchor.constraint(equalTo: copyrightLabel.topAnchor, constant: -16),
			
			copyrightLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 20),
			copyrightLabel.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
		])
	}
}

@available(iOS 13, *)
struct AboutGamePreview: PreviewProvider {
	static var previews: some View {
		AboutGameViewController().asPreview()
			.edgesIgnoringSafeArea(.all)
			.colorScheme(.dark)
	}
}
