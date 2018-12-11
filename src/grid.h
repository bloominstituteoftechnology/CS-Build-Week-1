#ifndef _GRID_H_
#define _GRID_H_

//Define grid, grid contains variables for x and y dimensions, as well as a pointer to each cell
typedef struct grid {
    int *x;
    int *y;
    struct cell;
};

#endif