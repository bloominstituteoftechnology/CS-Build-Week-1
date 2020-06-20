from rule import Rule

class SparseSetRules(Rule):
    def apply_rules(self,  grid, max_size, get_neighbours):
        counter = {}
        for elem in grid:
            if elem not in counter:
                counter[elem] = 0
            nb = get_neighbours(elem, max_size)
            for n in nb:
                if n not in counter:
                    counter[n] = 1
                else:
                    counter[n] += 1

        for c in counter:
            if(counter[c] < 2 or counter[c] > 3):
                grid.discard(c)
            if counter[c] == 3:
                grid.add(c)

        return grid