//defines cells, each cell contains pointers to up to eight adjacent cells, and a live/dead toggle
//Naming schema for adjacency follows numpad notation, i.e. dir_9 refers to the cell upwards and to the right, dir_4 refers to
//the square to the left, dir_5 is unused, but would refer to the square itself
typedef struct cell {
  int life = 0;
  char *dir_1;
  char *dir_2;
  char *dir_3;
  char *dir_4;
  char *dir_6;
  char *dir_7;
  char *dir_8;
  char *dir_9;
}