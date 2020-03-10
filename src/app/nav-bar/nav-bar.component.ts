/**
 * Navigation bar component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {
  NavLoginModalComponent
} from '../nav-login-modal/nav-login-modal.component';


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
   * Holds reference to login modal.
   */
  loginModal: BsModalRef;

  /**
   * Construct navigation bar component.
   *
   * @param modalService
   *   Service for showing the admin login modal
   */
  constructor(private modalService: BsModalService) { }

  /**
   * Initialize navigation bar component.
   */
  ngOnInit() { }

  /**
   * Uncollapse/collapse navigation bar's menu.
   */
  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Open the admin login modal.
   */
  openLoginModal() {
    this.loginModal = this.modalService.show(NavLoginModalComponent);
    this.isCollapsed = true;
  }
}
