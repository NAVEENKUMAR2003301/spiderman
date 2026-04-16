import React, { useState } from 'react';

const SpidermanCards = () => {
    const [selectedSpider, setSelectedSpider] = useState(null);

    const spidermen = [
        {
            id: 1,
            name: "Peter Parker (Earth-616)",
            alterEgo: "Peter Benjamin Parker",
            occupation: "Photographer, Scientist",
            abilities: "Wall-crawling, Superhuman strength, Spider-sense, Web-shooting",
            firstAppearance: "Amazing Fantasy #15 (1962)",
            creator: "Stan Lee & Steve Ditko",
            description: "The original Spider-Man, a teenager bitten by a radioactive spider who learned that 'with great power comes great responsibility.'",
            image: "https://i.pinimg.com/736x/5f/6d/6b/5f6d6ba28e9d2c5b47f25e9b6a4f8c3d.jpg",
            bgColor: "from-red-600 to-blue-700"
        },
        {
            id: 2,
            name: "Miles Morales",
            alterEgo: "Miles Gonzalo Morales",
            occupation: "Student",
            abilities: "Venom strike, Camouflage, Wall-crawling, Spider-sense",
            firstAppearance: "Ultimate Fallout #4 (2011)",
            creator: "Brian Michael Bendis & Sara Pichelli",
            description: "A teenager from Brooklyn who was bitten by a genetically altered spider, becoming the second Spider-Man in the Ultimate universe.",
            image: "https://i.pinimg.com/736x/2e/2e/5a/2e2e5a3e7b9c4f6a8d1b7c9e0f5a3d2b.jpg",
            bgColor: "from-black to-red-700"
        },
        {
            id: 3,
            name: "Gwen Stacy (Spider-Gwen)",
            alterEgo: "Gwendolyne Maxine Stacy",
            occupation: "Musician (drummer)",
            abilities: "Wall-crawling, Superhuman agility, Spider-sense",
            firstAppearance: "Edge of Spider-Verse #2 (2014)",
            creator: "Jason Latour & Robbi Rodriguez",
            description: "In an alternate universe, Gwen Stacy was bitten by the radioactive spider instead of Peter Parker.",
            image: "https://i.pinimg.com/736x/7a/3e/7d/7a3e7d1c8f4b2e5a6d9c8f1e3a7b2d4c.jpg",
            bgColor: "from-white to-blue-500"
        },
        {
            id: 4,
            name: "Miguel O'Hara (Spider-Man 2099)",
            alterEgo: "Miguel O'Hara",
            occupation: "Geneticist",
            abilities: "Talons, Fangs, Accelerated vision, Wall-crawling",
            firstAppearance: "Spider-Man 2099 #1 (1992)",
            creator: "Peter David & Rick Leonardi",
            description: "A brilliant geneticist from the year 2099 who gained spider-like abilities after a genetic splicing accident.",
            image: "https://i.pinimg.com/736x/4c/8d/5e/4c8d5e6a2f9b3c7d1e5a8b2c4d6f9e7a.jpg",
            bgColor: "from-red-800 to-blue-900"
        },
        {
            id: 5,
            name: "Peter B. Parker",
            alterEgo: "Peter B. Parker",
            occupation: "Former Hero",
            abilities: "All standard Spider-powers, Experience",
            firstAppearance: "Spider-Verse (2018)",
            creator: "Phil Lord & Rodney Rothman",
            description: "A worn-down, middle-aged Peter Parker who has seen better days but still has the heart of a hero.",
            image: "https://i.pinimg.com/736x/8b/5e/3f/8b5e3f2a7c4d1e6b9f8a3c5d7e2b4a6c.jpg",
            bgColor: "from-green-800 to-blue-600"
        },
        {
            id: 6,
            name: "Penny Parker (SP//dr)",
            alterEgo: "Peni Parker",
            occupation: "Student, Mecha Pilot",
            abilities: "Psychic link with SP//dr mech suit",
            firstAppearance: "Edge of Spider-Verse #5 (2014)",
            creator: "Gerard Way & Jake Wyatt",
            description: "A young anime-inspired girl who pilots a spider-themed mech suit inherited from her father.",
            image: "https://i.pinimg.com/736x/6f/3e/8a/6f3e8a2b5c7d9e1f4a2b6c8d3e5f7a9b.jpg",
            bgColor: "from-pink-600 to-purple-700"
        },
        {
            id: 7,
            name: "Spider-Noir",
            alterEgo: "Peter Parker",
            occupation: "Detective",
            abilities: "Enhanced senses, Hand-to-hand combat",
            firstAppearance: "Spider-Man Noir #1 (2009)",
            creator: "David Hine & Fabrice Sapolsky",
            description: "A gritty, 1930s detective version of Spider-Man operating during the Great Depression.",
            image: "https://i.pinimg.com/736x/3d/7e/2b/3d7e2b5a8c4d6f1e9b2a4c6d8f1e3b5a.jpg",
            bgColor: "from-gray-900 to-black"
        },
        {
            id: 8,
            name: "Spider-Ham (Peter Porker)",
            alterEgo: "Peter Porker",
            occupation: "Cartoon Character",
            abilities: "Toon force, Wall-crawling",
            firstAppearance: "Marvel Tails #1 (1983)",
            creator: "Tom DeFalco & Mark Armstrong",
            description: "An anthropomorphic pig from an alternate universe where animals are the dominant species.",
            image: "https://i.pinimg.com/736x/9c/4e/2a/9c4e2a5b7d8f1e3a6c4b2d8f5e7a9c3b.jpg",
            bgColor: "from-red-500 to-pink-500"
        }
    ];

    const Modal = ({ spider, onClose }) => {
        if (!spider) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm animate-fadeIn">
                <div className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
                    >
                        ✕
                    </button>

                    <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                            src={spider.image}
                            alt={spider.name}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${spider.bgColor} opacity-60`}></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">{spider.name}</h2>
                            <p className="text-gray-200 text-lg">{spider.alterEgo}</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400 font-semibold">Occupation</p>
                                <p className="text-white">{spider.occupation}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 font-semibold">First Appearance</p>
                                <p className="text-white">{spider.firstAppearance}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 font-semibold">Creator</p>
                                <p className="text-white">{spider.creator}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 font-semibold">Abilities</p>
                                <p className="text-white text-sm">{spider.abilities}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 font-semibold mb-2">About</p>
                            <p className="text-gray-300 leading-relaxed">{spider.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-bounce">
                        🕷️ Spider-Verse 🕸️
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Meet the amazing Spider-People from across the multiverse. Click any card to learn more!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {spidermen.map((spider) => (
                        <div
                            key={spider.id}
                            onClick={() => setSelectedSpider(spider)}
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className={`bg-gradient-to-br ${spider.bgColor} rounded-xl overflow-hidden shadow-lg h-full flex flex-col`}>
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={spider.image}
                                        alt={spider.name}
                                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
                                </div>
                                <div className="p-4 flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-1">{spider.name}</h3>
                                    <p className="text-gray-200 text-sm mb-2">{spider.alterEgo}</p>
                                    <p className="text-gray-300 text-xs line-clamp-2">{spider.description}</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <button className="w-full py-2 bg-white bg-opacity-20 rounded-lg text-white font-semibold hover:bg-opacity-30 transition-all duration-200">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal spider={selectedSpider} onClose={() => setSelectedSpider(null)} />

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default SpidermanCards;