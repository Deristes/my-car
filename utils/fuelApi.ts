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


export async function getNearestGasStation(lat: number, lng: number): Promise<GasStation | null> {
  const _lat = Math.trunc(lat * 1000)/1000;
  const _lng = Math.trunc(lng * 1000)/1000;

  const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${_lat}&lng=${_lng}&rad=1.5&sort=dist&type=all&apikey=5bc9b339-e92d-6182-581b-d088287a449c`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (
      (!json.ok) ||
      (json.stations == null) ||
      (json.stations.length < 1)
    ) {
      return null;
    }
    return json.stations[0];
  } catch (e) {
    return null;
  }
}