let Persons = [
    {
        id: 1,
    name: {firstName:'Musa', lastName:'Israilov'}, 
    email: 'm.israilov24@gmail.com', 
    Boeken: [
        {
            boekID:1, 
        name: 'Game Of Thrones', 
        desc:'wolves',
        
        },
        {
        boekID:5, 
        name: 'Gang', 
        desc:'gangster',
        progress:123
        },

    ]},
    {
        id: 2,
        name: {firstName:'Noah', lastName:'Wallecan'}, 
        email: 'n.Wallecan24@gmail.com', 
        Boeken: [
            {
                boekID:2, 
          name: 'A Storm of Swords', 
            desc:'wolves',
            progress:200
            },
        ]},
        {
            id: 3,
            name: {firstName:'Noob', lastName:'Speler'}, 
            email: 'Noob.Speler24@gmail.com', 
            Boeken: [
                {
                    boekID:3, 
                name: 'Dune', 
                desc:'sand',
                progress:0
                },
            ]}

];

let Books = [
    {
        boekID:3, 
    name: 'Dune', 
    desc:'sand',
    progress:0
    },
    {
        boekID:2, 
    name: 'A Storm of Swords', 
    desc:'wolves',
progress:200
    },
    {
        boekID:1, 
    name: 'Game Of Thrones', 
    desc:'wolves',
    progress:876
    },
    {
        boekID:5, 
    name: 'Gang', 
    desc:'gangster',
    progress:1234
    }


]

let bookcollection = [

    //bookCollection van een persoon, 1 persoon is owner hiervan, maar mensen kunnen deze toevoegen aan hun collectie maar niet wijzigen
    {
        id: 1,
        name: 'FantasyBooks',
        fk_user_id: 1
    },

    {
        id: 2,
        name: 'SciFiBooks',
        fk_user_id: 2
    },
]
let bookcollectionlinktable = [
//bookCollectionLinkTable: verbindt een boek uit toekomstige BoekAPI met persoonlijkeLinktable

    {
        bookcollection_id: 1, //collection waarbij het toebehoort
        book_id: 1, //boek die uit een api gaat komen
        progress: 15, //pagina waar persoon zit
        review: 4, // review van persoon
        isFavorite: true, //review van de persoon
        },

    {
        bookcollection_id: 1,
         book_id: 5,
         progress:200,
         review: 4,
         isFavorite: true,

        },

    {bookcollection_id: 2, book_id: 2},

]
module.exports = { Persons, Books };