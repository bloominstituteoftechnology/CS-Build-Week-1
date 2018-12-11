#include "grid.h"
#include "cell.h"
#include <stdio.h>
#include <stdlib.h>
/*Generating cells:
Use the grid's X and Y parameters to generate a skeleton of cells along the X and Y axes
Cells along the X axis will grow from the origin as linked by its dir_6 property, and the subsequent cell will linked to the previous
cell by its dir_4 property. After the skeleton is built out, build each line one-by one, checking dir_8 and dir_4 at each along the way
to link with them. From those target cells, link to our working cells by their dir_2 and dir_6 properties respectively. 
If linkages to both said directions are found(not NULL), check the cell in dir_4's linkage at dir_8. Link that cell to our working cell
 at dir_3, link our working cell to that cell at dir_7.
*/ 

//Build origin cell
struct cell *buildorigin() {
    struct cell *origin = malloc(sizeof(*origin));
    origin->life = 0;
    origin->dir_1 = malloc(sizeof(*origin->dir_1));
    origin->dir_2 = malloc(sizeof(*origin->dir_2));
    origin->dir_3 = malloc(sizeof(*origin->dir_3));
    origin->dir_4 = malloc(sizeof(*origin->dir_4));
    origin->dir_6 = malloc(sizeof(*origin->dir_6));
    origin->dir_7 = malloc(sizeof(*origin->dir_7));
    origin->dir_8 = malloc(sizeof(*origin->dir_8));
    origin->dir_9 = malloc(sizeof(*origin->dir_9));

    return origin;
}


