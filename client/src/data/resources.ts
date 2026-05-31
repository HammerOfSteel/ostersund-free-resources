export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  notes?: string;
  website?: string;
  url?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const referencePoint = {
  name: "Stuguvägen 10",
  coordinates: { lat: 63.1687, lng: 14.657 },
};

export const categories: Category[] = [
  { id: "wifi", name: "WiFi", color: "#C97C5C" },
  { id: "mat", name: "Mat", color: "#8FA89E" },
  { id: "kok", name: "Kök", color: "#B07DB8" },
  { id: "laddning", name: "Laddning", color: "#D4A44C" },
  { id: "events", name: "Events", color: "#5C8DC9" },
];

export const resources: Resource[] = [
  {
    id: "1",
    name: "Stadsbiblioteket Östersund",
    description:
      "Kommunens huvudbibliotek erbjuder gratis WiFi, ladduttag och datorer för alla besökare.",
    category: "wifi",
    amenities: ["Gratis WiFi", "Ladduttag", "Datorer", "Tyst zon"],
    coordinates: { lat: 63.1758, lng: 14.6365 },
    address: "Biblioteksgatan 2, 831 34 Östersund",
    phone: "063-14 30 00",
    hours: "Mån–Fre 10–19, Lör 10–15, Sön 12–16",
    website: "https://www.ostersund.se/bibliotek",
  },
  {
    id: "2",
    name: "Mittuniversitetet – Campus Östersund",
    description:
      "Campusets allmänna ytor har öppet WiFi och kök/lunchrum som besökare kan använda under kontorstid.",
    category: "wifi",
    amenities: ["Gratis WiFi", "Kök", "Ladduttag", "Sittplatser"],
    coordinates: { lat: 63.1743, lng: 14.6289 },
    address: "Kunskapens väg 8, 831 25 Östersund",
    hours: "Mån–Fre 07–20",
    website: "https://www.miun.se",
  },
  {
    id: "3",
    name: "Frälsningsarméns Matservering",
    description:
      "Frälsningsarmén serverar gratis lunch och middag till alla som behöver det, inga krav ställs.",
    category: "mat",
    amenities: ["Gratis lunch", "Gratis middag", "Varm dryck", "Socialt stöd"],
    coordinates: { lat: 63.1771, lng: 14.641 },
    address: "Prästgatan 14, 831 30 Östersund",
    phone: "063-12 34 56",
    hours: "Mån–Fre 11–13, Mån–Tor 17–19",
    notes: "Alla är välkomna – ingen behovsprövning.",
  },
  {
    id: "4",
    name: "Kulturmagasinet",
    description:
      "Kulturhuset vid Storsjön erbjuder gratis WiFi och är värd för regelbundna gratis events och utställningar.",
    category: "events",
    amenities: ["Gratis WiFi", "Gratis events", "Utställningar", "Café"],
    coordinates: { lat: 63.1728, lng: 14.6448 },
    address: "Rådhusgatan 44, 831 35 Östersund",
    hours: "Mån–Sön 10–18",
    website: "https://www.ostersund.se/kulturmagasinet",
  },
  {
    id: "5",
    name: "Östersunds Stadskyrka – Kyrkocafé",
    description:
      "Öppen kyrka med gratis kaffe och soppa på torsdagar. Välkomnande miljö för alla.",
    category: "mat",
    amenities: ["Gratis kaffe", "Soppa på torsdagar", "Sittplatser", "WiFi"],
    coordinates: { lat: 63.1762, lng: 14.6379 },
    address: "Kyrkgatan 28, 831 31 Östersund",
    phone: "063-10 08 00",
    hours: "Tor 11–13 (soppa), Mån–Fre 09–16",
    website: "https://www.ostersundskyrka.se",
  },
  {
    id: "6",
    name: "Folkets Hus – Gemensamt Kök",
    description:
      "Folkets Hus har ett öppet kök som föreningar och privatpersoner kan boka gratis för att laga mat.",
    category: "kok",
    amenities: ["Fullutrustat kök", "Kylskåp", "Spis & ugn", "Diskmaskin"],
    coordinates: { lat: 63.1735, lng: 14.643 },
    address: "Storgatan 31, 831 30 Östersund",
    phone: "063-51 12 00",
    hours: "Mån–Fre 08–20, Lör–Sön 09–17",
    notes: "Gratis bokning för ideella föreningar. Privatpersoner – boka via receptionen.",
    website: "https://www.folketshus.se",
  },
  {
    id: "7",
    name: "McDonald's Östersund Centrum",
    description:
      "Gratis WiFi med köp av valfri produkt. Ladduttag vid fönsterborden.",
    category: "laddning",
    amenities: ["Gratis WiFi", "Ladduttag", "Öppet tidigt", "Öppet sent"],
    coordinates: { lat: 63.1747, lng: 14.641 },
    address: "Storgatan 15, 831 30 Östersund",
    hours: "Mån–Sön 06–01",
    notes: "WiFi kräver att man beställer något.",
  },
  {
    id: "8",
    name: "Jämtkraft Arena – Laddstationer",
    description:
      "Gratis publika ladduttag för mobiltelefoner och bärbara datorer i arenahallen på evenemangsfria dagar.",
    category: "laddning",
    amenities: ["USB-laddning", "Vägguttag", "Sittplatser", "Gratis WiFi"],
    coordinates: { lat: 63.1698, lng: 14.6302 },
    address: "Odenslundsgatan, 831 41 Östersund",
    hours: "Mån–Fre 08–17 (utanför evenemang)",
    website: "https://www.jamtkraftarena.se",
  },
];
