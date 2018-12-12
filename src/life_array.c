#include <stdio.h>
#include <stdlib.h>

unsigned int define_array(int width, int height)
{
    unsigned int *life_array[] = malloc(sizeof(unsigned int) * width * height);
    return life_array;
};

/*
Finding adjacents using a 1d array:
0  1  2  3  4
5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24

In the case of 13, the index 5 (width) characters before it is directly above it. The index  at -w-1 (7) is up-left of it,
and -w+1 (9) is up-right. For those below it, 13 +w(5) = 18, below, 
*/

//Edge case: if considering 14, how do we calculate what's to the right of it?
//If we're wrapping around, then 10 would be to the right of 14, if we aren't, the space to the right of 14 is dead
//At any rate, we need to do a modulo operation to determine how to proceed. Along the right edge, (index % width = width - 1)
//Along the left edge, (index % width = 0). This is a simple check to see if we're at an edge that can be run on each cell.

//If we're considering 2, how does the program determine that it's on the top of the array? index % height won't work
//Consider what's true for the top and bottom exclusively:
//0, 1 is always going to be equal to the array's width. This means that the first X cells < width. if *life_array[index] < width,
//it's on the top row. The cells on the bottom row will be a minimum of width * (height - 1), and a maximum of 1-(width*height)
//if index >= width * (height - 1), it's on the bottom row.

//Corner case: if both of the above conditions are true, the index must be in a corner.

void get_adjacents(int index, int width, int height, unsigned int *life_array) {
    //Check if index is left edge
    int total;
    if (index % width == 0) {
        total += life_array[index + (width * 2 - 1)]; // 1
        total += life_array[index + width]; // 2
        total += life_array[index + (width + 1)]; // 3
        total += life_array[index + (width - 1)]; // 4
        total += life_array[index + 1]; // 6
        total += life_array[index - 1]; // 7
        total += life_array[index - width]; // 8
        total += life_array[index - (width - 1)]; // 9
    }
    //Check if index is on right edge
    else if (index % width == (width - 1)) {

    }
    //If index is on neither edge
    else {

    }
}