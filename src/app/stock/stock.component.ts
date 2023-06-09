import {Component, ChangeDetectorRef} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';


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

declare var webkitSpeechRecognition: any;

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

  descriptions: string[] = [];
  recognition: any;

  storeItems() {
    for (var i = 0; i < this.stockTable.length; i++) {
      this.descriptions.push(this.stockTable[i].articleNumber);
      this.descriptions.push(this.stockTable[i].description);
      this.descriptions.push(this.stockTable[i].batch);
      this.descriptions.push(this.stockTable[i].variant);
      this.descriptions.push(this.stockTable[i].weight);
      this.descriptions.push(this.stockTable[i].location);
      this.descriptions.push(this.stockTable[i].pid);
      this.descriptions.push(this.stockTable[i].quantity);
      this.descriptions.push(this.stockTable[i].storingDate);
    }
  }

  addItem(articleNumber: string, description: string, batch: string, variant: string, weight: string, location: string, pid: string, quantity: string, storingDate: string) {
    this.stockTable.push({
    //  index: (this.stockTable.length+1).toString(),
      index: (parseInt((this.stockTable[this.stockTable.length-1].index))+1).toString(),
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
  }

  clearForm() {
    this.articleNumber = "";
    this.description = "";
    this.batch = "";
    this.variant = "";
    this.weight = "";
    this.location = "";
    this.pid = "";
    this.quantity = "";
    this.storingDate = "";
  }
  
  deleteItem(index: string) {
    for (var i = 0; i < this.stockTable.length; i++) {
      if (this.stockTable[i].index === index) {
        this.stockTable.splice(i, 1);
      }
    }
  }

  sortedData: StockTable[];

  searchText = '';

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.recognition = new webkitSpeechRecognition();

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.resultIndex][0].transcript;
      console.log(result);

     /* if (result.toLowerCase().includes('go to the article page')) {
        this.router.navigate(['/article-grid']);
      } */

      //no optional words aloud at end of phrase, e.g. ((page|site) )? doesn't work
      if (result.match(/^(go|switch|show me) (to )?(the )?article (information )?(page|site)$/i)) {
        this.router.navigate(['/article-grid']);
      } 
      else if (result.match(/^(go|switch|show me) (to )?(the )?goods (receipt )?(page|site)$/i)) {
        this.router.navigate(['/goods-receiving-grid']);
      }
      else if (result.match(/^(go|switch|show me) (to )?(the )?order (page|site)$/i)) {
        this.router.navigate(['/commission-grid']);
      }
      else if (result.match(/^(search for|find|look up)\s+(.+)/i)) {
        const value = result.match(/^(search for|find|look up)\s+(.+)/i)[2];
        this.searchText = value;
        this.cd.detectChanges();
      }
      // new command for setting article number (only numbers work)
      else if (result.match(/^(add|include) article number (\d+)/i)) {
        const articleNumber = result.match(/^(add|include) article number (\d+)/i)[2];
        this.articleNumber = articleNumber;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) description\s+(.+)/i)) {
        const description = result.match(/^(add|include) description\s+(.+)/i)[2];
        this.description = description;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) batch number (\d+)/i)) {
        const batch = result.match(/^(add|include) batch number (\d+)/i)[2];
        this.batch = batch;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) variant\s+(.+)/i)) {
        const variant = result.match(/^(add|include) variant\s+(.+)/i)[2];
        this.variant = variant;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) weight (\d+(?:\.\d+)?)/i)) {
        const weight = result.match(/^(add|include) weight (\d+(?:\.\d+)?)/i)[2];
        this.weight = weight;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) location\s+(.+)/i)) {
        const location = result.match(/^(add|include) location\s+(.+)/i)[2];
        this.location = location;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) PID number (\d+)/i)) {
        const pid = result.match(/^(add|include) PID number (\d+)/i)[2];
        this.pid = pid;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) quantity (\d+)/i)) {
        const quantity = result.match(/^(add|include) quantity (\d+)/i)[2];
        this.quantity = quantity;
        this.cd.detectChanges();
      }
      else if (result.match(/^(add|include) storing date\s+(.+)/i)) {
        const storingDate = result.match(/^(add|include) storing date\s+(.+)/i)[2];
        const dateComponents = storingDate.match(/^(\d+)[a-z]{2}\s+of\s+([a-z]+)\s+(\d{4})$/i);
        if (dateComponents) {
          const day = dateComponents[1].padStart(2, '0');
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
          const month = (monthNames.indexOf(dateComponents[2].toLowerCase()) + 1).toString().padStart(2, '0');
          const year = dateComponents[3];
          const formattedDate = `${day}.${month}.${year}`;
          this.storingDate = formattedDate;
          this.cd.detectChanges();
        }
      }
      else if (result.match(/^(add|save) item$/i)) {
        let element:HTMLElement = document.getElementById('save') as HTMLElement;
        element.click();
        this.cd.detectChanges();
      }
      else if (result.match(/^(clear|delete) (the )?(items )?(in the )?form$/i)) {
        this.clearForm();
        this.cd.detectChanges();
      }
      else if (result.match(/^(clear|empty) (the )?search bar$/i)) {
        this.searchText = "";
        this.cd.detectChanges();
      }
      else if (result.match(/^delete( the)?( item with)? index( number)? (\d+)$/i)) {
        const index = result.match(/\d+/)[0];
        this.deleteItem(index);
        this.sortedData = this.stockTable.slice();
        this.cd.detectChanges();
      }
    };

    this.storeItems();
    this.sortedData = this.stockTable.slice();
  }

  startRecognition() {
    // start the speech recognition
    this.recognition.start();
  }

  stopRecognition() {
    // stop the speech recognition
    this.recognition.stop();
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
