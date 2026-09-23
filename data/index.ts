// ============================================================
// STORY GYM — STATIC DATA & TYPE DEFINITIONS
// ============================================================

// --- TYPES ---

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: "supplements" | "merch" | "equipment" | "bundles";
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  sizes?: string[];
  colors?: string[];
  image: string;
  images?: string[];
  tag?: string;
  bundleItems?: string[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
}

export interface GymClass {
  id: string;
  name: string;
  coach: string;
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: "strength" | "cardio" | "hiit" | "functional" | "mobility";
  slots: number;
  maxSlots: number;
  day: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  goal: string;
  text: string;
  rating: number;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tag?: string;
  price: number;
  benefits: string[];
}

export interface TrainingPackage {
  id: string;
  sessions: string;
  price: number;
  pricePerSession?: number;
  tag?: string;
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

// --- MEMBERSHIP PLANS ---

export const membershipPlans: MembershipPlan[] = [
  {
    id: "daily",
    name: "DAILY PASS",
    price: 50000,
    benefits: ["1 Day Full Access", "Locker & Shower"],
  },
  {
    id: "1-month",
    name: "1 MONTH",
    price: 150000,
    benefits: ["Full Gym Access", "Locker & Shower", "All Classes"],
  },
  {
    id: "3-months",
    name: "3 MONTHS",
    tag: "POPULAR",
    price: 400000,
    benefits: ["Full Gym Access", "Locker & Shower", "All Classes"],
  },
  {
    id: "6-months",
    name: "6 MONTHS",
    price: 700000,
    benefits: ["Full Gym Access", "Locker & Shower", "All Classes"],
  },
  {
    id: "1-year",
    name: "1 YEAR",
    tag: "BEST VALUE",
    price: 1400000,
    benefits: ["Full Gym Access", "Locker & Shower", "All Classes"],
  },
  {
    id: "member-card",
    name: "MEMBER CARD / JOINING",
    price: 75000,
    benefits: ["One-time joining fee", "Physical Member Card"],
  },
];

// --- PERSONAL TRAINER PACKAGES ---

export const ptPackages: TrainingPackage[] = [
  {
    id: "pt-8",
    sessions: "8X PERTEMUAN",
    price: 1000000,
    benefits: ["Customized Program", "Nutrition Guide", "Body Metric Tracking"],
  },
  {
    id: "pt-12",
    sessions: "12X PERTEMUAN",
    price: 1200000,
    tag: "POPULAR",
    benefits: ["Customized Program", "Nutrition Guide", "Body Metric Tracking"],
  },
  {
    id: "pt-20",
    sessions: "20X PERTEMUAN",
    price: 2200000,
    tag: "BEST VALUE",
    benefits: ["Customized Program", "Nutrition Guide", "Body Metric Tracking"],
  },
];

// --- DUO TRAINING PACKAGES ---

export const duoPackages: TrainingPackage[] = [
  {
    id: "duo-8",
    sessions: "8X PERTEMUAN",
    price: 1700000,
    benefits: ["Train with a Partner", "Customized Program", "Nutrition Guide"],
  },
  {
    id: "duo-12",
    sessions: "12X PERTEMUAN",
    price: 2200000,
    benefits: ["Train with a Partner", "Customized Program", "Nutrition Guide"],
  },
  {
    id: "duo-20",
    sessions: "20X PERTEMUAN",
    price: 4000000,
    benefits: ["Train with a Partner", "Customized Program", "Nutrition Guide"],
  },
];

// --- TRAINERS ---

export const trainers: Trainer[] = [
  {
    id: "arief",
    name: "COACH ARIEF",
    title: "Head Coach",
    specialization: "Strength & Conditioning",
    experience: "8+ Years Experience",
    image: "/images/trainers/coach-arief.jpg",
    bio: "Spesialis strength training dan body transformation. Berpengalaman melatih atlet dan member dari berbagai level.",
  },
  {
    id: "sisca",
    name: "COACH SISCA",
    title: "Fitness Coach",
    specialization: "Weight Loss & Toning",
    experience: "6+ Years Experience",
    image: "/images/trainers/coach-sisca.jpg",
    bio: "Ahli dalam program penurunan berat badan dan body toning. Pendekatan holistik untuk hasil yang berkelanjutan.",
  },
  {
    id: "appy",
    name: "COACH APPY",
    title: "Fitness Coach",
    specialization: "Functional Training",
    experience: "5+ Years Experience",
    image: "/images/trainers/coach-appy.jpg",
    bio: "Fokus pada functional movement dan mobilitas. Membantu member bergerak lebih baik dalam kehidupan sehari-hari.",
  },
  {
    id: "ilman",
    name: "COACH ILMAN",
    title: "Fitness Coach",
    specialization: "Muscle Building",
    experience: "7+ Years Experience",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop",
    bio: "Spesialis hypertrophy dan muscle building. Program terstruktur untuk hasil maksimal.",
  },
  {
    id: "resty",
    name: "COACH RESTY",
    title: "Fitness Coach",
    specialization: "HIIT & Group Classes",
    experience: "4+ Years Experience",
    image: "https://images.unsplash.com/photo-1609899464926-209b0035b6c1?w=400&h=500&fit=crop",
    bio: "Energetic group class instructor. Membuat setiap sesi latihan menyenangkan dan menantang.",
  },
];

// --- CLASSES ---

export const gymClasses: GymClass[] = [
  { id: "1", name: "Power Lift", coach: "Coach Arief", time: "07:00", duration: "60 min", level: "Intermediate", category: "strength", slots: 8, maxSlots: 12, day: "Monday" },
  { id: "2", name: "Fat Burn HIIT", coach: "Coach Resty", time: "08:00", duration: "45 min", level: "All Levels", category: "hiit", slots: 5, maxSlots: 15, day: "Monday" },
  { id: "3", name: "Cardio Blast", coach: "Coach Sisca", time: "09:30", duration: "50 min", level: "Beginner", category: "cardio", slots: 10, maxSlots: 15, day: "Monday" },
  { id: "4", name: "Functional Flow", coach: "Coach Appy", time: "16:00", duration: "55 min", level: "All Levels", category: "functional", slots: 7, maxSlots: 12, day: "Tuesday" },
  { id: "5", name: "Muscle Builder", coach: "Coach Ilman", time: "17:30", duration: "60 min", level: "Advanced", category: "strength", slots: 3, maxSlots: 10, day: "Tuesday" },
  { id: "6", name: "Yoga & Mobility", coach: "Coach Sisca", time: "07:00", duration: "60 min", level: "All Levels", category: "mobility", slots: 12, maxSlots: 15, day: "Wednesday" },
  { id: "7", name: "Tabata Express", coach: "Coach Resty", time: "12:00", duration: "30 min", level: "Intermediate", category: "hiit", slots: 6, maxSlots: 12, day: "Wednesday" },
  { id: "8", name: "Total Body", coach: "Coach Arief", time: "18:00", duration: "60 min", level: "All Levels", category: "functional", slots: 4, maxSlots: 12, day: "Thursday" },
  { id: "9", name: "Spin Cycle", coach: "Coach Appy", time: "07:30", duration: "45 min", level: "Beginner", category: "cardio", slots: 9, maxSlots: 12, day: "Friday" },
  { id: "10", name: "Strength Circuit", coach: "Coach Ilman", time: "16:30", duration: "50 min", level: "Intermediate", category: "strength", slots: 6, maxSlots: 10, day: "Saturday" },
];

// --- FACILITIES ---

export const facilities: Facility[] = [
  { id: "1", name: "STRENGTH AREA", category: "strength", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop", description: "Area latihan beban lengkap dengan equipment premium." },
  { id: "2", name: "CARDIO AREA", category: "cardio", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop", description: "Treadmill, elliptical, dan rowing machine terbaru." },
  { id: "3", name: "FREE WEIGHT", category: "freeweight", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop", description: "Dumbbells, barbells, dan plates untuk latihan bebas." },
  { id: "4", name: "FUNCTIONAL AREA", category: "functional", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", description: "Battle ropes, kettlebells, dan TRX area." },
  { id: "5", name: "LOCKER ROOM", category: "locker", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", description: "Locker pribadi yang aman dan bersih." },
  { id: "6", name: "CHANGING ROOM", category: "changing", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop", description: "Ruang ganti yang luas dan nyaman." },
  { id: "7", name: "SHOWER", category: "shower", image: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=600&h=400&fit=crop", description: "Shower bersih dengan air panas." },
];

// --- PRODUCTS ---

export const products: Product[] = [
  // SUPPLEMENTS
  {
    slug: "whey-protein",
    name: "Whey Protein",
    brand: "Story Nutrition",
    category: "supplements",
    price: 450000,
    rating: 4.8,
    reviews: 124,
    stock: 25,
    description: "Premium whey protein isolate untuk mendukung recovery dan pertumbuhan otot. 25g protein per serving.",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&h=800&fit=crop",
    ],
    sizes: ["1 lb", "2 lbs", "5 lbs"],
    colors: ["Chocolate", "Vanilla", "Strawberry"],
  },
  {
    slug: "creatine",
    name: "Creatine Monohydrate",
    brand: "Story Nutrition",
    category: "supplements",
    price: 250000,
    rating: 4.9,
    reviews: 89,
    stock: 40,
    description: "Pure creatine monohydrate untuk meningkatkan kekuatan dan performa latihan.",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=400&fit=crop",
    sizes: ["250g", "500g"],
  },
  {
    slug: "pre-workout",
    name: "Pre-Workout",
    brand: "Story Nutrition",
    category: "supplements",
    price: 350000,
    rating: 4.7,
    reviews: 67,
    stock: 18,
    description: "Formula pre-workout untuk energi dan fokus maksimal selama latihan.",
    image: "https://images.unsplash.com/photo-1594498653385-d5533f61b6e3?w=400&h=400&fit=crop",
    sizes: ["30 servings", "60 servings"],
    colors: ["Fruit Punch", "Blue Raspberry"],
  },
  {
    slug: "mass-gainer",
    name: "Mass Gainer",
    brand: "Story Nutrition",
    category: "supplements",
    price: 550000,
    rating: 4.6,
    reviews: 45,
    stock: 15,
    description: "High-calorie mass gainer untuk mendukung program bulking dan penambahan berat badan.",
    image: "https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400&h=400&fit=crop",
    sizes: ["3 lbs", "6 lbs"],
    colors: ["Chocolate", "Vanilla"],
  },
  {
    slug: "electrolytes",
    name: "Electrolytes",
    brand: "Story Nutrition",
    category: "supplements",
    price: 150000,
    rating: 4.8,
    reviews: 56,
    stock: 50,
    description: "Elektrolit untuk hidrasi optimal selama latihan intens.",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=400&fit=crop",
    sizes: ["30 sachets", "60 sachets"],
  },
  {
    slug: "protein-snacks",
    name: "Protein Snacks",
    brand: "Story Nutrition",
    category: "supplements",
    price: 85000,
    rating: 4.5,
    reviews: 38,
    stock: 60,
    description: "Snack tinggi protein untuk camilan sehat sebelum atau sesudah latihan.",
    image: "https://images.unsplash.com/photo-1622484211148-c9b5f7e5e5c5?w=400&h=400&fit=crop",
    sizes: ["Box of 6", "Box of 12"],
  },
  // MERCH
  {
    slug: "story-gym-tshirt",
    name: "Story Gym T-Shirt",
    brand: "Story Gym",
    category: "merch",
    price: 199000,
    rating: 4.9,
    reviews: 82,
    stock: 30,
    description: "Premium cotton t-shirt dengan desain minimalis Story Gym.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
  },
  {
    slug: "story-gym-oversized-tee",
    name: "Story Gym Oversized Tee",
    brand: "Story Gym",
    category: "merch",
    price: 249000,
    rating: 4.8,
    reviews: 64,
    stock: 25,
    description: "Oversized fit tee untuk style yang kasual dan nyaman.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
  },
  {
    slug: "story-gym-tank-top",
    name: "Story Gym Tank Top",
    brand: "Story Gym",
    category: "merch",
    price: 149000,
    rating: 4.7,
    reviews: 41,
    stock: 35,
    description: "Breathable tank top untuk latihan yang intens.",
    image: "https://images.unsplash.com/photo-1503341504253-dff4f94032ef?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    slug: "story-gym-hoodie",
    name: "Story Gym Hoodie",
    brand: "Story Gym",
    category: "merch",
    price: 399000,
    rating: 4.9,
    reviews: 73,
    stock: 20,
    description: "Premium heavyweight hoodie dengan embroidered Story Gym logo.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Gray"],
  },
  {
    slug: "story-gym-cap",
    name: "Story Gym Cap",
    brand: "Story Gym",
    category: "merch",
    price: 129000,
    rating: 4.6,
    reviews: 55,
    stock: 40,
    description: "Adjustable cap dengan embroidered Story Gym logo.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=400&fit=crop",
    colors: ["Black", "White"],
  },
  {
    slug: "story-gym-towel",
    name: "Story Gym Towel",
    brand: "Story Gym",
    category: "merch",
    price: 99000,
    rating: 4.7,
    reviews: 39,
    stock: 50,
    description: "Microfiber gym towel yang cepat kering dan super absorbent.",
    image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=400&h=400&fit=crop",
    colors: ["Black", "Gray"],
  },
  {
    slug: "story-gym-bag",
    name: "Story Gym Bag",
    brand: "Story Gym",
    category: "merch",
    price: 349000,
    rating: 4.8,
    reviews: 48,
    stock: 15,
    description: "Durable gym bag dengan kompartemen sepatu terpisah.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    colors: ["Black"],
  },
  {
    slug: "story-gym-bottle",
    name: "Story Gym Bottle",
    brand: "Story Gym",
    category: "merch",
    price: 159000,
    rating: 4.8,
    reviews: 91,
    stock: 45,
    description: "Stainless steel water bottle 750ml dengan Story Gym branding.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    colors: ["Black", "Silver"],
  },
  // EQUIPMENT
  {
    slug: "resistance-bands",
    name: "Resistance Band Set",
    brand: "Story Gym",
    category: "equipment",
    price: 199000,
    rating: 4.7,
    reviews: 34,
    stock: 30,
    description: "Set resistance band 5 level untuk latihan di mana saja.",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
  },
  {
    slug: "jump-rope",
    name: "Speed Jump Rope",
    brand: "Story Gym",
    category: "equipment",
    price: 129000,
    rating: 4.6,
    reviews: 28,
    stock: 35,
    description: "Adjustable speed rope untuk cardio dan HIIT.",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop",
  },
  {
    slug: "yoga-mat",
    name: "Premium Yoga Mat",
    brand: "Story Gym",
    category: "equipment",
    price: 299000,
    rating: 4.8,
    reviews: 52,
    stock: 20,
    description: "Non-slip yoga mat 6mm dengan carrying strap.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    colors: ["Black", "Gray"],
  },
  {
    slug: "wrist-wraps",
    name: "Wrist Wraps",
    brand: "Story Gym",
    category: "equipment",
    price: 99000,
    rating: 4.5,
    reviews: 22,
    stock: 40,
    description: "Supportive wrist wraps untuk heavy lifting.",
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=400&fit=crop",
    colors: ["Black"],
  },
  // BUNDLES
  {
    slug: "starter-bundle",
    name: "Starter Bundle",
    brand: "Story Gym",
    category: "bundles",
    price: 399000,
    originalPrice: 527000,
    rating: 4.9,
    reviews: 36,
    stock: 10,
    description: "Paket lengkap untuk memulai perjalanan fitness kamu.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    tag: "BEST VALUE",
    bundleItems: ["1 Month Membership", "Story Gym T-Shirt", "Shaker Bottle"],
  },
  {
    slug: "progress-bundle",
    name: "Progress Bundle",
    brand: "Story Gym",
    category: "bundles",
    price: 649000,
    originalPrice: 859000,
    rating: 4.8,
    reviews: 28,
    stock: 12,
    description: "Suplemen lengkap untuk mendukung progress latihanmu.",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=400&h=400&fit=crop",
    bundleItems: ["Whey Protein 2lbs", "Creatine 250g", "Shaker Bottle"],
  },
  {
    slug: "story-bundle",
    name: "Story Bundle",
    brand: "Story Gym",
    category: "bundles",
    price: 999000,
    originalPrice: 1397000,
    rating: 5.0,
    reviews: 15,
    stock: 5,
    description: "Paket terlengkap: membership, merch, suplemen, dan aksesoris.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    tag: "ULTIMATE",
    bundleItems: ["1 Month Membership", "Story Gym Hoodie", "Whey Protein", "Gym Bag", "Shaker"],
  },
];

// --- TESTIMONIALS ---

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Andi Pratama",
    goal: "Weight Loss",
    text: "Turun 15kg dalam 6 bulan di Story Gym. Coach Sisca sangat membantu dengan program dan nutrisi. Fasilitas lengkap dan suasana yang mendukung.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Dian Safitri",
    goal: "Build Muscle",
    text: "Dari pemula sampai bisa deadlift 100kg. Story Gym punya equipment yang lengkap dan coach yang sabar membimbing. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Rizky Fadillah",
    goal: "Improve Fitness",
    text: "Sudah 2 tahun jadi member Story Gym. Komunitas yang solid dan fasilitas yang terus di-upgrade. Tempat terbaik untuk latihan di Makassar.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    name: "Siti Nurhaliza",
    goal: "Gain Strength",
    text: "Group class di Story Gym sangat seru! Coach Resty bikin setiap sesi jadi menyenangkan. Lingkungannya juga sangat positif dan suportif.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    name: "Budi Santoso",
    goal: "Body Transformation",
    text: "Personal trainer di Story Gym benar-benar profesional. Program yang dibuat Coach Arief sangat terstruktur. Hasil yang saya dapat luar biasa.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
];

// --- FAQ ---

export const faqs: FAQ[] = [
  {
    question: "Berapa harga membership?",
    answer: "Story Gym menawarkan 3 paket membership: Story Basic mulai dari Rp 250.000/bulan, Story Plus mulai dari Rp 400.000/bulan, dan Story Elite mulai dari Rp 750.000/bulan. Dapatkan diskon hingga 30% untuk paket 12 bulan.",
  },
  {
    question: "Apakah tersedia free trial?",
    answer: "Ya! Kami menyediakan free trial untuk kamu yang ingin merasakan pengalaman latihan di Story Gym sebelum berkomitmen. Kunjungi halaman Free Trial atau hubungi kami via WhatsApp untuk mendaftar.",
  },
  {
    question: "Apakah tersedia personal trainer?",
    answer: "Story Gym memiliki 5+ personal trainer berpengalaman yang siap membantu kamu mencapai fitness goals. Sesi PT bisa di-booking langsung melalui website atau aplikasi member.",
  },
  {
    question: "Apa saja fasilitas Story Gym?",
    answer: "Fasilitas kami meliputi: Strength Area, Cardio Area, Free Weight Zone, Functional Training Area, Locker Room, Changing Room, dan Shower. Semua equipment adalah premium grade.",
  },
  {
    question: "Apakah pemula bisa bergabung?",
    answer: "Tentu saja! Story Gym menyambut member dari semua level, termasuk pemula. Kami menyediakan fitness consultation gratis dan ada kelas-kelas khusus untuk beginner.",
  },
  {
    question: "Bagaimana cara booking kelas?",
    answer: "Booking kelas bisa dilakukan melalui website kami di halaman Classes atau melalui member dashboard. Pilih kelas yang tersedia, pilih jadwal, dan konfirmasi booking kamu.",
  },
  {
    question: "Apakah tersedia suplemen?",
    answer: "Ya, Story Gym Store menyediakan berbagai suplemen fitness berkualitas termasuk Whey Protein, Creatine, Pre-Workout, dan lainnya. Bisa dibeli langsung di gym atau melalui online store.",
  },
  {
    question: "Apakah tersedia merchandise?",
    answer: "Story Gym memiliki koleksi merchandise eksklusif termasuk t-shirt, hoodie, tank top, cap, gym bag, dan aksesoris lainnya. Semua tersedia di Story Gym Store.",
  },
  {
    question: "Bagaimana cara membeli produk?",
    answer: "Produk bisa dibeli melalui Story Gym Store di website ini. Tambahkan produk ke keranjang, isi data pengiriman, pilih metode pembayaran, dan selesaikan pesanan kamu.",
  },
  {
    question: "Apa metode pembayaran yang tersedia?",
    answer: "Kami menerima pembayaran melalui QRIS, Bank Transfer (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, DANA, ShopeePay), dan Kartu Kredit/Debit.",
  },
];

// --- HELPER FUNCTIONS ---

export function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}

export function getSavingsPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

export function getWhatsAppLink(type: "membership" | "pt" | "freetrial" | "shop"): string {
  const phone = "6285186849980";
  let message = "";
  
  if (type === "membership") {
    message = "Hallo Story Gym, saya ingin mengetahui informasi membership.";
  } else if (type === "pt") {
    message = "Hallo Story Gym, saya tertarik mengambil Personal Trainer.";
  } else if (type === "freetrial") {
    message = "Hallo Story Gym, saya ingin claim Free Trial.";
  } else if (type === "shop") {
    message = "Hallo Story Gym, saya ingin bertanya tentang produk di Store.";
  }
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
