#include "grid.h"
#include "cell.h"
#include <stdio.h>
#include <stdlib.h>

//Builds a grid
struct grid *alloc_grid(int x, int y) {
    struct grid *newgrid = malloc(sizeof *newgrid);
    newgrid->x = x;
    newgrid->y = y;


    return newgrid;
}

//Frees target grid
void free_grid(struct grid *target) {
    free(target);
}

