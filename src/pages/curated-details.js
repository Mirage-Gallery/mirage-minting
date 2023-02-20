import React from "react";

const CuratedDetails = () => {
    const jsonData = {
        projects: [
          {
            projectId: 1,
            name: "Otherwhere",
            artist: "Somnai",
            description: "A visual compendium of the Shrines and Monuments discovered in the latent voyages through the Otherwhere and its many biomes",
            website: "https://somnai.io",
            license: "",
            artistAddress: "0x0237765EB2C196BB1A8FCa4F0417A7c05a62682C",
            secondaryArtistAddress: ""
        },
          {
            projectId: 2,
            name: "ANIMA",
            artist: "Roope Rainisto",
            description: "ANIMA. The soul, the animating principle, the air of life. The fractals in us all. From microscopic visions to immense natural vistas, a journey into the repeating visual patterns that connect all living things together, that separate the living from the dead. 500 unique pieces, each AI-generated, each edited by hand.",
            website: "https://linktr.ee/rainisto",
            license: "",
            artistAddress: "0x24C3833219AB8128644F37cbb51546cdfbCE6c02",
            secondaryArtistAddress: ""
        },
          {
            projectId: 3,
            name: "Remnants",
            artist: "Austiin",
            description: "What is left behind, in memory and in destruction, says a lot about what was there to begin with. ‘Remnants’ explores the traces of the world before it. As well the traces we will leave behind. A study in temporary duality.",
            website: "",
            license: "CC0",
            artistAddress: "0x0Fd5d61BFC11C48B0FEC6387f7745014Aeb7D3AE",
            secondaryArtistAddress: ""
        },
          {
            projectId: 4,
            name: "Voyage",
            artist: "Revrart",
            description: "VOYAGE. A journey through time and space. Fragments of what has been and what will become.",
            website: "https://linktr.ee/revrart",
            license: "",
            artistAddress: "0xa21f3597B3A6C4E1fF6E0Fc3FAf3FAd0B0634100",
            secondaryArtistAddress: ""
        },
          {
            projectId: 5,
            name: "Embracing Chaos",
            artist: "Saucebook",
            description: "As AI-assisted artists we can either attempt to control our outcomes, with ever more complex text prompts, seed images, depth maps, weights and masks, or we can cede more latitude to our AI collaborator, opening the door to unexpected surprises and delights. The theme of this collection is Embracing the Chaos of the AI-Human partnership, creating detailed and beautiful visions within the realms of Earth, Water and Spirit, using the bare minimum of pre-ordained parameters.",
            website: "https://linktr.ee/saucebook",
            license: "",
            artistAddress: "0x2CE48F39C5440BF2216ecd04663C563caE49CcAc",
            secondaryArtistAddress: ""
        },
          {
            projectId: 6,
            name: "Yūgen",
            artist: "Rikkar",
            description: "Take a journey around the globe through this collection of AI generated and fine art inspired creations. Let the AI be your travel guide to lands far and near, a virtual tour guide to the beauty our world has to offer. Embrace the concept of Yūgen; a deep and mysterious sense of the beauty of the universe.",
            website: "https://twitter.com/socalpathy",
            license: "",
            artistAddress: "0x7e7475980e970090B9C228fE66d8635AFd0e5e74",
            secondaryArtistAddress: ""
        },
          {
            projectId: 7,
            name: "Seek",
            artist: "Huemin",
            description: "This collection of works is inspired by Hasui Kawase's woodblock prints and geometric abstraction. Elegant landscapes deconvolve into a plethora of geometric elements. Pattern, line, and shape emerge while maintaining and conveying a nod to Hasui's original artwork.",
            website: "https://huemin-art.github.io/",
            license: "",
            artistAddress: "0x7c4A53E6e287A097B27f8aCA6786e556223c7b32",
            secondaryArtistAddress: ""
        },
          {
            projectId: 8,
            name: "MOODs",
            artist: "Inner_Sanctum & Pancakes",
            description: "These awe-inspiring scenes will draw you in and make you forget about your worldly issues.\nAs you get sucked in by the intricate details you find yourself transported to the locale, living it, feeling it, exploring it, meditating in it, and dreaming about what could be beyond the frame.\n\nFeel the MOOD, become the MOOD.",
            website: "",
            license: "CC0",
            artistAddress: "0x4d9Fd61E5324862762E456990aF0316386f5EC1E",
            secondaryArtistAddress: "0x609521C742dB167329b09CE2025f095f106aaB4D"
        },
          {
            projectId: 9,
            name: "Nexus",
            artist: "H01 & DeltaSauce",
            description: "“Nexus” is a collection of artworks that explores the idea of doorways or portals connecting different realms. Whether it is a doorway to another dimension, a parallel universe, or simply a different state of mind, “Nexus” represents a passage to something new and unknown. It is a symbol of hope and possibility, offering a glimpse into a world beyond our own. This collection of artworks invites viewers to step through the nexus doorway and explore the possibilities that lie beyond.",
            website: "",
            license: "CC0",
            artistAddress: "0x65A92e44d58Ed6e4049e157f1D99beE98bF595F7",
            secondaryArtistAddress: "0x5fC13C5A541041f8fa12fab492D064435eB8d2F5"
        },
          {
            projectId: 10,
            name: "Page",
            artist: "Claire Silver",
            description: "AI Art is Not Art is a collection of 500 pieces of AI-Collaborative art by Claire Silver. Each piece combines multiple art movements into a unique aesthetic. Following the same conceptual thread, it was created using a mixture of accessible AI tools: Artbreeder, Prosepainter, Collage by Studio Morphogen, Midjourney, Diffusion, StabilityAI, and Dalle2, as well as handpainting and digitally collaging where needed for cohesion.\n\nAI-Collaborative art is a budding movement, faced with the same criticisms most new art movements experience--namely, that it isn't art at all, requires no effort or skill, and has no artistic or concrete value. This collection challenges that idea by building on breadth of art history in ways that could only happen with the collaboration of AI, taking care to include art movements that were dismissed initially by the broader art world, and by using a combination of only accessible, no-code tools to create the work. Each work is a single page in a new, transformative chapter in the book of Art History.\n\nTaste is the new skill.",
            website: "https://www.clairesilver.com/",
            license: "",
            artistAddress: "0x9aAdDc5040D2093dC0dafC0803CbfcA822341BCa",
            secondaryArtistAddress: ""
        },
          {
            projectId: 11,
            name: "Esquisse",
            artist: "MrHabMo",
            description: "Abstract (ART)chitecture explores the history of architecture through its major styles. From antiquity to the present day and well beyond...",
            website: "https://twitter.com/MrHabMo",
            license: "CC0",
            artistAddress: "0xAe02C419Cfc16D73feD0d5cAf852d27AAB37658C",
            secondaryArtistAddress: ""
        },
          {
            projectId: 12,
            name: "Noah's Ark",
            artist: "KaptN",
            description: "Noah's Ark is a collection of AI-generated collages deriving inspiration from a story dating all the way back to ancient Mesopotamia. Technically it is an attempt to reimagine and recreate a classical method but refreshing and REINVENTING it using the latest tools in our visual art creation arsenal. Noah's Ark and the story of the great deluge is a metaphor that I have chosen to depict the controversy and challenges I (and a handful of other early adopters) have been facing since I adopted machine learning tools to create my works some years ago. Much like building a colossal ship amidst inland, far from the sea, it was grotesque, meaningless, and futile at first… Many choose to ignore or make fun of it. Until the Deluge became obvious that is… Now people are flocking in hopes to take a place at the ark!",
            website: "https://twitter.com/Legendsartcoll1",
            license: "CC0",
            artistAddress: "0x58B10397d3A30342f29756e2a28e0c1ab22a8223",
            secondaryArtistAddress: ""
        },
          {
            projectId: 13,
            name: "Memory",
            artist: "Ren AI",
            description: "As we grow old so do all the memories we made in the past years. Places, sensations and situations laying beneath a thin layer of dust. They are not forgotten but merely lost, ready to resurface when we least expect it. A particular light or a smell, anything can trigger it. Lost Memories is a collection to remember the experiences that shaped our life and to long for new ones.",
            website: "https://twitter.com/RenAI_NFT",
            license: "CC0",
            artistAddress: "0x1388aE7b87bdF98369D28C747642049D0078055D",
            secondaryArtistAddress: ""
        },
          {
            projectId: 14,
            name: "The World Outside",
            artist: "Thomas Intuitive Art",
            description: "Do not close yourself in monotony, your own bubble, the comfort zone. Go outside and make the world yours!",
            website: "https://twitter.com/thomaaas_crypto",
            license: "RF",
            artistAddress: "0x4fab00E016c28B8Cab90cb45Dc1A52B21f909ab0",
            secondaryArtistAddress: ""
        },
          {
            projectId: 15,
            name: "Oneiroscape",
            artist: "Maneki Neko",
            description: "The Oneiroscapes collection explores the realm of dreams through a collaboration between an artist and an AI. Transcribed for your viewing, these dreamscapes capture the surreal and ever-shifting nature of our subconscious mind. Imagine a dream where reality appears familiar, yet, upon closer inspection, the details become increasingly nonsensical: the writing on a sign, the face of a companion, all seemingly taking on new and strange forms. These dreams can be most accurately shared through imagery, and working with AI provides the perfect medium to capture and interpret them. Describing a dream is akin to exploring latent space with AI, where every possible scene exists if the right sequence of words is combined to conjure it. The human form may be distorted, fingers may be too many, and faces may be unlike any you've seen before. But that is what makes the experience all the more satisfying, as both the artist and the viewer participate in the creation of this art by giving each symbol a meaning and label, even if it doesn't make sense in the waking world.",
            website: "http://manekineko.art/",
            license: "Extended Editorial",
            artistAddress: "0xB64c53Fe28949054dFa164Fd6dc302B94f699755",
            secondaryArtistAddress: ""
          },
        {
            projectId: 16,
            name: "Synthbeat",
            artist: "Haze Long",
            description: "'Synthetic Heartbeats' is an assisted AI collection that explores the interplay between textures and emotions. Through fluid brushstrokes and synths, each portrait comes to life, pulsing with its own unique heartbeat. The collection blends trad-digital art techniques with AI technology to create a mesmerizing experience that captures the essence of the human experience. With bold use of color, the portraits are a celebration of the beauty and complexity of human emotion, and each canvas is a window into the soul. The fluidity of the paint, combined with the intricate textures, creates a captivating visual experience that invites viewers to get lost in the details, and to experience the bravura of brush strokes to evoke deep and powerful emotions.",
            website: "http://hazelong.com",
            license: "CC BY-NC-SA",
            artistAddress: "0x06cc86506E45941dEFCf9b8339EB6C55D038464B",
            secondaryArtistAddress: ""
          },
        {
            projectId: 17,
            name: "SINEMA",
            artist: "KOI",
            description: "Inspired by films. Using AI to create photography and cinematography inspired by films. To showcase the limitless capabilities and range of AI art creation tools in creating multi-disciplinary and multi-genre works. AI art generation is a tool of expressing passion in the form of art, to create and make exist things that you love.  ",
            website: "",
            license: "CC0",
            artistAddress: "0xddbda06060a0ab937eea233394540dbdd60aed09",
            secondaryArtistAddress: ""
          }
        ]}
    return (
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        );
};

export default CuratedDetails;