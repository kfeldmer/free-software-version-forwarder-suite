import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';

export interface StockTable {
  index: number;
  articleNumber: number;
  description: string;
  batch: number;
  variant: string;
  weight: number;
  location: string;
  pid: number;
  quantity: number;
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
  stockTable: StockTable[] = [
    {
      index: 1,
      articleNumber: 202028,
      description: 'Taschenrechner',
      batch: 24685,
      variant: 'rot',
      weight: 0.03,
      location: 'BEW',
      pid: 201910,
      quantity: 1,
      storingDate: '19.10.2022'
    },
    {
      index: 2,
      articleNumber: 202023,
      description: 'Kugelschreiber',
      batch: 24685,
      variant: 'rot',
      weight: 0.01,
      location: 'BVE',
      pid: 9000113,
      quantity: 2,
      storingDate: '19.10.2022'
    },
    {
      index: 3,
      articleNumber: 202016,
      description: 'Warnschild',
      batch: 24685,
      variant: 'blau',
      weight: 0.31,
      location: 'BVE',
      pid: 9000114,
      quantity: 1,
      storingDate: '18.10.2022'
    },
    {
      index: 4,
      articleNumber: 202018,
      description: 'Grillkoffer',
      batch: 87495,
      variant: 'gelb',
      weight: 2.91,
      location: 'FBL020101',
      pid: 201587,
      quantity: 3,
      storingDate: '19.10.2022'
    }
  ];

  sortedData: StockTable[];

  constructor() {
    this.sortedData = this.stockTable.slice();
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

  searchText = '';
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
