import React, { Component } from 'react';
import './App.css';

function Array2D(width, height) {
    let array = new Array(height);

    for (let i = 0; i < height; i++) {
        array[i] = new Array(width);
    }

    return array;
}

class Life {
    
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cells = [Array2D(width, height), Array2D(width, height)];
        this.currentIndex = 0;
        this.clear();
    }

    fetchCells() {
        return this.cells[this.currentIndex];
    }

    clear() {
        for (let height = 0; height < this.height; height++) {
            this.cells[this.currentIndex][height].fill(0);
        }
    }

    getRandomCells() {
        for (let height = 0; height < this.height; height++) {
            for (let width = 0; width < this.width; width++) {
                this.cells[this.currentIndex][height][width] =
                    (Math.random() * 2) | 0;
            }
        }
    }
}

export default Life;
