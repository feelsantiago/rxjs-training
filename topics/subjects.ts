/**
 * Special type of Observable that allows values to be multicasted to many Observers.
 * While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable),
 * Subjects are multicast
 * Like EventEmitters
 */

import { Lesson } from '../lesson';
import { Subject, BehaviorSubject, AsyncSubject } from 'rxjs';
import { logSection } from '../utils/formatter';

/**
 * Create subjects and subscriber to then
 */
const basic = () => {
    logSection('Basic Subject');
    const subject = new Subject<number>();

    console.log('Create Subscriptions');

    // Subscribe does not invoke a new execution that delivers values
    subject.subscribe((value) => console.log(`First Subscriber value: ${value}`));
    subject.subscribe((value) => console.log(`Second Subscriber value: ${value}`));

    console.log('Send Values');
    subject.next(1);
    subject.next(2);

    logSection('Basic Subject End');
};

/**
 * Emits the last value on subscriber
 */
const behavior = () => {
    logSection('Behavior Subject');

    const subject = new BehaviorSubject<number>(1);
    console.log('Create Subscriptions');

    // Subscribe emit immediately the last value
    subject.subscribe((value) => console.log(`First Subscriber value: ${value}`));
    subject.subscribe((value) => console.log(`Second Subscriber value: ${value}`));

    console.log('Send Values');
    subject.next(2);
    subject.next(3);

    logSection('Behavior Subject End');
}

/**
 * Emits the last value after the subject complete
 */
const async = () => {
    logSection('Async Subject');

    const subject = new AsyncSubject<number>();
    console.log('Create Subscriptions');

    // Will only receive the value when the subscriber complete
    subject.subscribe((value) => console.log(`First Subscriber value: ${value}`));
    subject.subscribe((value) => console.log(`Second Subscriber value: ${value}`));

    console.log('Send Values');
    subject.next(1);
    subject.next(2);
    subject.complete();

    logSection('Async Subject End');
};

export const Subjects: Lesson = {
    run() {
        basic();
        // behavior();
        // async();
    },
};
