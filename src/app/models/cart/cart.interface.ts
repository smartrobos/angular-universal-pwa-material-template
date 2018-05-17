export class PricingData {
  domain: String;
  country: String;
  package: [
    {
      name: String;
      Features: String[];
      price: string;
    }
  ];
}
export interface PackagePriceToggle {
  domain: string;
  country: string;
}

export interface billingAddressModel{   
     
  pinCode: String,
  address:String,
  streetName:String,
  cityName:String,
  countryName:String,
}

export interface addToCart{
  totalCost:String,
  customName:String,
  domainName:String
}