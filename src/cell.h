#ifndef _CELL_H_
#define _CELL_H_
//defines cells, each cell contains pointers to up to eight adjacent cells, and a live/dead toggle
//Naming schema for adjacency follows numpad notation, i.e. dir_9 refers to the cell upwards and to the right, dir_4 refers to
//the square to the left, dir_5 is unused, but would refer to the square itself
typedef struct cell {
  char life;
  struct cell *dir_1, *dir_2, *dir_3, *dir_4, *dir_6, *dir_7, *dir_8, *dir_9;
};

#endif