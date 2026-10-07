export const cities = ["Los Angeles"] as const;

export type City = (typeof cities)[number];

export const occasions = [
  "Everyday",
  "Birthday",
  "Romance",
  "Wedding",
  "Sympathy",
  "Thank you",
  "New baby",
] as const;

export type Occasion = (typeof occasions)[number];

export type Florist = {
  id: string;
  name: string;
  city: City;
  neighborhood: string;
  since: number;
  specialty: string;
  bio: string;
  cover: string;
};

export type Arrangement = {
  id: string;
  name: string;
  floristId: string;
  price: number;
  occasions: Occasion[];
  stems: string;
  vaseLife: string;
  description: string;
  image: string;
  sameDay: boolean;
  featured?: boolean;
  signature?: boolean;
};

export const florists: Florist[] = [
  {
    id: "cucurig",
    name: "Cucurig",
    city: "Los Angeles",
    neighborhood: "Silver Lake",
    since: 2014,
    specialty: "Seasonal bunches, arranged in the shop",
    bio: "One bench, just off Sunset in Silver Lake. The flowers are arranged here before dawn and leave for delivery the same morning. When the stems change, the bench changes with them.",
    cover: "/photos/shop-front.jpg",
  },
];

export const arrangements: Arrangement[] = [
  {
    id: "first-crow",
    name: "First crow",
    floristId: "cucurig",
    price: 168,
    occasions: ["Everyday", "Birthday", "Thank you"],
    stems: "Cream roses, astrantia, blackberries, dark scabiosa",
    vaseLife: "5–7 days",
    description:
      "The shop’s own bunch, built like the flower in the mark: five spokes of cream roses around a dark center of blackberries. It leaves in a clear glass bowl, stems visible in the water.",
    image: "/photos/first-crow.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "cockscomb",
    name: "Cockscomb",
    floristId: "cucurig",
    price: 142,
    occasions: ["Romance", "Birthday", "Wedding"],
    stems: "Wine celosia, cream sweet peas, one pale rose, dark berries",
    vaseLife: "6–8 days",
    description:
      "One tall wine-red cockscomb, shaped like a rooster’s comb, with cream sweet peas and a single pale rose. Wrapped in cream paper and tied with a black ribbon.",
    image: "/photos/cockscomb.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "dawn-crescent",
    name: "Dawn crescent",
    floristId: "cucurig",
    price: 158,
    occasions: ["Wedding", "Thank you", "Sympathy"],
    stems: "Ivory ranunculus, sweet peas, one dark bud",
    vaseLife: "5–7 days",
    description:
      "A low arc of ivory ranunculus and sweet peas, with one bare stem and a dark bud standing in the middle. It sits in a clear glass bowl.",
    image: "/photos/dawn-crescent.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "night-bench",
    name: "Night bench",
    floristId: "cucurig",
    price: 136,
    occasions: ["Romance", "Everyday", "Sympathy"],
    stems: "Cream hellebores, dark hellebores, eucalyptus",
    vaseLife: "5–7 days",
    description:
      "Dark hellebores and eucalyptus, with two cream flowers at the front. Wrapped in black paper and tied with a cream cord, ready to hand over.",
    image: "/photos/night-bench.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "five",
    name: "Five",
    floristId: "cucurig",
    price: 118,
    occasions: ["Everyday", "Thank you", "Wedding"],
    stems: "Five cream flowers, one stem each",
    vaseLife: "5–6 days",
    description:
      "Five cream blooms, each with five petals, held so they make one flower in the air. A small rooster sits in every center. It stands in a clear glass vase.",
    image: "/photos/five.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-call",
    name: "The call",
    floristId: "cucurig",
    price: 72,
    occasions: ["Thank you", "Everyday", "Sympathy"],
    stems: "One tall cream ranunculus",
    vaseLife: "5–7 days",
    description:
      "One cream ranunculus on a single tall stem, the way a crow lifts at dawn. The rooster is in the heart of the flower. It comes in a narrow clear glass.",
    image: "/photos/the-call.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-tail",
    name: "The tail",
    floristId: "cucurig",
    price: 154,
    occasions: ["Romance", "Birthday", "Wedding"],
    stems: "Wine cockscomb, copper plume, cream sweet peas",
    vaseLife: "6–8 days",
    description:
      "A rooster’s tail: a wine cockscomb in front of a long copper-and-cream plume, with a few sweet peas. The stems show through a clear glass vase.",
    image: "/photos/the-tail.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-eye",
    name: "The eye",
    floristId: "cucurig",
    price: 58,
    occasions: ["Everyday", "Thank you", "Sympathy"],
    stems: "One cream anemone",
    vaseLife: "4–6 days",
    description:
      "One cream anemone in a small clear glass. The center is a dark ring, the rooster’s place in the mark, with no bird drawn in.",
    image: "/photos/the-eye.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "apple-branch",
    name: "Apple branch",
    floristId: "cucurig",
    price: 84,
    occasions: ["Everyday", "Wedding", "Thank you"],
    stems: "One branch of five-petal apple blossom",
    vaseLife: "4–6 days",
    description:
      "A single branch of cream apple blossom, each flower five petals, the shape of the mark. It stands in a clear glass bottle.",
    image: "/photos/apple-branch.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "before-the-crow",
    name: "Before the crow",
    floristId: "cucurig",
    price: 148,
    occasions: ["Sympathy", "Romance", "Everyday"],
    stems: "Black callas, dark scabiosa, berries, one cream rose",
    vaseLife: "5–7 days",
    description:
      "Almost entirely dark: black callas, scabiosa, and berries, with one cream rose just opening. The minute before the shop’s name. It sits in a clear glass bowl.",
    image: "/photos/before-the-crow.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "wheat",
    name: "Wheat",
    floristId: "cucurig",
    price: 92,
    occasions: ["Thank you", "Everyday", "Wedding"],
    stems: "Wheat ears, three cream wild roses, dried grass",
    vaseLife: "5–7 days",
    description:
      "A Romanian morning brought inside: wheat, three small cream roses with five petals, and a few dark grasses. Clear glass, stems in the water.",
    image: "/photos/wheat.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-sill",
    name: "The sill",
    floristId: "cucurig",
    price: 78,
    occasions: ["Everyday", "Sympathy", "Thank you"],
    stems: "Two dark hellebores, one cream anemone",
    vaseLife: "5–7 days",
    description:
      "Three stems in a long clear glass, the way they would stand on the shop window: dark, cream, dark. The center flower keeps the mark’s black eye.",
    image: "/photos/the-sill.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "yellow-crow",
    name: "Yellow crow",
    floristId: "cucurig",
    price: 164,
    occasions: ["Birthday", "Thank you", "Everyday"],
    stems: "Yellow roses, astrantia, blackberries, dark scabiosa",
    vaseLife: "5–7 days",
    description:
      "First crow in the color of morning: five yellow roses around a dark center of blackberries. It leaves in a clear glass bowl, stems visible in the water.",
    image: "/photos/yellow-crow.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "gold-hour",
    name: "Gold hour",
    floristId: "cucurig",
    price: 152,
    occasions: ["Wedding", "Romance", "Thank you"],
    stems: "Yellow ranunculus, ivory ranunculus, sweet peas, one dark bud",
    vaseLife: "5–7 days",
    description:
      "Dawn crescent warmed through: yellow and ivory ranunculus with sweet peas, and one dark bud on a bare stem. It sits in a clear glass bowl.",
    image: "/photos/gold-hour.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-sun",
    name: "The sun",
    floristId: "cucurig",
    price: 68,
    occasions: ["Thank you", "Everyday", "Birthday"],
    stems: "One yellow rose",
    vaseLife: "5–7 days",
    description:
      "One yellow rose on a single tall stem, the shop’s call in sunlight. It comes in a narrow clear glass.",
    image: "/photos/the-sun.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "ribbon-sun",
    name: "Ribbon sun",
    floristId: "cucurig",
    price: 128,
    occasions: ["Birthday", "Romance", "Thank you"],
    stems: "Yellow roses, dark berries, cream sweet peas",
    vaseLife: "5–7 days",
    description:
      "A hand-tied bunch of yellow roses with dark berries and two cream sweet peas. Wrapped in cream paper and tied with a black ribbon.",
    image: "/photos/ribbon-sun.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "the-perch",
    name: "The perch",
    floristId: "cucurig",
    price: 112,
    occasions: ["Everyday", "Sympathy", "Wedding"],
    stems: "Cream anemones, olive, one tall bud",
    vaseLife: "5–7 days",
    description:
      "Three cream anemones with dark centers, olive branches to either side, and one tall bud above them. It stands in a clear glass cylinder.",
    image: "/photos/the-perch.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "olive-morning",
    name: "Olive morning",
    floristId: "cucurig",
    price: 96,
    occasions: ["Everyday", "Thank you", "Wedding"],
    stems: "Three cream wild roses, olive branches",
    vaseLife: "4–6 days",
    description:
      "Three small cream roses, each with five petals, held in olive branches. It stands in a clear glass bottle.",
    image: "/photos/olive-morning.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "late-tulips",
    name: "Late tulips",
    floristId: "cucurig",
    price: 86,
    occasions: ["Everyday", "Birthday", "Thank you"],
    stems: "Three cream tulips, two burgundy tulips",
    vaseLife: "5–7 days",
    description:
      "Five tulips in a tall clear glass: three cream and two burgundy. The stems and leaves show through the water.",
    image: "/photos/late-tulips.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "one-peony",
    name: "One peony",
    floristId: "cucurig",
    price: 74,
    occasions: ["Romance", "Birthday", "Wedding"],
    stems: "One blush peony",
    vaseLife: "4–6 days",
    description:
      "A single pale pink peony, fully open, in a low clear glass bowl. One stem, and nothing else.",
    image: "/photos/one-peony.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "night-dahlia",
    name: "Night dahlia",
    floristId: "cucurig",
    price: 82,
    occasions: ["Romance", "Everyday", "Birthday"],
    stems: "One burgundy dahlia",
    vaseLife: "4–6 days",
    description:
      "One deep red dahlia, petals packed to a dark center. It stands in a short clear glass.",
    image: "/photos/night-dahlia.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "dutch-iris",
    name: "Dutch iris",
    floristId: "cucurig",
    price: 78,
    occasions: ["Everyday", "Thank you", "Wedding"],
    stems: "Purple Dutch iris",
    vaseLife: "4–6 days",
    description:
      "Purple iris with a yellow signal, standing tall in a clear glass cylinder. Leaves and stems stay visible in the water.",
    image: "/photos/dutch-iris.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "freesia",
    name: "Freesia",
    floristId: "cucurig",
    price: 64,
    occasions: ["Thank you", "Everyday", "New baby"],
    stems: "White freesia",
    vaseLife: "5–7 days",
    description:
      "Arching stems of white freesia, a few bells still closed. It stands in a clear glass bottle.",
    image: "/photos/freesia.jpg",
    sameDay: true,
    signature: true,
  },
  {
    id: "white-poppy",
    name: "White poppy",
    floristId: "cucurig",
    price: 70,
    occasions: ["Sympathy", "Everyday", "Thank you"],
    stems: "Three white poppies",
    vaseLife: "3–5 days",
    description:
      "Three white poppies with dark centers, on thin stems. They stand in a small clear glass.",
    image: "/photos/white-poppy.jpg",
    sameDay: true,
    signature: true,
  }
];

export const DELIVERY_FEE = 12;
export const FREE_DELIVERY_FROM = 120;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function floristById(id: string) {
  return florists.find((florist) => florist.id === id);
}

export function arrangementById(id: string) {
  return arrangements.find((arrangement) => arrangement.id === id);
}

export function arrangementsForFlorist(floristId: string) {
  return arrangements.filter((arrangement) => arrangement.floristId === floristId);
}

export function deliveryFeeFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

export function dateISO(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function sameMorningOpen(now = new Date()) {
  return now.getHours() < 14;
}

export function formatLongDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
