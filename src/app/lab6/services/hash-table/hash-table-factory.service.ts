import { Injectable } from '@angular/core';
import { ChainedHashTable } from '../../src/chainedHashTable';
import { HashTable } from '../../src/hashTable';
import { OpenScatterHashTable } from '../../src/openScatterHashTable';

@Injectable()
export class HashTableFactoryService {

  constructor() { }

  getChainedHashTable(length: number): HashTable<string> {
    return new ChainedHashTable<string>(length);
  }

  getOpenScatterHashTable(length: number): HashTable<string> {
    return new OpenScatterHashTable<string>(length);
  }
}
