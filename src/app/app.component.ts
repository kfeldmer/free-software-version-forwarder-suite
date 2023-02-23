import { Component } from '@angular/core';
import { Router } from '@angular/router';
import alanBtn from '@alan-ai/alan-sdk-web';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-forwarder-suite-template';
  alanBtnInstance;
  
  constructor(private router: Router){
    this.alanBtnInstance = alanBtn({
      key: '2ec5b4d0f7c942fe209c255d41bee8d62e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command === 'navigation' && commandData.route) {
          this.router.navigateByUrl(commandData.route);
          console.log(commandData.route);
        }
      },
    });
  }
}
