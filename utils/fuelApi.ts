const brands = [
  {name: 'agip', image: require('../assets/image/fuelStations/brands/agip.png')},
  {name: 'aral', image: require('../assets/image/fuelStations/brands/aral.png')},
  {name: 'avia', image: require('../assets/image/fuelStations/brands/avia.png')},
  {name: 'baywa', image: require('../assets/image/fuelStations/brands/baywa.png')},
  {name: 'bft', image: require('../assets/image/fuelStations/brands/bft.png')},
  {name: 'classic', image: require('../assets/image/fuelStations/brands/classic.png')},
  {name: 'ed', image: require('../assets/image/fuelStations/brands/ed.png')},
  {name: 'elan', image: require('../assets/image/fuelStations/brands/elan.jpg')},
  {name: 'esso', image: require('../assets/image/fuelStations/brands/esso.png')},
  {name: 'go', image: require('../assets/image/fuelStations/brands/go.jpg')},
  {name: 'hem', image: require('../assets/image/fuelStations/brands/hem.jpg')},
  {name: 'hoyer', image: require('../assets/image/fuelStations/brands/hoyer.jpg')},
  {name: 'jet', image: require('../assets/image/fuelStations/brands/jet.png')},
  {name: 'markant', image: require('../assets/image/fuelStations/brands/markant.png')},
  {name: 'oil', image: require('../assets/image/fuelStations/brands/oil.jpg')},
  {name: 'omv', image: require('../assets/image/fuelStations/brands/omv.jpg')},
  {name: 'q1', image: require('../assets/image/fuelStations/brands/q1.png')},
  {name: 'raiffeisen', image: require('../assets/image/fuelStations/brands/raiffeisen.png')},
  {name: 'shell', image: require('../assets/image/fuelStations/brands/shell.png')},
  {name: 'sprint', image: require('../assets/image/fuelStations/brands/sprint.jpg')},
  {name: 'star', image: require('../assets/image/fuelStations/brands/star.jpg')},
  {name: 'team', image: require('../assets/image/fuelStations/brands/team.jpg')},
  {name: 'total', image: require('../assets/image/fuelStations/brands/total.png')},
  {name: 'westfalen', image: require('../assets/image/fuelStations/brands/westfalen.png')},
];

export interface GasStation {
  brand: string
  diesel: number | null
  dist: number
  e10: number | null
  e5: number | null
  houseNumber: string
  id: string
  isOpen: boolean
  lat: number
  lng: number
  name: string
  place: string
  postCode: number
  street: string
}

export async function getNearestGasStations(lat: number, lng: number): Promise<GasStation[]> {
  const _lat = Math.trunc(lat * 1000)/1000;
  const _lng = Math.trunc(lng * 1000)/1000;

  const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${_lat}&lng=${_lng}&rad=2&sort=dist&type=all&apikey=5bc9b339-e92d-6182-581b-d088287a449c`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (
      (!json.ok) ||
      (json.stations == null) ||
      (json.stations.length < 1)
    ) {
      return [];
    }
    return json.stations;
  } catch (e) {
    return [];
  }
}

export function streamlineName(g: GasStation): string {
  if (! g.name.toLowerCase().includes(g.brand.toLowerCase())) {
    return `${g.brand} - ${g.name}`;
  }
  const spliced = g.name.split( new RegExp(g.brand.toLowerCase(), 'i'), 2);
  if (spliced.length > 1 && spliced[0] == '' ) {
    let str = spliced[1];
    while (str[0] == ' ' || str[0] == '-') {
      str = str.slice(1);
    }
    return `${g.brand} - ${str}`;
  }
  return `${g.brand} - ${g.name}`;
}

export async function getNearestGasStation(lat: number, lng: number): Promise<GasStation | null> {
  const stations = await getNearestGasStations(lat, lng);
  if (stations.length == 0) {
    return null;
  }
  return stations[0];
}

export function getImagePath(g: GasStation) {
  let logo = brands.find((e) => {
    return g.brand.toLowerCase() == e.name;
  });
  if (logo == null) {
    logo = brands.find((e) => {
      return g.brand.toLowerCase().includes(e.name);
    });
  }
  if (logo == null) {
    logo = brands.find((e) => {
      return g.name.toLowerCase().includes(e.name);
    });
  }
  if (logo != null) {
    return logo.image;
  }
  return require('../assets/image/fuelStations/brands/default.png');
}