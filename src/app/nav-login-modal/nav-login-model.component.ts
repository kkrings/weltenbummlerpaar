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
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
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
