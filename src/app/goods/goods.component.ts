import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {
  recognition: any;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.recognition = new webkitSpeechRecognition();

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.resultIndex][0].transcript;
      console.log(result);

     /* if (result.toLowerCase().includes('go to the article page')) {
        this.router.navigate(['/article-grid']);
      } */

      //no optional words aloud at end of phrase, e.g. ((page|site) )? doesn't work
      if (result.match(/^(go|switch|show me) (to )?(the )?stock (information )?(page|site)$/i)) {
        this.router.navigate(['/stock-grid']);
      } 
      else if (result.match(/^(go|switch|show me) (to )?(the )?article (information )?(page|site)$/i)) {
        this.router.navigate(['/article-grid']);
      } 
      else if (result.match(/^(go|switch|show me) (to )?(the )?order (page|site)$/i)) {
        this.router.navigate(['/commission-grid']);
      }
    }
  }

  startRecognition() {
    // start the speech recognition
    this.recognition.start();
  }

  stopRecognition() {
    // stop the speech recognition
    this.recognition.stop();
  }

}

