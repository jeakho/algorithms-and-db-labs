import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HashTableFactoryService } from './services/hash-table/hash-table-factory.service';
import { SettingsDialogComponent } from './settings-dialog.component';
import { ChainedHashTable } from './src/chainedHashTable';
import { HashTable } from './src/hashTable';

export enum InitTableOperationType {
  WITH_REHASH,
  WITHOUT_REHASH
}

export enum HashTableType {
  OPEN_ADDRESSING = "Open addressing",
  CLOSED_ADDRESSING = "Closed addressing"
}

interface MainFormModel {
  key: string,
  selectedRadio: number
}

interface HashTableConfig {
  length: number,
  type: HashTableType
}

export interface SettingsDialogModel {
  length: number,
  operationType: InitTableOperationType,
  tableType: HashTableType
}

@Component({
  selector: 'app-lab6',
  templateUrl: './lab6.component.html',
  styleUrls: ['./lab6.component.css'],
  providers: [HashTableFactoryService]
})
export class Lab6Component implements OnInit, OnDestroy {
  hashTableClassForm: FormGroup;
  private subscriptions: Subscription[] = [];

  private radioBtnToHashTableOperation: Map<number, (key: string, value: any) => void>;
  private hashTableTypeToFactoryGetMethod: Map<HashTableType, (length: number) => HashTable<string>>;
  private hashTableTypeToInitMethod: Map<InitTableOperationType, () => void>

  private mainFormModel: MainFormModel;
  private table: HashTable<string>;
  private hashTableConfig: HashTableConfig;
  private settingsDialogModel: SettingsDialogModel;

  constructor(
    private fb: FormBuilder,
    private htfs: HashTableFactoryService,
    private settingsDialog: MatDialog
  ) {

    this.hashTableTypeToFactoryGetMethod = new Map([
      [HashTableType.OPEN_ADDRESSING, this.htfs.getChainedHashTable],
      [HashTableType.CLOSED_ADDRESSING, this.htfs.getOpenScatterHashTable]
    ]);

    this.hashTableTypeToInitMethod = new Map([
      [InitTableOperationType.WITH_REHASH, this.initTableWithRehash.bind(this)],
      [InitTableOperationType.WITHOUT_REHASH, this.initTableWithoutRehash.bind(this)]
    ]);

    this.hashTableConfig = {
      length: 10,
      type: HashTableType.OPEN_ADDRESSING
    }

    this.initTableWithoutRehash();

    this.mainFormModel = {
      key: 'abcde',
      selectedRadio: 1
    }

    this.settingsDialogModel = {
      length: 10,
      operationType: InitTableOperationType.WITH_REHASH,
      tableType: HashTableType.OPEN_ADDRESSING
    }
  }

  get currentlyAvailableHashTableName(): string {
    return this.hashTableConfig.type
  }

  get tableContent() {
    return this.table.entries();
  }

  get key() {
    return this.hashTableClassForm.get('key');
  }

  get selectedRadio() {
    return this.hashTableClassForm.get('selectedRadio');
  }

  initTableWithoutRehash(): void {
    this.table = this.hashTableTypeToFactoryGetMethod.get(this.hashTableConfig.type)(this.hashTableConfig.length);

    this.radioBtnToHashTableOperation = new Map([
      [1, this.table.insert.bind(this.table)],
      [2, this.table.remove.bind(this.table)],
      [3, this.table.find.bind(this.table)]
    ]);
  }

  initTableWithRehash(): void {
    const records = this.table.records();

    this.initTableWithoutRehash();

    records.forEach(record => this.table.insert(record[0], record[1]));
  }

  openTableSettings(): void {
    const dialogRef = this.settingsDialog.open(SettingsDialogComponent, {
      width: '350px',
      height: '400px',
      data: this.settingsDialogModel
    })

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result: SettingsDialogModel) => {
        if (!result) return;

        Object.assign(this.hashTableConfig, {
          length: result.length,
          type: result.tableType
        })
        
        this.hashTableTypeToInitMethod.get(result.operationType)();
      })
    )
  }

  performOperation() {
    if (this.radioBtnToHashTableOperation.get(this.mainFormModel.selectedRadio).name === "bound " + this.table.insert.name &&
      this.table.find(this.mainFormModel.key) !== undefined
    ) {
      alert(`An element "${this.mainFormModel.key}" already exists!`);
      return;
    }

    if (this.radioBtnToHashTableOperation.get(this.mainFormModel.selectedRadio).name === "bound " + this.table.remove.name && 
      this.table.find(this.mainFormModel.key) === undefined
    ) {
      alert(`An element "${this.mainFormModel.key}" does not exist!`);
      return;
    }

    let res: any = this.radioBtnToHashTableOperation.get(this.mainFormModel.selectedRadio)(this.mainFormModel.key, this.mainFormModel.key);

    if (this.radioBtnToHashTableOperation.get(this.mainFormModel.selectedRadio).name === "bound " + this.table.find.name) {
      alert(res || 'NULL');
    }
  }

  clearTable(): void {
    this.table.clear();
  }

  getRecodsValueTextRepresentation(entries: [string, string][]): string {
    return entries.map(record => record[1]).join(', ');
  }

  ngOnInit(): void {
    this.hashTableClassForm = this.fb.group({
      key: [this.mainFormModel.key, Validators.required],
      selectedRadio: [this.mainFormModel.selectedRadio, Validators.required]
    })

    this.subscriptions.push(
      this.hashTableClassForm.valueChanges.subscribe(model => Object.assign(this.mainFormModel, model))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
