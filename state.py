from abc import ABC, abstractmethod

class State(ABC):
    @abstractmethod
    def copy(self):
        pass

    @abstractmethod
    def apply_rules(selfself, rules, max_size):
        pass

    @abstractmethod
    def equals(self, other):
        pass

    @abstractmethod
    def get_neighbours(self, elem, max_size):
        pass

