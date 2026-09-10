const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const images = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=400&fit=crop",
];

export default function InstagramSection() {
  return (
    <section className="py-24 bg-gym-charcoal border-y border-gym-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">FOLLOW THE STORY.</h2>
          <a href="https://instagram.com/storygym.official" target="_blank" rel="noreferrer" className="text-gym-silver font-mono text-sm hover:text-white transition">
            @storygym.official
          </a>
        </div>
        <a href="https://instagram.com/storygym.official" target="_blank" rel="noreferrer" className="btn-outline hidden md:flex items-center gap-2">
          <InstagramIcon className="w-4 h-4" /> View Instagram
        </a>
      </div>

      <div className="flex gap-2 w-full overflow-x-auto hide-scrollbar px-6 md:px-0">
        {images.map((src, i) => (
          <a key={i} href="https://instagram.com/storygym.official" target="_blank" rel="noreferrer" className="relative group shrink-0 w-64 md:w-1/4 aspect-square bg-gym-surface overflow-hidden">
            <img
              src={src}
              alt={`Instagram post ${i+1}`}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
              <InstagramIcon className="w-8 h-8 text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
