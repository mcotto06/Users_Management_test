import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Component, OnInit, Optional, Inject, } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

export interface Dictionary<T> {
  [Key: string]: T;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  view: boolean = false;
  displayedColumnsUsers = [
    'id',
    'name',
    'gender',
    'email',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<UserModel>();
  pagination: any = {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 0
  };
  loading = false;
  Users = new UserModel();

  constructor(private authService: AuthService,
    private usersService: UsersService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
    {
      this.authService.logout();
    }

    this.view = false;
    if(String(localStorage.getItem('auth')) === 'true')
    {
      this.view = true;
      this.fetchUsers();
    }
  }

  fetchUsers() {
    let params: Dictionary<string> = {
      'page': this.pagination.currentPage,
      'per_page': this.pagination.perPage,     
    };

    this.loading = true;
    this.usersService.all(params).subscribe(response => {
      this.dataSource.data = [];
      let list: UserModel[] = [];
      console.log(response);
      if(response.code === 200){
        const count = response.data.length;
        for (let i = 0; i < count; i++) {
          list.push(new UserModel(response.data[i]));
        }
        this.dataSource.data = list;
        this.pagination.total = response.meta.pagination.total;       
      }      

      var self = this;
      setTimeout(function(){
        self.loading = false;
      },2000);   
    }, error => {      
      console.log(error);
      this.loading = false;
    });
  }

  handlePaginationChange(event: PageEvent): void {
    this.pagination.perPage = event.pageSize;
    this.pagination.currentPage = event.pageIndex + 1;
    this.fetchUsers();
  }

  openDialog(action: string, obj: any) {
    if (action === 'Add User') {
      obj = new UserModel();
    }
    obj.action = action;
    const dialogRef = this.dialog.open(DialogUser, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event !== 'Cancel') {
          this.fetchUsers();
        }
      }
    });
  }
}


@Component({
  selector: 'dialog-user',
  templateUrl: 'dialog-user.html',
})
export class DialogUser implements OnInit {

  public form!: FormGroup;
  action: string;
  user: UserModel;  
  loading = false;

  constructor(private fb: FormBuilder,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<DialogUser>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.user = data;
    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();

    if (this.action === 'Add User') {
      this.user = new UserModel();
    }

    if (this.user.id && this.action !== 'Delete User') {
      
      this.fetchUser(this.user.id);

      var self = this;
      setTimeout(function(){
        self.form.patchValue({
          fName: self.user.name,
          fEmail: self.user.email,
          fGender: self.user.gender,
          fStatus: self.user.status
        });
      },1000);      
    }
  }

  initForm() {
    this.form = this.fb.group({
      fID: [this.user.id],
      fName:  [this.user.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      fEmail:  [this.user.email, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      fGender: [this.user.gender, Validators.compose([Validators.required])],
      fStatus: [this.user.status, Validators.compose([Validators.required])],
    });
  }

  fetchUser(id: number) {
    this.loading = true;
    this.user = new UserModel();
    this.usersService.get(id).subscribe(response => {
      console.log(response); 
      if(response.code === 200){
        this.user = response.data;         
      } 
      this.loading = false;      
    }, error => {
      console.log(error);
      this.loading = false;
     });
  }
 
  doAction() {
    this.configureUser();
    if (this.user.id === null) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    this.loading = true;
    this.usersService.insert(this.user).subscribe((response: any) => {
      console.log(response); 
      this.loading = false;
      if(response.code === 201) //Created
      {    
        this.dialogRef.close({ event: this.action, data: response.data }); 
      }          
    }, error => {
      console.log(error);
      this.loading = false;
     });
  }

  updateUser() {
    this.loading = true;
    this.usersService.update(this.user.id, this.user).subscribe((response: any) => { 
      console.log(response); 
      this.loading = false;
      if(response.code === 200)
      {    
        this.dialogRef.close({ event: this.action, data: response.data }); 
      }      
    }, error => {
      console.log(error);
      this.loading = false;
     });
  }

  deleteUser() {
    this.loading = true;
    this.usersService.delete(this.user).subscribe((response: any) => {   
      console.log(response); 
      this.loading = false;
      if(response.code === 204)
      {  
        this.dialogRef.close({ event: this.action, data: null }); 
      }    
    }, error => {
      console.log(error);
      this.loading = false;
     });
  }

  configureUser() {
    this.user.id = this.form.controls['fID'].value;
    this.user.name = this.form.controls['fName'].value;
    this.user.email = this.form.controls['fEmail'].value;
    this.user.gender = this.form.controls['fGender'].value;
    this.user.status = this.form.controls['fStatus'].value;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
