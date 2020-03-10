/**
 * Jumbotron component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';


/**
 * Jumbotron component
 */
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  /**
   * Show page's title.
   */
  title = 'Weltenbummlerpaar';

  /**
   * Construct jumbotron component.
   */
  constructor() { }

  /**
   * Initialize jumbotron component.
   */
  ngOnInit() { }
}
