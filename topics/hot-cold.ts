/**
 * Hot observables - share the producer
 * Cold observables - each subscriptions has its own producer
 */

import { Lesson } from '../lesson';
import { Observable, Subscriber } from 'rxjs';
import { logSection } from '../utils/formatter';

/**
 * Cold observables produce new values on each execution
 */
const coldObservable = () => {

    logSection('Cold Observable Example')

    const observable = new Observable((subscriber: Subscriber<number>) => {
        // The producer is called for each execution (subscription);
        const num = Math.floor(Math.random() * 100);
        subscriber.next(num);
        subscriber.complete();
    });

    observable.subscribe((num) => console.log(`First Subscription value: ${num}`));
    observable.subscribe((num) => console.log(`Second Subscription value: ${num}`));

    logSection('Cold Observable Example End');
}

/**
 * Hot observables share the values between executions
 */
const hotObservable = () => {
    logSection('Hot Observable Example');

    // The producer is shared among the subscriptions
    const num = Math.floor(Math.random() * 100);

    const observable = new Observable((subscriber: Subscriber<number>) => {
        subscriber.next(num);
        subscriber.complete();
    });

    observable.subscribe((num) => console.log(`First Subscription value: ${num}`));
    observable.subscribe((num) => console.log(`Second Subscription value: ${num}`));

    logSection('Hot Observable Example End');
};

export const HotColdLesson: Lesson = {
    run() {
        coldObservable();
        hotObservable();
    },
};
