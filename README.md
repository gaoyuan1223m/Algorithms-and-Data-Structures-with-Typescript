# Typescript for Algorithms and Data Structures

*keyword*: *Typescript, ts-jest, module-alias*

![Algorithms and Data Structures](./assets/img/main/background.png)

## Getting Started

> - Step 1: git clone https://github.com/gaoyuan1223m/TypescriptForAlgorithmsAndDataStructures.git
> - Step 2: npm install
> - Step 3: npm test

## Data Structures

### Array

Array refers to a sequence of elements which can be visited by their indices. Array can be created by **ArrayFactory** imported from this repo. Generic Method "*create<T>()*" in ArrayFactory recieves two parameters, first one is capacity of the Array to create, while second one, optional, is incremental of the Array. 

- [Static Array](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/array/array.ts)

```
import { ArrayFactory } from "@DataStructure/array";

const capacity = 5;

const staticArray = ArrayFactory.create<number>(capacity);
```
<img src="assets/img/array/static-array.png" width="100%" height="450px">

- [Dynamic Array](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/array/array.ts)

```
import { ArrayFactory } from "@DataStructure/array";

const capacity = 5, incremental = 5;

const dynamicArray = ArrayFactory.create<number>(capacity, incremental);
```

<img src="assets/img/array/dynamic-array.png" width="100%" height="450px">

### Linked List

- [Singly Linked List](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/linked-list/linked-list.ts)

<img src="assets/img/linked-list/singly-linked-list.png" width="100%" height="300px">

- [Doubly Linked List](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/linked-list/linked-list.ts)

<img src="assets/img/linked-list/doubly-linked-list.png" width="100%" height="300px">

- [Circular Linked List](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/linked-list/linked-list.ts)

<img src="assets/img/linked-list/circular-singly-linked-list.png" width="100%" height="300px">

- [Skip Linked List](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/linked-list/linked-list.ts)

<img src="assets/img/linked-list/skip-list.png" width="100%" height="200px">

### Stack

- [Stack](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/stack-queue/stack.ts)

<img src="assets/img/stack/stack.png" width="100%" height="500px">

### Queue

- [Queue](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/stack-queue/queue.ts)

<img src="assets/img/queue/queue.png" width="100%" height="600px">

### Deque

- [Deque](https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/blob/master/src/DataStructure/stack-queue/deque.ts)

<img src="assets/img/deque/deque.png" width="100%" height="400px">

### Tree

- BST

- AVL

- RBT

### Hashing

- Dictionary

- UniqueSet

### Graph

- Direction


## Algorithms

### Sort
