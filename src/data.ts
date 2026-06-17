export type Language = 'en' | 'ar' | 'fr';

export const translations = {
  en: {
    nav: { home: "Home", menu: "Menu", story: "Our Story", reserve: "Reserve" },
    hero: { subtitle: "Authentic Qatari Cuisine", title: "A Symphony of Flavor", cta: "Discover the Menu" },
    about: { title: "Our Heritage", desc: "Experience the rich traditions of Qatar through our meticulously crafted dishes. Every bite tells a story of hospitality, spice, and history." },
    menu: { title: "Culinary Masterpieces", categories: { all: "All", breakfast: "Breakfast", appetizers: "Appetizers", main: "Main Course", desserts: "Desserts", drinks: "Drinks" } },
    reservation: { title: "Reserve Your Table", date: "Date", time: "Time", guests: "Guests", submit: "Confirm Booking" },
    footer: { rights: "All rights reserved." }
  },
  ar: {
    nav: { home: "الرئيسية", menu: "القائمة", story: "قصتنا", reserve: "احجز" },
    hero: { subtitle: "المطبخ القطري الأصيل", title: "سيمفونية من النكهات", cta: "اكتشف القائمة" },
    about: { title: "تراثنا", desc: "جرب تقاليد قطر الغنية من خلال أطباقنا المعدة بعناية. كل لقمة تحكي قصة من كرم الضيافة والتوابل والتاريخ." },
    menu: { title: "روائع الطهي", categories: { all: "الكل", breakfast: "الإفطار", appetizers: "المقبلات", main: "الطبق الرئيسي", desserts: "الحلويات", drinks: "المشروبات" } },
    reservation: { title: "احجز طاولتك", date: "التاريخ", time: "الوقت", guests: "الضيوف", submit: "تأكيد الحجز" },
    footer: { rights: "جميع الحقوق محفوظة." }
  },
  fr: {
    nav: { home: "Accueil", menu: "Menu", story: "Notre Histoire", reserve: "Réserver" },
    hero: { subtitle: "Cuisine Qatarienne Authentique", title: "Une Symphonie de Saveurs", cta: "Découvrir le Menu" },
    about: { title: "Notre Héritage", desc: "Découvrez les riches traditions du Qatar à travers nos plats méticuleusement élaborés. Chaque bouchée raconte une histoire d'hospitalité." },
    menu: { title: "Chefs-d'œuvre Culinaires", categories: { all: "Tout", breakfast: "Petit Déjeuner", appetizers: "Entrées", main: "Plat Principal", desserts: "Desserts", drinks: "Boissons" } },
    reservation: { title: "Réserver une Table", date: "Date", time: "Heure", guests: "Invités", submit: "Confirmer" },
    footer: { rights: "Tous droits réservés." }
  }
};

export const menuData = [
  // Desserts
  {
    id: 1,
    name: "Algaymat ",
    desc: "Fried dough balls, sugar syrup and dates syrup.",
    price: 36.00,
    category: "desserts",
    // Golden fried dough balls drizzled with syrup
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 2,
    name: "Pistachio Mafroka Kunafa",
    desc: "Pistachio, sugar syrup, rose water and your choice of ice cream.",
    price: 44.00,
    category: "desserts",
    // Shredded kunafa pastry with pistachios
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 3,
    name: "Saffron Cake",
    desc: "Infused with the delicate flavors of Persian saffron and baked to golden perfection.",
    price: 58.00,
    category: "desserts",
    featured: true,
    // Golden layered cake slice
    image: "https://images.unsplash.com/photo-1602663491496-73f07481dbea?auto=format&fit=crop&w=1200&q=80"
  },

  // Appetizers
  {
    id: 4,
    name: "Hummus",
    desc: "Made with the freshest ingredients, including chickpeas, tahini and lemon juice.",
    price: 37.00,
    category: "appetizers",
    // Bowl of creamy hummus with olive oil garnish
    image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 5,
    name: "Muttabal",
    desc: "Cooked and mashed eggplants, mixed with tahini, garlic and lemon.",
    price: 37.00,
    category: "appetizers",
    // Smoky baba ganoush / muttabal dip with garnish
    image: "https://images.unsplash.com/photo-1734772192785-2986a99ce40f?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 6,
    name: "Meat Samosa",
    desc: "Deep-fried pastry filled with spiced meat.",
    price: 36.00,
    category: "appetizers",
    // Crispy fried samosa pastries
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"
  },

  // Breakfast
  {
    id: 7,
    name: "Shakshuka",
    desc: "Scrambled eggs, tomato and special seasoning.",
    price: 48.00,
    category: "breakfast",
    // Eggs poached in tomato sauce in a cast iron pan
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 8,
    name: "Bagshat Basta",
    desc: "Qaymar, labneh, cream cheese, cheddar cheese, zaatar, honey, jam and olives.",
    price: 55.00,
    category: "breakfast",
    featured: true,
    // Arabic breakfast spread with cheeses, honey and olives
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80"
  },

  // Main Course
  {
    id: 9,
    name: "Majbos Al Raza",
    desc: "Half chicken cooked with yellow rice simmered in chicken stock with special basta arabic spices.",
    price: 105.00,
    category: "main",
    featured: true,
    // Whole roasted chicken on fragrant yellow rice
    image: "https://images.unsplash.com/photo-1603496987674-79600a000f55?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 10,
    name: "Margoga Meat",
    desc: "Choice of arabic or regag bread simmered in meat stew and seasonal vegetables.",
    price: 95.00,
    category: "main",
    // Rich meat stew with tender chunks of beef
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 11,
    name: "Biryani Kumar Meat",
    desc: "Meat cubes cooked with mix of rice, onion, raisins and cashew nut.",
    price: 90.00,
    category: "main",
    // Aromatic rice dish with meat, raisins and cashews
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 12,
    name: "Morrabian Basta",
    desc: "Shrimps cooked with yellow rice simmered in shrimps stock, special arabic spices.",
    price: 120.00,
    category: "main",
    featured: true,
    // Saffron rice with shrimps and seafood
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=80"
  },

  // Drinks
  {
    id: 13,
    name: "Doha Mojito",
    desc: "Lemon, pineapple and ginger.",
    price: 32.00,
    category: "drinks",
    // Refreshing mojito-style cocktail with mint and citrus
    image: "https://images.unsplash.com/photo-1653542772393-71ffa417b1c4?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 14,
    name: "Arabic Coffee",
    desc: "Traditional brew made from premium beans, infused with fragrant cardamom.",
    price: 20.00,
    category: "drinks",
    // Traditional brass dallah coffee pot with smoke
    image: "https://images.unsplash.com/photo-1618597778480-8c5d3f2d3ba8?auto=format&fit=crop&w=1200&q=80"
  },

  {
    id: 15,
    name: "Saffron Juice",
    desc: "Milk, saffron, mango, saffron ice cream and pistachio.",
    price: 36.00,
    category: "drinks",
    // Golden mango and saffron drink
    image: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?auto=format&fit=crop&w=1200&q=80"
  }
];