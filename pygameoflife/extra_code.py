# def mouse_events():
#     LEFT = 1
#     RIGHT = 3

#     running = 1
#     screen = pygame.display.set_mode((320, 200))

#     while running:
#         event = pygame.event.poll()
#         if event.type == pygame.QUIT:
#             running = 0
#         elif event.type == pygame.MOUSEBUTTONDOWN and event.button == LEFT:
#             print "You pressed the left mouse button at (%d, %d)" % event.pos
#         elif event.type == pygame.MOUSEBUTTONUP and event.button == LEFT:
#             print "You released the left mouse button at (%d, %d)" % event.pos
#         elif event.type == pygame.MOUSEBUTTONDOWN and event.button == RIGHT:
#             print "You pressed the right mouse button at (%d, %d)" % event.pos
#         elif event.type == pygame.MOUSEBUTTONUP and event.button == RIGHT:
#             print "You released the right mouse button at (%d, %d)" % event.pos

#         screen.fill((0, 0, 0))
#         pygame.display.flip()

# ---------------------------------------------------------------------------------------

# def glider_gun(self):
#     glider_gun =[
#         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
#         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
#         [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
#         [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
#         [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
#         [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
#         [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
#         [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
#         [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
#         ]
#     self.screen_width = 700
#     self.screen_height = 500
#     self.cell_size = 10
#     self.init_grids()
#     padding_row = 10
#     padding_col = 10
#     row = 0
#     col = 0
#     for row in range(0, 9):
#         for col in range(0, 36):
#             # overwrite current cell state with those in glider_gun variable
#             print("CC: ", self.grids[self.active_grid][row + padding_row][col + padding_col])
#             print("GG: ", glider_gun[row][col])
#             self.grids[self.active_grid][row + padding_row][col + padding_col] = glider_gun[row][col]
#     # X = np.zeros((int(self.screen_width/self.cell_size), int(self.screen_height/self.cell_size)))
#     # X = np.array(X)
#     # X[1:10,1:37] = glider_gun
#     pygame.display.flip()
    