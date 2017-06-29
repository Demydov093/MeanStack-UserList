import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  outputs: ['updateUserEvent', 'deleteUserEvent', 'CloseEvent']
})
export class UserEditComponent implements OnInit {

  private editTitle: boolean = false;
  private updateUserEvent = new EventEmitter();
  private deleteUserEvent = new EventEmitter();
  private CloseEvent = new EventEmitter();
  @Input() user;
  constructor() { }

  ngOnInit() {
  }
  updateUser(user: any) {
    this.user.dateOfBirth = user.dateOfBirth;
   this.updateUserEvent.emit(this.user);
  }
  deleteUser() {
    this.deleteUserEvent.emit(this.user);
  }
  Close() {
    this.CloseEvent.emit();
  }
}
