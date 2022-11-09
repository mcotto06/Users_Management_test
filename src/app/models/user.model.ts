export class UserModel {

  id!: number;
  name!: string;
  email!: string;
  gender!: string;
  status!: string;
  
  constructor(json?: any) {
    if (typeof(json) == 'object') {
      this.id = json.id;
      this.name = json.name;
      this.gender = json.gender;
      this.email = json.email;
      this.status = json.status;      
    }
  }
}
