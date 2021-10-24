export class User {
    constructor(
     
  
      public firstName: string,
      public lastName: string,
  
      public email: string,
      public gender:string,
      public dob: Date,
      public password: string,
      public phone: string,
  
      public houseNo:string,
      public street:string,
      public city:string,
      public district:string,
      public state:string,
      public pincode:number,
      public landmark:string,
  
      public security_questions:string,
      public security_answer:string
    ) {
  
    }
  }