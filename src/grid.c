#include "grid.h"
#include "cell.h"
#include <stdio.h>
#include <stdlib.h>

//Builds a grid
struct grid *alloc_grid(int x, int y) {
    struct grid *grid_a = malloc(sizeof *grid_a);
    grid_a->x = x;
    grid_a->y = y;


    return grid_a;
}

//Frees target grid
void free_grid(struct grid *target) {
    free(target);
}

//Build origin cell
struct cell *build_cell(struct cell *newcell) {
    struct cell *newcell = malloc(sizeof(*newcell));
    newcell->life = 0;
    newcell->dir_1 = malloc(sizeof(*newcell->dir_1));
    newcell->dir_2 = malloc(sizeof(*newcell->dir_2));
    newcell->dir_3 = malloc(sizeof(*newcell->dir_3));
    newcell->dir_4 = malloc(sizeof(*newcell->dir_4));
    newcell->dir_6 = malloc(sizeof(*newcell->dir_6));
    newcell->dir_7 = malloc(sizeof(*newcell->dir_7));
    newcell->dir_8 = malloc(sizeof(*newcell->dir_8));
    newcell->dir_9 = malloc(sizeof(*newcell->dir_9));

    return newcell;
}

//Build out skeleton
void build_skeleton(struct grid *target) {
    struct cell *origin = build_cell("0");
    char cellname;
    for(int i = 1; i < target->x; i++) {
        sprintf(cellname, "%d", i);
        build_cell(cellname);
        cellname->dir_4 = i-1;
    }
}