class GameOfLife {
    void nextGeneration(int[][] board) {
        int m = board.length;
        int n = board[0].length;
        int[][] newboard = new int[m][n];
        for(int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int neighbours = countNeighbours(board, i, j);
                if (neighbours >= 2) newboard[i][j] = 1;
            }
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = newboard[i][j];
    }

    int countNeighbours(int[][] board, int i, int j) {
        int count = 0;
        int m = board.length;
        int n = board[0].length;
        for (int x = -1; x <= 1; x++) {
            for (int y = -1; y <= 1; y++) {
                if (x == 0 && y == 0) continue;
                int px = i + x;
                int py = j + y;
                if (px >= 0 && px < m && py >= 0 && py < n) {
                    if (board[px][py] == 1) count++;
                }
            }
        }
        return count;
    }