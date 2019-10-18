import { LinkedListQueue, ArrayQueue } from "./queue";

/**
 * @test_LinkedListQueue
 */
const llq = new LinkedListQueue<number>();
llq.enqueue(0);
llq.enqueue(11);
llq.enqueue(22);
llq.enqueue(45);
llq.dequeue();
llq.dequeue();
llq.enqueue(67);
llq.enqueue(76);
llq.print();

console.log(llq.size);

/**
 * @test_ArrayQueue
 */

const aq = new ArrayQueue<number>();
aq.enqueue(0);
aq.enqueue(11);
aq.enqueue(22);
aq.enqueue(45);
aq.dequeue();
aq.dequeue();
aq.enqueue(67);
aq.enqueue(76);
aq.print();

console.log(aq.size);