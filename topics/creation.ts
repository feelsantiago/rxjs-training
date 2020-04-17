/**
 * How to create observables
 */
import { Observable, empty, from, fromEvent, interval, of, range, Subscriber, throwError } from 'rxjs';

// For ajax calls
import { ajax } from 'rxjs/ajax';

import { Lesson } from '../lesson';
import { logSection } from '../utils/formatter';

/**
 * Create a observable through construct
 */
const basic = () => {
    logSection('First Example');

    // Call constructor through alias, have type check
    // But returns a Anonymous Subject
    // Is deprecated
    // const observable = Observable.create((subscriber: Subscriber<number>) => {

    // Call constructor directly
    // Always type, new doesn't enforce type check!
    const observable = new Observable((subscriber: Subscriber<number>) => {
        // sync
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);

        // async
        // Observables are design to the programmer not have to worry about
        // sync ou async code
        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
            subscriber.next(5);
        }, 1000);
    });

    // Lazy loading, the observable will only run if has a subscriber;
    observable.subscribe((value: number) => console.log(`First Subscriber - Value: ${value}`));
    observable.subscribe(
        (value: number) => console.log(`Second Subscriber - Value: ${value}`),
        (error: Error) => console.log(error),

        // Complete is only call when async operation ends
        () => logSection('First Example End')
    );

    console.log('~End of sinc results~');
};

/**
 * Make a ajax call through a observable
 * @throws This will not run on node!
 */
const wrapperAjax = () => {
    const githubUsers = `https://api.github.com/users?per_page=2`;
    const users = ajax(githubUsers);
    const subscribe = users.subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
    );
};

/**
 * Create a observable that immediately completes
 * Equivalent to Promise.resolve()
 */
const immediateCompletion = () => {
    logSection('Immediate Completion');
    const subscribe = empty().subscribe({
        next: () => console.log('Next'),
        complete: () => console.log('Complete!'),
    });
    logSection('Immediate Completion End');
};

/**
 * Turn Array, Promise or Iterables into observables
 * Arrays and iterables, all contained values will be emitted as a sequence
 * Emit string as a sequence of characters
 */
const fromOtherResource = () => {
    logSection('From Resource');

    // from Promise
    const promise = Promise.resolve('Promise result');
    const promiseObservable = from(promise);
    promiseObservable.subscribe(
        (value) => console.log(`Promise value: ${value}`),
        (error: Error) => console.log(error),
        () => logSection('From Resource End')
    );

    // from Array
    const values = [1, 2, 3];
    const valuesObservable = from(values);
    valuesObservable.subscribe((element) => console.log(`Array Value: ${element}`));

    // from String
    const name = 'Filipe';
    const nameObservable = from(name);
    nameObservable.subscribe((char) => console.log(`Char: ${char}`));
};

/**
 * Turn events into observable sequence
 * FrontEnd
 * @throws This will not run on node!
 */
const captureEvents = () => {
    const source = fromEvent(document, 'click');
    source.subscribe((val) => console.log(val));
};

/**
 * Emit numbers in sequence based on provided timeframe
 */
const intervalObservable = () => {
    logSection('Interval Observable');

    // Every 1 seconde
    const source = interval(1000);
    source.subscribe((value) => console.log(value));
};

/**
 * Emit variable amount of values in a sequence
 * Emits a complete notification
 */
const ofOtherResource = () => {
    logSection('Of Resource');

    const source = of(1, 2, 3);
    source.subscribe(
        (value) => console.log(`Value: ${value}`),
        (error: Error) => console.log(error),
        () => console.log('Values complete')
    );

    // Transform objects into observable
    const person = { firtname: 'filipe', lastname: 'santiago' };
    const personObservable = of(person);
    personObservable.subscribe((person) =>
        console.log(`First Name: ${person.firtname} | Last Name: ${person.lastname}`)
    );

    // Use to ensure that every function branch return a observable
    // Keep consistence
    const internalFunc = (value: boolean) => {
        // Conditional api call
        if (value) {
            return from(Promise.resolve(1));
        }

        // Error - Don't do this!
        // The function may or may not return a async operation
        // Who calls the function have to do explicity check
        // return 0;

        // Correct way
        return of(0);
    };

    internalFunc(false).subscribe(
        (value: number) => console.log(`Internal Function Value: ${value}`),
        (error: Error) => console.log(error),
        () => logSection('Of Resource End')
    );
};

/**
 * Emit numbers in provided range in sequence
 */
const rangeValues = () => {
    logSection('Range Values');

    const source = range(1, 5);
    source.subscribe((value) => console.log(value));

    logSection('Range Values End');
};

/**
 * Emit error on subscription
 */
const emitError = () => {
    logSection('Emit Error');

    const source = throwError('This is a error');
    source.subscribe(
        () => console.log('Next'),
        (error) => console.log(error)
    )

    logSection('Emit Error End');
};

export const CreationLesson: Lesson = {
    run() {
        basic();
        // immediateCompletion();
        // fromOtherResource();
        // intervalObservable();
        // ofOtherResource();
        // rangeValues();
        // emitError();
    },
};
