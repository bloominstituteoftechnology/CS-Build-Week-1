# import pygame
import sys
import time
import random

import pygame

# colors
black = 0,0,0
red = 255, 0, 0
cyan = 0, 255, 255

# vars
BOARD_SIZE = WIDTH, HEIGHT = 640, 480
CELL_SIZE = 10
DEAD_COLOR = black
ALIVE_COLOR = cyan

class GameOfLife():
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode(BOARD_SIZE)
        self.clear_screen()
        self.cell_size = 10
        self.cell_radius = self.cell_size / 2
        pygame.display.flip()

        self.init_grids()
    
    def init_grids(self):
        """
        Function for the initial grid
        """
        self.num_cols = int(WIDTH / CELL_SIZE)
        self.num_rows = int(HEIGHT / CELL_SIZE)
        print("Columns: %d\nRows: %d" %(self.num_cols, self.num_rows))
 
        # self.grids = [[[0] * self.num_rows] * self.num_cols,
        #               [[0] * self.num_rows] * self.num_cols]
        self.grids = []
        rows = []
        row_num = 0
        for row_num in range(self.num_rows):
            list_of_columns = [0] * self.num_cols
            rows.append(list_of_columns)
        
        print(rows)
        print(len(rows))
        self.active_grid = 0
        self.grids.append(rows)
        self.set_grid()
        

    def set_grid(self, value=None):
        """
        Creates random grid of alive / dead cells
        set_grid(0): all cells dead
        set_grid(1): all cells alive
        set_grid(): random cell_state grid
        """
        for row in range(self.num_rows):
            for col in range(self.num_cols):
                self.grids[self.active_grid][row][col] = random.choice([0, 1])

    def draw_grid(self):
        """
        Draws circles for alive cells.
        """
        # clear the screen
        self.clear_screen
        # draw the grid going col by col and row by row
        for col in range(self.num_cols):
            for row in range(self.num_rows):
                # if grid value is 1 (alive), set it to that color
                if self.grids[self.active_grid][row][col] == 1:
                    color = ALIVE_COLOR
                # else if grid value is 0 (dead), set it to that color
                else:
                    color = DEAD_COLOR
                pygame.draw.circle(self.screen, 
                                   color, 
                                 (int(col * self.cell_size + self.cell_radius), 
                                  int(row * self.cell_size + self.cell_radius)), 
                                  int(CELL_SIZE / 2), 
                                  0)
        # flip to save display state
        pygame.display.flip()


    def clear_screen(self):
        """
        Clears our screen to default color: currently -- black
        """
        self.screen.fill(DEAD_COLOR)
        self.init_grids()

    def user_events(self):
        """
        Handles user events (user presses keys indicated below):

        "s": Toggle Game Pause
        "r": Create Random Grid of Alive / Dead Cells
        "q": Quit the Game of Life
        """
        for event in pygame.event.get():
            # if event is keypress of "s" then toggle game pause
            # if event is keypress of "r" then set grid
            # if event is keypress of "q" then quit
            if event.type == pygame.QUIT: sys.exit()
        
        self.screen.fill(DEAD_COLOR)

            # blit to draw
            #screen.blit(ball, ballrect)

            # flip to push into memory
            # pygame.display.flip()

    def generation_next(self):
        """
        Inspect the crrent active generation.
        Update the inactive grid to store next generation.
        Swap out the active grid.
        """
        self.set_grid(None)

    def run(self):
        """Main loop, runs game of life"""
        while True:
            # Handle events, update the generation, and draw the grid.
            self.user_events()

            # time_checking?
            self.generation_next()
            self.draw_grid()
            time.sleep(0.5)
            
if __name__ == "__main__":
    game = GameOfLife()
    game.run()