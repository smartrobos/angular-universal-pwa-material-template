export interface ChangePassword {
  username: string;
  password: string;
  cPassword: string;
}

export interface ForgotPassword {
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Register {
  title: string
  first: string
  last: string
  email: string
  username: string
  password: string,
  cPassword:string,
  display: string
  telephone: string
  address: string
  city: string
  country: string
}

export interface EditUser {
  name: {
    title: string;
    first: string;
    last: string;
    display: string;
  };
  email: string;
  username: string;
  password: string;
  telephone: number;
  address: string;
  city: string;
  country: string;
  image: string;
  userType: string;
}

export class LoginDetails {

  loginMethod:    string = "";
  isLoggedIn:     boolean;
  userDetails = {
    name:{
      "title" : "",
      "first" : "",
      "last"  : "",
      "display" : ""
    },
    email : "",
    username: "",
    password: "",
    telephone: null,
    address: "",
    city: "",
    country: "",
    image: "./assets/avatar1.png",
    userType: ""
  }
  /*
  isLogged() : boolean{
    return this.isLoggedIn;
  }
  getUserDetails(): Object{
    return this.userDetails;
  }
  */
}

export interface LoginDetails1 {
  loginMethod: string;
  isLoggedIn: boolean;
  userDetails: {
    name: {
      title: string,
      first: string,
      last: string,
      display: string
    }
    email: string,
    username: string,
    password: string;
    telephone: number;
    address: string;
    city: string;
    country: string;
    image: string;
    userType: string
  }
}
export interface sidenavDetails
{
  ismyAccountPage: boolean;
}

export interface UserDetails {
  provider: String,
  id: String,
  token: String,
  email: String,
  image: String,
  birthday:String,
  name: { title: String, first: String, last: String, display: String },
  emails: [object], // Type -> Home, work
  photos: [string], //Value of URLs
  organizations: [string],
  language: String,
  locale:String,
  url: String,
  gender: String,
  updatedAt: Date,
  address: String,
  city: String,
  country: String,
  telephone: String,
  updated_time : Date   
}