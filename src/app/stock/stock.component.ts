import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import alanBtn from '@alan-ai/alan-sdk-web';


export interface StockTable {
  index: string;
  articleNumber: string;
  description: string;
  batch: string;
  variant: string;
  weight: string;
  location: string;
  pid: string;
  quantity: string;
  storingDate: string;
}

/**
 * @title Sorting overview
 */
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  index: string = '';
  articleNumber: string = '';
  description: string = '';
  batch: string = '';
  variant: string = '';
  weight: string = '';
  location: string = '';
  pid: string = '';
  quantity: string = '';
  storingDate: string = '';

  stockTable: StockTable[] = [
    {
      index: '1',
      articleNumber: '202028',
      description: 'calculator',
      batch: '24685',
      variant: 'red',
      weight: '0.03',
      location: 'BEW',
      pid: '201910',
      quantity: '1',
      storingDate: '19.10.2022'
    },
    {
      index: '2',
      articleNumber: '202023',
      description: 'pen',
      batch: '24685',
      variant: 'red',
      weight: '0.01',
      location: 'BVE',
      pid: '9000113',
      quantity: '2',
      storingDate: '19.10.2022'
    },
    {
      index: '3',
      articleNumber: '202016',
      description: 'safety sign',
      batch: '24685',
      variant: 'blue',
      weight: '0.31',
      location: 'BVE',
      pid: '9000114',
      quantity: '1',
      storingDate: '18.10.2022'
    },
    {
      index: '4',
      articleNumber: '202018',
      description: 'suitcase',
      batch: '87495',
      variant: 'yellow',
      weight: '2.91',
      location: 'FBL020101',
      pid: '201587',
      quantity: '3',
      storingDate: '19.10.2022'
    }
  ];

  descriptions = ["calculator", "pen", "safety sign", "suitcase", "1", "3"];

  addItem(description: string, articleNumber: string, batch: string, variant: string, weight: string, location: string, pid: string, quantity: string, storingDate: string) {
    this.stockTable.push({
      index: (this.stockTable.length+1).toString(),
      articleNumber: articleNumber,
      description: description,
      batch: batch,
      variant: variant,
      weight: weight,
      location: this.location,
      pid: this.pid,
      quantity: this.quantity,
      storingDate: this.storingDate
    });
    
    this.sortedData = this.stockTable.slice();
    
    this.descriptions.push(articleNumber, description, batch, variant, weight, location, pid, quantity, storingDate);
    let values = this.descriptions;
    this.alanBtnInstance.setVisualState({values});
  }
  

  sortedData: StockTable[];

  searchText = '';
  alanBtnInstance;


  constructor(private router: Router) {
    this.sortedData = this.stockTable.slice();
    this.alanBtnInstance = alanBtn({
      key: '2ec5b4d0f7c942fe209c255d41bee8d62e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command === 'navigation' && commandData.route) {
          this.router.navigateByUrl(commandData.route);
        }
        else if (commandData.command === 'setType') {
          this.searchText = commandData.type;
        }
        else if (commandData.command === 'addArtNumber') {
          this.articleNumber = commandData.artNumber;
        }
        else if (commandData.command === 'addDescription') {
          this.description = commandData.description;
        }
        else if (commandData.command === 'addBatch') {
          this.batch = commandData.batch;
        }
        else if (commandData.command === 'addVariant') {
          this.variant = commandData.variant;
        }
        else if (commandData.command === 'addWeight') {
          this.weight = commandData.weight;
        }
        else if (commandData.command === 'addLocation') {
          this.location = commandData.location;
        }
        else if (commandData.command === 'addPID') {
          this.pid = commandData.pid;
        }
        else if (commandData.command === 'addQuantity') {
          this.quantity = commandData.quantity;
        }
        else if (commandData.command === 'addDate') {
          this.storingDate = commandData.date;
        }
        else if (commandData.command === 'addItem') {
          let element:HTMLElement = document.getElementById('save') as HTMLElement;
          element.click();
        //  this.addItem(commandData.item, commandData.artNumber, commandData.batch, commandData.variant, commandData.weight);
        }
      },
    });
    let values = this.descriptions;
    this.alanBtnInstance.setVisualState({values});
  }  

  sortData(sort: Sort) {
    const data = this.stockTable.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'index':
          return compare(a.index, b.index, isAsc);
        case 'articleNumber':
          return compare(a.articleNumber, b.articleNumber, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'batch':
          return compare(a.batch, b.batch, isAsc);
        case 'variant':
          return compare(a.variant, b.variant, isAsc);
        case 'weight':
          return compare(a.weight, b.weight, isAsc);
        case 'location':
          return compare(a.location, b.location, isAsc);
        case 'pid':
          return compare(a.pid, b.pid, isAsc);
        case 'quantity':
          return compare(a.quantity, b.quantity, isAsc);
        case 'storingDate':
          return compare(a.storingDate, b.storingDate, isAsc);      
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
