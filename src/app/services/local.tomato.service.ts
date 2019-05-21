import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Array } from 'core-js';
import { Promise } from 'q';
import { Tomato } from './tomato';

@Injectable()
export class LocalTomatoService {
    tomatoes: BehaviorSubject<Array<Tomato>> = new BehaviorSubject([]);
    _tomatoes: Array<Tomato> = [];

    constructor() {
        this.read();
    }

    public create(newTomato: Tomato): Promise<Tomato> {
        const result = Promise<Tomato>((resolve, reject) => {
            this._tomatoes.push(newTomato);
            this.tomatoes.next(this._tomatoes);
            resolve(newTomato);
        });

        return result;
    }

    public read(): void {
        this._tomatoes = [
            // new Tomato('3', new Date(), '0'),
            // new Tomato('4', new Date(), '0'),
            // new Tomato('5', new Date(), '0'),
            // new Tomato('6', new Date(), '0'),
            // new Tomato('7', new Date(), '0'),
            // new Tomato('8', new Date(), '0'),
            // new Tomato('9', new Date(), '0'),
            // new Tomato('10', new Date(), '0'),
            // new Tomato('1', new Date(), '0'),
            // new Tomato('2', new Date(), '0'),
            // new Tomato('3', new Date(), '0'),
            // new Tomato('4', new Date(), '0'),
            // new Tomato('5', new Date(), '0'),
            // new Tomato('6', new Date(), '0'),
            // new Tomato('7', new Date(), '0'),
            // new Tomato('8', new Date(), '0'),
            // new Tomato('9', new Date(), '0'),
            // new Tomato('10', new Date(), '0')
        ];

        this.tomatoes.next(this._tomatoes);
    }

    public update(tomatoToUpdate: Tomato): Promise<Tomato> {
        const result = Promise<Tomato>((resolve, reject) => {
            this._tomatoes.push(tomatoToUpdate);
            this.read();
            resolve(tomatoToUpdate);
        });

        return result;
    }

    public delete(id: string): Promise<Tomato> {
        const result = Promise<Tomato>((resolve, reject) => {
            this.read();
            resolve(undefined);
        });

        return result;
    }
}