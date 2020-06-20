class SparseSetState(State):
    def __init__(self, grid):
        self.grid = grid

    def copy(self):
        return SparseSetState(copy(self.grid))

    def get_neighbours(selfself, elem, max_size):
        l = []
        if elem[0] - 1 >= 0:
            l.append((elem[0] - 1, elem[1]))
        if elem[0] - 1 >= 0 and elem[1] - 1 >= 0:
            l.append((elem[0] - 1, elem[1] - 1))
        if elem[0] - 1 >= 0 and elem[1] + 1 < max_size:
            l.append((elem[0] - 1, elem[1] + 1))
        if elem[1] - 1 >= 0:
            l.append((elem[0] - 1, elem[1] - 1))
        if elem[1] - 1 >= 0 and elem[0] + 1 < max_size:
            l.append((elem[0] + 1, elem[1] - 1))
        if elem[1] + 1 < max_size:
            l.append((elem[0] + 1, elem[1]))
        if elem[0] + 1 < max_size:
            l.append((elem[0] + 1, elem[1]))
        if elem[1] + 1 < max_size and elem[0] + 1 < max_size:
            l.append((elem[0] + 1, elem[1] + 1))
        return l

    def equals(self, other):
        if other is None:
            return False
        return self.grid == other.grid

    def apply_rules(self, rules, max_size):
        self.grid = rules.apply_rules(self.grid, max_size, self.get_neighbours)
        return self