import { Action } from '@ngrx/store';

export const FILTER_PRODUCTS = '[Filter] Filter';

export class FilterProducts implements Action {
    readonly type: string = FILTER_PRODUCTS;
    constructor(public payload: number) {}
}