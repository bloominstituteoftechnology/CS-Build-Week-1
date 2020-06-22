import pygame

def find_neighbors(i, j, arr):
    neighbors = []
    MAX = len(arr)
    total = 0

    #Find top left
    if i - 1 >= 0 and j - 1 >= 0:
        neighbors.append(arr[i-1][j-1])
    #Find top middle
    if i - 1 >= 0:
        neighbors.append(arr[i-1][j])
    #Find top right
    if i - 1 >= 0 and j + 1 < MAX:
        neighbors.append(arr[i-1][j+1])
    #Find left
    if j - 1 >= 0:
        neighbors.append(arr[i][j-1])
    #Find right
    if j + 1 < MAX:
        neighbors.append(arr[i][j+1])
    #Find bottom left
    if i + 1 < MAX and j - 1 >= 0:
        neighbors.append(arr[i+1][j-1])
    #Find bottom middle
    if i + 1 < MAX:
        neighbors.append(arr[i+1][j])
    #Find bottom right
    if i + 1 < MAX and j + 1 < MAX:
        neighbors.append(arr[i+1][j+1])

    for num in neighbors:
        total += num

    return total



def main():
    l = [ [0] * 10 for i in range(10) ]
    # print(l)
    l[4][4] = 1

    print(len(l))

if __name__ == '__main__':
    main()
