export interface urlDetails {
  // loginMethod: string;
  sNo: number;
  shortUrl: String;
  domainName: String;
  customName: String;
  url: String;
  date: Date;
  id: number;
  orderId: String;
}

export interface urlDetailsData {
  error: {
      status: boolean,
      code: string,
  }
  data:
  {
      domain: String,
      createdAt: Date,
      customName: String
      email: String,
      updatedAt: Date,
      url: String,
      urlType: String,
      userType: String
      _id: number,
      orderId:String
  }
}

export interface urlData {
  Error: boolean;
  data: [
    {
      domain: String;
      total: number;
      docs: [
        {
          _id: number;
          createdAt: Date;
          url: String;
          customName: String;
        }
      ];
    }
  ];
}

export interface ActualURL{
    domainName:string,
    customName:string
}

export interface AllLinksOfAdmin{
    userId:string
}

export class domainDataSet {
    domainName: String;
    customName: String;
    url: String;
}
export interface DomainData{
    email:string,
    domain:string
}