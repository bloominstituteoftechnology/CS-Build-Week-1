from abc import ABC, abstractmethod

class Rule(ABC):
    @abstractmethod
    def apply_rules(self, grid, max_size, get_neighbours):
        pass