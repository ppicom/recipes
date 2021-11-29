import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  featureSelected: string = 'recipe';

  onFeatureSelected(feature: string) {
    this.featureSelected = feature;
  }
}
