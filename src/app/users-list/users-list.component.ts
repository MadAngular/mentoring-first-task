import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../interface/users-interface';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../services/users.service';
import { UserFormComponent } from './create-user-form/create-user-form.component';

@Component({
  selector: 'app-users-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
  imports: [NgFor, UserCardComponent, AsyncPipe, UserFormComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  users = this.usersService.users;

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);

      this.usersService.usersSubject.subscribe((users) => (this.users = users));
    });
  }
  onDelete(id: number) {
    this.usersService.deleteUser(id);
  }

  createUser(user: any) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: user.name,
      email: user.email,
      website: user.website,
      company: {
        name: user.companyName,
      },
    });
  }
  editUser(user: any) {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName,
      },
    });
  }
}
