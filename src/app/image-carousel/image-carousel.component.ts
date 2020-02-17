import { Component, OnInit, Input } from '@angular/core';

import { Image } from '../shared/image.model';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  @Input() images: Image[];

  constructor() { }

  ngOnInit() {
  }

}
