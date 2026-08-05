const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
const Item = require("../models/Item");

const items = [
  //Movies
  {
    title: "Inception",
    type: "movie",
    genre: ["Sci-Fi", "Thriller"],
    description: "A thief who steals corporate secrets through dreams.",
    releaseYear: 2010,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    title: "The Dark Knight",
    type: "movie",
    genre: ["Action", "Drama"],
    description:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
    releaseYear: 2008,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Interstellar",
    type: "movie",
    genre: ["Sci-Fi", "Drama"],
    description:
      "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    releaseYear: 2014,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "The Avengers",
    type: "movie",
    genre: ["Action", "Sci-Fi"],
    description: "Earth's mightiest heroes team up to stop an alien invasion.",
    releaseYear: 2012,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7KE3wYQly.jpg",
  },
  {
    title: "Parasite",
    type: "movie",
    genre: ["Drama", "Thriller"],
    description:
      "A poor family schemes to become employed by a wealthy family.",
    releaseYear: 2019,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    title: "The Godfather",
    type: "movie",
    genre: ["Drama", "Crime"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his son.",
    releaseYear: 1972,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMsiL9BO75.jpg",
  },
  {
    title: "Forrest Gump",
    type: "movie",
    genre: ["Drama", "Romance"],
    description:
      "Life story of a kind-hearted man from Alabama who witnesses key historical events.",
    releaseYear: 1994,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    title: "The Matrix",
    type: "movie",
    genre: ["Sci-Fi", "Action"],
    description:
      "A hacker discovers the truth about his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    title: "Pulp Fiction",
    type: "movie",
    genre: ["Crime", "Drama"],
    description:
      "The lives of two mob hitmen, a boxer and others intertwine in four tales of violence.",
    releaseYear: 1994,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    title: "The Shawshank Redemption",
    type: "movie",
    genre: ["Drama", "Crime"],
    description:
      "Two imprisoned men bond over years, finding solace and redemption through acts of decency.",
    releaseYear: 1994,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
  },
  {
    title: "Avengers: Endgame",
    type: "movie",
    genre: ["Action", "Sci-Fi"],
    description:
      "After Thanos destroys half of all life, the Avengers assemble to reverse his actions.",
    releaseYear: 2019,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    title: "Titanic",
    type: "movie",
    genre: ["Romance", "Drama"],
    description:
      "A young aristocrat falls in love with a kind but poor artist aboard the Titanic.",
    releaseYear: 1997,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  },
  {
    title: "Oppenheimer",
    type: "movie",
    genre: ["Drama", "Thriller"],
    description:
      "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    releaseYear: 2023,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    title: "Dune",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    description:
      "A noble family becomes embroiled in a war for the most valuable substance in the universe.",
    releaseYear: 2021,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  },
  {
    title: "Spider-Man: No Way Home",
    type: "movie",
    genre: ["Action", "Sci-Fi"],
    description:
      "Spider-Man asks Doctor Strange to make people forget he is Peter Parker.",
    releaseYear: 2021,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },

  // BOoks
  {
    title: "Harry Potter",
    type: "book",
    genre: ["Fantasy", "Adventure"],
    description:
      "A young wizard discovers he is famous in the magical world and begins at Hogwarts.",
    releaseYear: 1997,
    posterUrl: "https://m.media-amazon.com/images/I/81YOuOGFCJL._SL1500_.jpg",
  },
  {
    title: "The Alchemist",
    type: "book",
    genre: ["Fiction", "Adventure"],
    description:
      "A shepherd's journey to find treasure teaches him about following his dreams.",
    releaseYear: 1988,
    posterUrl: "https://m.media-amazon.com/images/I/71aFt4+OTOL._SL1200_.jpg",
  },
  {
    title: "Atomic Habits",
    type: "book",
    genre: ["Self-Help", "Non-Fiction"],
    description:
      "Tiny changes, remarkable results. A guide to building good habits.",
    releaseYear: 2018,
    posterUrl: "https://m.media-amazon.com/images/I/81wgcld4wxL._SL1500_.jpg",
  },
  {
    title: "Rich Dad Poor Dad",
    type: "book",
    genre: ["Finance", "Self-Help"],
    description:
      "What the rich teach their kids about money that the poor and middle class do not.",
    releaseYear: 1997,
    posterUrl: "https://m.media-amazon.com/images/I/81bsw6fnUiL._SL1500_.jpg",
  },
  {
    title: "The Great Gatsby",
    type: "book",
    genre: ["Fiction", "Drama"],
    description:
      "The mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
    releaseYear: 1925,
    posterUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._SL1200_.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    type: "book",
    genre: ["Fiction", "Drama"],
    description:
      "A young girl's view of racial injustice in the American South.",
    releaseYear: 1960,
    posterUrl: "https://m.media-amazon.com/images/I/71FxgtFKcQL._SL1200_.jpg",
  },
  {
    title: "1984",
    type: "book",
    genre: ["Sci-Fi", "Fiction"],
    description:
      "A dystopian future where a totalitarian regime watches citizens through Big Brother.",
    releaseYear: 1949,
    posterUrl: "https://m.media-amazon.com/images/I/71kXnWgkBPL._SL1200_.jpg",
  },
  {
    title: "Sapiens",
    type: "book",
    genre: ["Non-Fiction", "Adventure"],
    description:
      "A brief history of humankind from ancient humans to modern civilization.",
    releaseYear: 2011,
    posterUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL._SL1200_.jpg",
  },
  {
    title: "The Hunger Games",
    type: "book",
    genre: ["Sci-Fi", "Adventure"],
    description:
      "In a dystopian future, teens must fight to the death in a televised competition.",
    releaseYear: 2008,
    posterUrl: "https://m.media-amazon.com/images/I/71un2hI4mcL._SL1200_.jpg",
  },
  {
    title: "Zero to One",
    type: "book",
    genre: ["Non-Fiction", "Finance"],
    description:
      "Notes on startups and how to build the future by PayPal co-founder Peter Thiel.",
    releaseYear: 2014,
    posterUrl: "https://m.media-amazon.com/images/I/71RNGFRxknL._SL1200_.jpg",
  },
  {
    title: "The Da Vinci Code",
    type: "book",
    genre: ["Thriller", "Fiction"],
    description:
      "A murder in the Louvre reveals a secret that could rock the foundations of Christianity.",
    releaseYear: 2003,
    posterUrl: "https://m.media-amazon.com/images/I/91Q5dCjc2KL._SL1500_.jpg",
  },
  {
    title: "Thinking Fast and Slow",
    type: "book",
    genre: ["Non-Fiction", "Self-Help"],
    description:
      "Explores the two systems that drive the way we think: fast intuition and slow logic.",
    releaseYear: 2011,
    posterUrl: "https://m.media-amazon.com/images/I/71wvKXBHRpL._SL1200_.jpg",
  },
  {
    title: "The Psychology of Money",
    type: "book",
    genre: ["Finance", "Self-Help"],
    description:
      "Timeless lessons on wealth, greed, and happiness through stories about money.",
    releaseYear: 2020,
    posterUrl: "https://m.media-amazon.com/images/I/71g2ednj0JL._SL1200_.jpg",
  },
  {
    title: "A Brief History of Time",
    type: "book",
    genre: ["Sci-Fi", "Non-Fiction"],
    description:
      "Stephen Hawking's landmark exploration of the universe and black holes.",
    releaseYear: 1988,
    posterUrl: "https://m.media-amazon.com/images/I/A11QNpGCFLL._SL1500_.jpg",
  },
  {
    title: "The Power of Habit",
    type: "book",
    genre: ["Self-Help", "Non-Fiction"],
    description:
      "Why we do what we do in life and business, and how habits can be changed.",
    releaseYear: 2012,
    posterUrl: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1200_.jpg",
  },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ Connected to MongoDB")
        await Item.deleteMany()

        // Add this line — clears old broken ratings too!
        const Rating = require('../models/Rating')
        await Rating.deleteMany()

        await Item.insertMany(items)
        console.log(`✅ Database seeded with ${items.length} items!`)
        mongoose.connection.close()
    } catch (err) {
        console.log("❌ Error:", err)
    }
};
seedDB();