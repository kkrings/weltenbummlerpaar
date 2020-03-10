/**
 * Admin login modal component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


/**
 * Admin login modal component
 */
@Component({
  selector: 'app-nav-login-modal',
  templateUrl: './nav-login-modal.component.html',
  styleUrls: ['./nav-login-modal.component.scss']
})
export class NavLoginModalComponent implements OnInit {
  /**
   * Construct admin login modal component.
   */
  constructor(private modal: BsModalRef) { }

  /**
   * Initialize admin login modal component.
   */
  ngOnInit() { }

  /**
   * Close modal.
   */
  closeModal() {
    this.modal.hide();
  }
}
