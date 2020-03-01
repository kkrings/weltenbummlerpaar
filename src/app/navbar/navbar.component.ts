/**
 * Navigation bar component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';


/**
 * Navigation bar component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /**
   * Specifies if navigation bar's menu is collapsed.
   */
  isCollapsed = true;

  /**
   * Construct navigation bar component.
   */
  constructor() { }

  /**
   * Initialize navigation bar component.
   */
  ngOnInit() {
  }

  /**
   * Uncollapse/collapse navigation bar's menu.
   */
  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
