/**
 * Operators are the middleware between the producer and the consumer,
 * They can transform, combine, shape, group, merge and many other operations, before the value
 * can be consumed
 * https://www.learnrxjs.io/
 */

import { Lesson } from '../lesson';
import { interval, of, forkJoin, zip, concat, merge } from 'rxjs';
import { map, filter, tap, delay } from 'rxjs/operators';
import { logSection } from '../utils/formatter';

/**
 * Operators change the execution
 */
const basic = () => {
    logSection('Basic Pipe Operators');

    const time = interval(1000);

    // Pipe returns a new observable
    const timex10 = time.pipe(map((value) => value * 10));
    timex10.subscribe((value) => console.log(`New value: ${value}`));
};

/**
 * Equivalent to Promise.all()
 */
const wait = () => {
    logSection('Wait All Observables');

    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6);
    const obs3 = of(7, 8, 9);

    // When all observables complete, emit the last emitted value from each
    const waitLast = forkJoin([obs1, obs2, obs3]);
    waitLast.subscribe((values) => console.log(`Last Values: ${values}`));

    console.log('-');

    const waitAll = zip(obs1, obs2, obs3);
    waitAll.subscribe((values) => console.log(`All Values: ${values}`));

    logSection('Wait All Observables End');
};

/**
 * Operators are executed in sequence, where the previous output is send to the next
 */
const order = () => {
    logSection('Order Example');

    const obs = interval(1000).pipe(
        // Tap is a useful operator to log the value, see whats is happening and trigger side effects
        // Tap do not modify the value
        tap(() => console.log('\n')),
        tap((value) => console.log(`Value produced: ${value}`)),
        filter((value) => (value % 2) === 0),
        tap((value) => console.log(`Value filtered: ${value}`)),
        map((value) => value * 10),
        tap((value) => console.log(`Value after map: ${value}`)),
    );

    obs.subscribe((value) => console.log(`Value emitted: ${value}`));
};

/**
 * Combine multiples observables
 */
const combine = () => {

    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6).pipe(delay(2000));
    const obs3 = of(7, 8, 9);

    // Concat keeps the order of emission
    // Concat waist the previous observable complete to subscribe on the next
    concat(obs1, obs2, obs3).subscribe((value) => console.log(`Concat value: ${value}`));

    // Merge subscribe to all observable and emits they values
    merge(obs1, obs2, obs3).subscribe((value) => console.log(`Merge value: ${value}`));
}

export const Operators: Lesson = {
    run() {
        basic();
        // wait();
        // order();
        // combine();
    },
};
