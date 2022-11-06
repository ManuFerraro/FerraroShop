import bcrypt from 'bcryptjs';



interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}


interface SeedUser {
    name:     string;
    email:    string;
    password: string;
    role:    'admin' | 'client'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats' | 'sweater' | 'dress' | 'jacket' | 'coat';

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}










export const initialData: SeedData = {
    users: [
        {
            name: 'Manuel Ferraro',
            email: 'manuel@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Sharon Pietri',
            email: 'sharonpietri@google.com',
            password: bcrypt.hashSync('1234567'),
            role: 'client'
        },
    ],
    products: [
        {
            description: " Long-sleeve twillaine sweater in cashmere and silk with Harnais de Cour Bandana printed silk twill (100% silk, knit: 50% cashmere, 50% silk",
            images: [
                'harnais de cour bandana-1.jpg',
                'harnais de cour bandana-2.jpg',
                'harnais de cour bandana-3.jpg',
                'harnais de cour bandana-4.jpg',
            ],
            inStock: 7,
            price: 2500,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_crew_neck_sweater_chilling",
            type: 'sweater',
            tags: ['sweater'],
            title: "Harnais de cour bandana",
            gender: 'women'
        },
        {
            description: " High-waisted straight leg pants in denim (100% cotton)",
            images: [
                'pocket-pants1.jpg',
                'pocket-pants2.jpg',
                'pocket-pants3.jpg',
                'pocket-pants4.jpg',
            ],
            inStock: 12,
            price: 1650,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_pants",
            type: 'pants',
            tags: ['pants'],
            title: "Pocket pants",
            gender: 'women'
        },
        {
            description: "Shirt in cotton twill (100% cotton)",
            images: [
                'shirt-paris1.jpg',
                'shirt-paris2.jpg',
                'shirt-paris3.jpg',
                'shirt-paris4.jpg',
            ],
            inStock: 12,
            price: 1450,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_chill_neck_shirt",
            type: 'shirts',
            tags: ['shirts'],
            title: "Paris shirt",
            gender: 'women'
        },
        {
            description: "Belted long-sleeve dress in cotton twill (100% cotton)",
            images: [
                'sleeve-dress1.jpg',
                'sleeve-dress2.jpg',
                'sleeve-dress3.jpg',
                'sleeve-dress4.jpg',
            ],
            inStock: 23,
            price: 1840,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_dress",
            type: 'dress',
            tags: ['dress'],
            title: "Belted long-sleeve dress",
            gender: 'women'
        },
        {
            description: "Cropped pants in Loungewear Voyage wool knit (100% virgin wool)",
            images: [
                'cropped-pants1.jpg',
                'cropped-pants2.jpg',
                'cropped-pants3.jpg',
                'cropped-pants4.jpg',
            ],
            inStock: 16,
            price: 1250,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_pants_great",
            type: 'pants',
            tags: ['pants'],
            title: "Cropped pants",
            gender: 'women'
        },
        {
            description: "Zipped jacket in jacquard knit with bicolor Mosaique motif (60% virgin wool, 40% polypropylene)",
            images: [
                'mosaique-jacket1.jpg',
                'mosaique-jacket2.jpg',
                'mosaique-jacket3.jpg',
                'mosaique-jacket4.jpg',
            ],
            inStock: 10,
            price: 2250,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_jacket_cool",
            type: 'jacket',
            tags: ['jacket'],
            title: "Mosaique jacket",
            gender: 'women'
        },
        {
            description: "Safari jacket in water-repellent jacquard cotton with Mosaique motif (100% cotton)",
            images: [
                'safari-jacket2.jpg',
                'safari-jacket1.jpg',
                'safari-jacket3.jpg',
                'safari-jacket4.jpg',
            ],
            inStock: 6,
            price: 4650,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_jacket_beautiful",
            type: 'jacket',
            tags: ['jacket'],
            title: "Mosaique safari jacket",
            gender: 'women'
        },
        {
            description: "Leggings in jacquard knit with bicolor Mosaique motif (54% virgin wool, 41% polypropylene, 4% polyamide, 1% elastane)",
            images: [
                'mosaique-pants1.jpg',
                'mosaique-pants2.jpg',
                'mosaique-pants3.jpg',
                'mosaique-pants4.jpg',
            ],
            inStock: 0,
            price: 1280,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_pants_beautiful",
            type: 'pants',
            tags: ['pants'],
            title: "Mosaique leggings pants",
            gender: 'women'
        },
        {
            description: "Wrap coat in double-sided cashmere (100% cashmere)",
            images: [
                'wrap-coat1.jpg',
                'wrap-coat2.jpg',
                'wrap-coat3.jpg',
                'wrap-coat4.jpg',
            ],
            inStock: 4,
            price: 7850,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "women_sleeve_neck_coat_cool",
            type: 'coat',
            tags: ['coat'],
            title: "Wrap coat",
            gender: 'women'
        },
        {
            description: "Auto coat in diagonal wool mouline (100% virgin wool)",
            images: [
                'auto-coat1.jpg',
                'auto-coat2.jpg',
                'auto-coat3.jpg',
                'auto-coat4.jpg',
            ],
            inStock: 15,
            price: 5050,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_coat_beautiful",
            type: 'coat',
            tags: ['coat'],
            title: "Wrap coat",
            gender: 'men'
        },
        {
            description: "Zipped hooded jacket in water-repellent technical crisp fabric (100% polyamide)",
            images: [
                'hooded-jacket1.jpg',
                'hooded-jacket2.jpg',
                'hooded-jacket3.jpg',
                'hooded-jacket4.jpg',
            ],
            inStock: 25,
            price: 18400,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_jacket_nice",
            type: 'jacket',
            tags: ['jacket'],
            title: "Hooded jacket with removable lining",
            gender: 'men'
        },
        {
            description: "Long-sleeve crewneck sweater in wool and cashmere with Fair Isle 2.0 detail (70% virgin wool and 30% cashmere)",
            images: [
                'crewneck-sweater1.jpg',
                'crewneck-sweater2.jpg',
                'crewneck-sweater3.jpg',
                'crewneck-sweater4.jpg',
            ],
            inStock: 32,
            price: 1700,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_sweater_genius",
            type: 'sweater',
            tags: ['sweater'],
            title: "Crewneck sweater",
            gender: 'men'
        },
        {
            description: "Zipped bomber jacket in curly lambskin (100% lambskin)",
            images: [
                'bomber-jacket1.jpg',
                'bomber-jacket2.jpg',
                'bomber-jacket3.jpg',
                'bomber-jacket4.jpg',
            ],
            inStock: 2,
            price: 22700,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_jacket_peace",
            type: 'jacket',
            tags: ['jacket'],
            title: "Bomber jacket with removable hood",
            gender: 'men'
        },
        {
            description: "Long-sleeve crewneck sweater in wool and cashmere with Fair Isle 2.0 detail (70% virgin wool and 30% cashmere)",
            images: [
                'turtleneck-sweater1.jpg',
                'turtleneck-sweater2.jpg',
                'turtleneck-sweater3.jpg',
                'turtleneck-sweater4.jpg',
            ],
            inStock: 23,
            price: 2340,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_sweater_good",
            type: 'sweater',
            tags: ['sweater'],
            title: "Turtleneck sweater",
            gender: 'men'
        },
        {
            description: "Short-sleeve crewneck t-shirt in cotton (100% cotton)",
            images: [
                'sellier-shirt1.jpg',
                'sellier-shirt2.jpg',
                'sellier-shirt3.jpg',
                'sellier-shirt4.jpg',
            ],
            inStock: 23,
            price: 530,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_shirt_great",
            type: 'shirts',
            tags: ['shirts'],
            title: "Oiqures sellier polo shirt",
            gender: 'men'
        },
        {
            description: "Short-sleeve crewneck t-shirt in cotton (100% cotton)",
            images: [
                'super-polo1.jpg',
                'super-polo2.jpg',
                'super-polo3.jpg',
                'super-polo4.jpg',
            ],
            inStock: 23,
            price: 750,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_shirt_guess",
            type: 'shirts',
            tags: ['shirts'],
            title: "Sprint times polo shirt",
            gender: 'men'
        },
        {
            description: "Short-sleeve crewneck t-shirt in cotton (100% cotton)",
            images: [
                'piqures-shirt1.jpg',
                'piqures-shirt2.jpg',
                'piqures-shirt3.jpg',
                'piqures-shirt4.jpg',
            ],
            inStock: 4,
            price: 470,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_shirt_chill",
            type: 'shirts',
            tags: ['shirts'],
            title: "Piqures sellier t-shirt",
            gender: 'men'
        },
        {
            description: "Short-sleeve crewneck t-shirt in cotton (100% cotton)",
            images: [
                'profile-sweater1.jpg',
                'profile-sweater2.jpg',
                'profile-sweater3.jpg',
                'profile-sweater4.jpg',
            ],
            inStock: 4,
            price: 470,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "men_sleeve_neck_sweater_beautiful",
            type: 'sweater',
            tags: ['sweater'],
            title: "Profile turtleneck sweater",
            gender: 'men'
        },
    ]
}

