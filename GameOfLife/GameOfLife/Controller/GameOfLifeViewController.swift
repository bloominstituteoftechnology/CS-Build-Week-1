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
	override func viewDidLoad() {
		super.viewDidLoad()
	}
}

@available(iOS 13, *)
struct GameOfLifePreview: PreviewProvider {
	static var previews: some View {
		GameOfLifeViewController().asPreview()
			.edgesIgnoringSafeArea(.all)
	}
}
