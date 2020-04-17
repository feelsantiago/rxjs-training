/**
 * How to dispose observables and ensure unsubscribes
 */

import { Observable, interval, Subscription, observable } from 'rxjs';
import { SubSink } from 'subsink';

import { Lesson } from '../lesson';
import { logSection } from '../utils/formatter';

// Each subscribe create a strong reference
// Each subscribe create a exclusive execution
// We have to explicit unsubscribe
const exclusiveExecution = () => {
    logSection('Exclusive Execution');
    const source = interval(1000);

    // first execution
    const firstSubscription = source.subscribe((value) => console.log(`First Subscription Value: ${value}`));

    // after 2 second we create a second subscription;
    let secondSubscription: Subscription;
    setTimeout(() => {
        secondSubscription = source.subscribe((value) => console.log(`Second Subscription Value: ${value}`));
    }, 2000);

    // after 5 seconds we unsubscribe
    setTimeout(() => {
        firstSubscription.unsubscribe();
        secondSubscription.unsubscribe();
        logSection('Exclusive Execution End');
    }, 5000);
};

/**
 * Strong reference is keep by the observable
 */
const deleteExecution = () => {
    logSection('Strong Reference')
    const source = interval(1000);

    const component = {
        observable: source.subscribe((value) => console.log(`Subscription Value: ${value}`)),
    };

    setTimeout(() => {
        // Even cleaning the reference the observable keep consuming
        delete component.observable;
    }, 3000)
};

/**
 * Keep track through a lib call SubSink
 * https://github.com/wardbell/subsink
 */
const unsubscribeObservables = () => {
    logSection('Unsubscribe Observable');
    const source = interval(1000);

    const subscriptions = new SubSink();

    subscriptions.sink = source.subscribe((value) => console.log(`First: ${value}`));
    subscriptions.sink = source.subscribe((value) => console.log(`Second: ${value}`));

    // after 5 seconds unsubscribe all
    // this could go on ngOnDestroy Method
    setTimeout(() => {
        subscriptions.unsubscribe();
        logSection('Unsubscribe Observable End');
    }, 5000)
}

export const DisposeLesson: Lesson = {
    run() {
        exclusiveExecution();
        // deleteExecution();
        // unsubscribeObservables();
    },
};
