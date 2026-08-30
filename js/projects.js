const PROJECTS = [
  {
    id: "proj-01",
    slug: "echoes-of-frost",
    title: "Echoes Of Frost",
    tagline: "A brutal 2D brawler set in a frozen, unforgiving world",
    engine: "Godot 4.6",
    lang: "GDScript + GDShader + C#",
    status: "released",
    year: "2025",
    platforms: ["windows", "linux"],
    page: "games/echoes-of-frost.html",
    thumbnail: "assets/eof/echoes-of-frost.png",
    youtubeId: "5JwgfB2m98g",
    screenshots: [
      "assets/eof/eofs.png",
      "assets/eof/eofs2.png",
      "assets/eof/eofs3.png"
    ],
    description:
      "A fighting game set in a brutal, gray world. The story follows a hero seeking revenge against a group of gangs that took everything from him. Built with custom shader-driven visual effects and a responsive combat system.",
    tags: ["Brawler", "2D", "Combat"],
    links: {
      play: "https://iwx-10.itch.io/echoes-of-frost-demo",
      source: null
    }
  },
  {
    id: "proj-02",
    slug: "in-the-air",
    title: "In The Air",
    tagline: "An emerging 3D game exploring floating islands in a magical universe",
    engine: "Godot 4.7",
    lang: "GDScript + GDShader + C# + C++",
    status: "in-dev",
    year: "2026",
    platforms: ["windows", "linux", "mac"],
    page: "games/in-the-air.html",
    thumbnail: "assets/in-the-air/in-the-air.png",
    youtubeId: "IoHalbvmXh0",
    screenshots: [
      "assets/in-the-air/itas.png",
      "assets/in-the-air/itas2.png",
      "assets/in-the-air/itas3.png"
    ],
    description:
      "Embark on an epic journey through floating islands in a magical universe. Explore unique environments, uncover secrets, and experience a fresh approach to 3D exploration gameplay.",
    tags: ["Exploration", "3D", "Fantasy"],
    links: {
      play: null,
      source: null
    }
  },
  {
    id: "proj-03",
    slug: "falling-core",
    title: "Falling Core",
    tagline: "The ultimate endless-fall reflex challenge",
    engine: "Godot 4.7",
    lang: "GDScript",
    status: "released",
    year: "2026",
    platforms: ["android", "web"],
    page: "games/falling-core.html",
    thumbnail: "assets/falling-core/falling-core.png",
    youtubeId: "fkKXTDcdtdg",
    screenshots: [
      "assets/falling-core/fc.png",
      "assets/falling-core/fc2.png",
      "assets/falling-core/fc3.png"
    ],
    description:
      "In this fast-paced, thrilling game, you control a glowing energy core plummeting from the sky at breakneck speed. Your mission is simple but demanding: dodge deadly obstacles and survive as long as possible.",
    tags: ["Arcade", "Endless", "Reflex"],
    links: {
      play: null,
      source: null
    }
  }
];

const STATUS_LABELS = {
  released: "Available to play",
  "in-dev": "In development",
  prototype: "Prototype"
};

const PLATFORM_LABELS = {
  windows: "Windows",
  linux: "Linux",
  mac: "macOS",
  web: "Web",
  android: "Android"
};
