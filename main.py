import IPython.display
from io import BytesIO as bio
import PIL.Image
import matplotlib.pyplot as plt
import matplotlib
import time
from sparse_set_rules import SparseSetRules
from sparse_set_state import SparseSetState
from game import Game
matplotlib.use('GTK3Agg')

MAX_ITER = 1500
MAX_SIZE = 80
board = {(39, 40), (39, 41), (40, 39), (40, 40), (41,  40)}
rules = SparseSetRules()
game = Game(SparseSetState(board), rules, MAX_SIZE)
t = time.time()
rw = game.run_game(MAX_ITER)
print(time.time() - t)