import { EventEmitter } from '@angular/core';

export interface INotifyChanges {
    changes: EventEmitter<{
        type?: any,
        value?: any
    }>
}