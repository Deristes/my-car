import {GasStationApiData} from './fuelApi';
import {brands} from '../../constants/fuel/brands/logos';


export default class GasStationClass {
  public readonly id: string;
  public readonly name: string;
  public readonly brand: string;
  public readonly isOpen: boolean;
  public readonly diesel: number | null;
  public readonly e10: number | null;
  public readonly e5: number | null;
  public readonly lat: number;
  public readonly lng: number;
  public readonly dist: number;
  public readonly place: string;
  public readonly postCode: number;
  public readonly street: string;
  public readonly houseNumber: string;

  constructor(g: GasStationApiData) {
    this.id = g.id;
    this.name = g.name;
    this.brand = g.brand;
    this.isOpen = g.isOpen;
    this.diesel = g.diesel;
    this.e10 = g.e10;
    this.e5 = g.e5;
    this.lat = g.lat;
    this.lng = g.lng;
    this.dist = g.dist;
    this.place = g.place;
    this.postCode = g.postCode;
    this.street = g.street;
    this.houseNumber = g.houseNumber;
  }

  public getStreamlinedName(): string {
    if (! this.name.toLowerCase().includes(this.brand.toLowerCase())) {
      return `${this.brand} - ${this.name}`;
    }
    const spliced = this.name.split( new RegExp(this.brand.toLowerCase(), 'i'), 2);
    if (spliced.length > 1 && spliced[0] == '' ) {
      let str = spliced[1];
      while (str[0] == ' ' || str[0] == '-') {
        str = str.slice(1);
      }
      return `${this.brand} - ${str}`;
    }
    return `${this.brand} - ${this.name}`;
  }

  public getAdress(): string {
    return `${this.street} ${this.houseNumber}, ${this.postCode} ${this.place}`;
  }

  public getImage() {
    let logo = brands.find((e) => {
      return e.name.toLowerCase() == this.brand.toLowerCase();
    });
    if (logo == null) {
      logo = brands.find((e) => {
        return this.brand.toLowerCase().includes(e.name.toLowerCase());
      });
    }
    if (logo == null) {
      logo = brands.find((e) => {
        return this.name.toLowerCase().includes(e.name);
      });
    }
    if (logo != null) {
      return logo.image;
    }
    return require('../../assets/image/fuelStations/brands/default.png');

  }
}