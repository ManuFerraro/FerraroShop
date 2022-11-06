interface SeedCatalogueProduct {
    image: string;
    title: string;
}

interface SeedDataCatalogue{
    catalogue: SeedCatalogueProduct[]
}

export const indexProducts: SeedDataCatalogue = {
    catalogue: [
        {
            image: 'make-up.jpg',
            title: 'MAKE UP'
        },
        {
            image: 'Bags.jpg',
            title: 'SMALL LEATHER GOODS'
        },
        {
            image: 'women-silk.jpg',
            title: 'WOMEN SILK'
        },
        {
            image: 'fashion-jewelry.jpg',
            title: 'FASHION JEWELRY'
        },
        {
            image: 'decorative-objects.jpg',
            title: 'DECORATIVE OBJECTS'
        },
        {
            image: 'watches.jpg',
            title: 'WATCHES'
        },
        {
            image: 'ties.jpg',
            title: 'TIES'
        },
        {
            image: 'shoes.jpg',
            title: 'SHOES'
        },

    ]
}