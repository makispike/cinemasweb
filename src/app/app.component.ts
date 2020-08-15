import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cinepolis';
  languageInUse = 'en';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.languageInUse = language;
  }
}
