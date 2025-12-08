const Product = require("./models/productModel");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload a single image to Cloudinary
const uploadImage = (filePath) => {
    return cloudinary.uploader.upload(filePath)
        .then(result => result.secure_url)
        .catch(error => {
            throw new Error(`Failed to upload image: ${error.message}`);
        });
};

// Upload all images from a folder to Cloudinary
const uploadImagesFromFolder = async (folderPath) => {
    try {
        const imageFiles = fs.readdirSync(folderPath);
        const imageUrls = await Promise.all(imageFiles.map(file => {
            const filePath = path.join(folderPath, file);
            return uploadImage(filePath);
        }));
        return imageUrls;
    } catch (error) {
        throw new Error(`Failed to upload images from folder: ${error.message}`);
    }
};


async function seedDatabase() {
    const Product = require("./models/productModel")

    try {
        const baseFolderPath = path.join(__dirname, "assets")
        const airpodesFolderPath = path.join(baseFolderPath, "airpodes")
        const camerasFolderPath = path.join(baseFolderPath, "cameras")
        const earphonesFolderPath = path.join(baseFolderPath, "earphones")
        const mobilesFolderPath = path.join(baseFolderPath, "mobiles")
        const mousesFolderPath = path.join(baseFolderPath, "mouses")
        const printersFolderPath = path.join(baseFolderPath, "printers")
        const processorsFolderPath = path.join(baseFolderPath, "processors")
        const refrigeratorsFolderPath = path.join(baseFolderPath, "refrigerators")
        const speakersFolderPath = path.join(baseFolderPath, "speakers")
        const trimmersFolderPath = path.join(baseFolderPath, "trimmers")
        const tvFolderPath = path.join(baseFolderPath, "tv")
        const watchesFolderPath = path.join(baseFolderPath, "watches")

        const airpodesImages = await uploadImagesFromFolder(airpodesFolderPath)
        const camerasImages = await uploadImagesFromFolder(camerasFolderPath)
        const earphonesImages = await uploadImagesFromFolder(earphonesFolderPath)
        const mousesImages = await uploadImagesFromFolder(mousesFolderPath)
        const printersImages = await uploadImagesFromFolder(printersFolderPath)
        const processorsImages = await uploadImagesFromFolder(processorsFolderPath)
        const mobilesImages = await uploadImagesFromFolder(mobilesFolderPath)
        const refrigeratorsImages = await uploadImagesFromFolder(refrigeratorsFolderPath)
        const speakersImages = await uploadImagesFromFolder(speakersFolderPath)
        const trimmersImages = await uploadImagesFromFolder(trimmersFolderPath)
        const tvImages = await uploadImagesFromFolder(tvFolderPath)
        const watchesImages = await uploadImagesFromFolder(watchesFolderPath)

        const getRandomImages = (images, count) => {
            const shuffled = images.sort(() => 0.5 - Math.random())
            return shuffled.slice(0, count)
        }

        const airpodes = [
            {
                productName: "Apple AirPods Pro",
                brandName: "Apple",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 249,
                sellingPrice: 199
            },
            {
                productName: "Samsung Galaxy Buds Pro",
                brandName: "Samsung",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 199,
                sellingPrice: 149
            },
            {
                productName: "Sony WF-1000XM4",
                brandName: "Sony",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 279,
                sellingPrice: 229
            },
            {
                productName: "Sennheiser Momentum True Wireless 2",
                brandName: "Sennheiser",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 299,
                sellingPrice: 249
            },
            {
                productName: "1More True Wireless ANC",
                brandName: "1More",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Bang & Olufsen Beoplay E8",
                brandName: "Bang & Olufsen",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 350,
                sellingPrice: 300
            },
            {
                productName: "Shure AONIC 215",
                brandName: "Shure",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 229,
                sellingPrice: 199
            },
            {
                productName: "SoundPEATS TrueAir2",
                brandName: "SoundPEATS",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 49,
                sellingPrice: 39
            },
            {
                productName: "Audio-Technica ATH-CKS5TW",
                brandName: "Audio-Technica",
                category: "airpode",
                productImage: getRandomImages(airpodesImages, 4),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                price: 149,
                sellingPrice: 129
            }
        ]

        const cameras = [
                {
                productName: "Canon EOS R5",
                brandName: "Canon",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "High resolution mirrorless camera with 45 megapixel full-frame CMOS sensor.",
                price: 3899,
                sellingPrice: 3499
            },
            {
                productName: "Nikon Z6 II",
                brandName: "Nikon",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Versatile mirrorless camera with 24.5MP sensor and 4K UHD video recording.",
                price: 1999,
                sellingPrice: 1799
            },
            {
                productName: "Sony Alpha 7C",
                brandName: "Sony",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Compact full-frame mirrorless camera with 24.2MP sensor.",
                price: 1799,
                sellingPrice: 1599
            },
            {
                productName: "Fujifilm X-T4",
                brandName: "Fujifilm",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "APS-C mirrorless camera with in-body stabilization and advanced autofocus.",
                price: 1699,
                sellingPrice: 1499
            },
            {
                productName: "Panasonic Lumix GH5",
                brandName: "Panasonic",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Micro Four Thirds mirrorless camera with 4K 60p video recording.",
                price: 1499,
                sellingPrice: 1299
            },
            {
                productName: "Olympus OM-D E-M1 Mark III",
                brandName: "Olympus",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "High-speed Micro Four Thirds camera with in-body image stabilization.",
                price: 1799,
                sellingPrice: 1599
            },
            {
                productName: "Leica Q2",
                brandName: "Leica",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Full-frame compact camera with a fixed 28mm lens and 47.3MP sensor.",
                price: 4995,
                sellingPrice: 4795
            },
            {
                productName: "Canon EOS M50 Mark II",
                brandName: "Canon",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Compact mirrorless camera with 24.1MP APS-C sensor and 4K video.",
                price: 699,
                sellingPrice: 649
            },
            {
                productName: "Nikon D780",
                brandName: "Nikon",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Full-frame DSLR with 24.5MP sensor and 4K UHD video.",
                price: 2299,
                sellingPrice: 2099
            },
            {
                productName: "Sony Cyber-shot RX100 VII",
                brandName: "Sony",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "High-performance compact camera with 1-inch sensor and 24-200mm zoom lens.",
                price: 1299,
                sellingPrice: 1199
            },
            {
                productName: "Fujifilm X100V",
                brandName: "Fujifilm",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Premium compact camera with APS-C sensor and 23mm f/2 lens.",
                price: 1399,
                sellingPrice: 1299
            },
            {
                productName: "Panasonic Lumix S5",
                brandName: "Panasonic",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Full-frame mirrorless camera with 24.2MP sensor and 4K 60p video.",
                price: 1999,
                sellingPrice: 1799
            },
            {
                productName: "Olympus PEN-F",
                brandName: "Olympus",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Stylish Micro Four Thirds camera with a 20MP sensor and in-body stabilization.",
                price: 1199,
                sellingPrice: 1099
            },
            {
                productName: "Leica SL2",
                brandName: "Leica",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Professional full-frame mirrorless camera with 47.3MP sensor and 5K video.",
                price: 5995,
                sellingPrice: 5795
            },
            {
                productName: "Canon PowerShot G7 X Mark III",
                brandName: "Canon",
                category: "camera",
                productImage: getRandomImages(camerasImages, 4),
                description: "Compact vlogging camera with 1-inch sensor and 4K video capabilities.",
                price: 749,
                sellingPrice: 699
            },
        ]

        const earphones = [
                {
                productName: "Sony WF-1000XM3",
                brandName: "Sony",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Noise-canceling wireless earphones with high-fidelity sound.",
                price: 229,
                sellingPrice: 199
            },
            {
                productName: "Bose QuietComfort Earbuds",
                brandName: "Bose",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "True wireless noise-canceling earphones with premium sound quality.",
                price: 279,
                sellingPrice: 249
            },
            {
                productName: "Apple AirPods Pro",
                brandName: "Apple",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Noise-canceling wireless earbuds with adaptive EQ.",
                price: 249,
                sellingPrice: 219
            },
            {
                productName: "Sennheiser Momentum True Wireless 2",
                brandName: "Sennheiser",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "High-fidelity wireless earbuds with active noise cancellation.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "Jabra Elite 85t",
                brandName: "Jabra",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Advanced noise-canceling wireless earbuds with customizable sound.",
                price: 229,
                sellingPrice: 199
            },
            {
                productName: "Google Pixel Buds A-Series",
                brandName: "Google",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Affordable wireless earbuds with Google Assistant integration.",
                price: 99,
                sellingPrice: 79
            },
            {
                productName: "Anker Soundcore Liberty Air 2 Pro",
                brandName: "Anker",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Wireless earbuds with personalized active noise cancellation.",
                price: 129,
                sellingPrice: 109
            },
            {
                productName: "Samsung Galaxy Buds Pro",
                brandName: "Samsung",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Premium wireless earbuds with intelligent active noise control.",
                price: 199,
                sellingPrice: 169
            },
            {
                productName: "OnePlus Buds Pro",
                brandName: "OnePlus",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Smart adaptive noise cancellation with Warp Charge technology.",
                price: 149,
                sellingPrice: 129
            },
            {
                productName: "Beats Powerbeats Pro",
                brandName: "Beats",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "High-performance wireless earphones with secure-fit ear hooks.",
                price: 249,
                sellingPrice: 219
            },
            {
                productName: "Jaybird Vista 2",
                brandName: "Jaybird",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Sport wireless earbuds with active noise cancellation.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Sony WF-SP800N",
                brandName: "Sony",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Waterproof true wireless sports earbuds with noise cancellation.",
                price: 179,
                sellingPrice: 159
            },
            {
                productName: "JLab Epic Air Sport ANC",
                brandName: "JLab",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Active noise-canceling true wireless earbuds for sports.",
                price: 99,
                sellingPrice: 79
            },
            {
                productName: "Bose Sport Earbuds",
                brandName: "Bose",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "Wireless earbuds designed for exercise with secure and comfortable fit.",
                price: 179,
                sellingPrice: 159
            },
            {
                productName: "Sennheiser CX 400BT",
                brandName: "Sennheiser",
                category: "earphone",
                productImage: getRandomImages(earphonesImages, 4),
                description: "True wireless earbuds with customizable controls and superior sound.",
                price: 199,
                sellingPrice: 179
            },
        ]

        const mouses = [
            {
                productName: "Logitech MX Master 3",
                brandName: "Logitech",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Advanced wireless mouse with ultra-fast scrolling and ergonomic design.",
                price: 99,
                sellingPrice: 89
            },
            {
                productName: "Razer DeathAdder V2",
                brandName: "Razer",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "High-precision optical gaming mouse with ergonomic form factor.",
                price: 69,
                sellingPrice: 59
            },
            {
                productName: "Apple Magic Mouse 2",
                brandName: "Apple",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Wireless and rechargeable mouse with a sleek, low-profile design.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "Microsoft Arc Mouse",
                brandName: "Microsoft",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Innovative mouse that snaps flat and fits easily in your bag.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "SteelSeries Rival 600",
                brandName: "SteelSeries",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Dual sensor system for true 1-to-1 tracking and lift-off distance detection.",
                price: 89,
                sellingPrice: 79
            },
            {
                productName: "Corsair Dark Core RGB/SE",
                brandName: "Corsair",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Wireless gaming mouse with customizable RGB lighting and comfortable grip.",
                price: 99,
                sellingPrice: 89
            },
            {
                productName: "HP Omen Photon",
                brandName: "HP",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Wireless gaming mouse with Qi wireless charging and customizable buttons.",
                price: 129,
                sellingPrice: 119
            },
            {
                productName: "Logitech G502 Hero",
                brandName: "Logitech",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "High-performance gaming mouse with HERO 25K sensor and customizable weight.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "Roccat Kain 202 AIMO",
                brandName: "Roccat",
                category: "mouse",
                productImage: getRandomImages(mousesImages, 4),
                description: "Wireless gaming mouse with Titan Click buttons and RGB illumination.",
                price: 99,
                sellingPrice: 89
            },
        ]

        const printers = [
            {
                productName: "HP OfficeJet Pro 9015",
                brandName: "HP",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "All-in-one wireless printer with smart tasks and dual-band Wi-Fi.",
                price: 229,
                sellingPrice: 199
            },
            {
                productName: "Canon PIXMA TR4520",
                brandName: "Canon",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Wireless all-in-one photo printer with mobile printing capabilities.",
                price: 99,
                sellingPrice: 89
            },
            {
                productName: "Epson EcoTank ET-4760",
                brandName: "Epson",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "All-in-one supertank printer with high-capacity ink tanks and auto document feeder.",
                price: 499,
                sellingPrice: 449
            },
            {
                productName: "Brother MFC-J995DW",
                brandName: "Brother",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Inkvestment all-in-one inkjet printer with wireless printing and NFC.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Samsung Xpress M2020W",
                brandName: "Samsung",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Wireless monochrome laser printer with easy mobile printing.",
                price: 99,
                sellingPrice: 89
            },
            {
                productName: "HP Envy 6055",
                brandName: "HP",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "All-in-one printer with wireless printing and scanning for home use.",
                price: 129,
                sellingPrice: 109
            },
            {
                productName: "Canon imageCLASS MF644Cdw",
                brandName: "Canon",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Wireless, multifunction color laser printer with duplex printing.",
                price: 399,
                sellingPrice: 359
            },
            {
                productName: "Epson WorkForce WF-7210",
                brandName: "Epson",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Wireless wide-format color inkjet printer with print-shop quality.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Brother HL-L2350DW",
                brandName: "Brother",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Compact monochrome laser printer with wireless printing and duplex.",
                price: 119,
                sellingPrice: 99
            },
            {
                productName: "Samsung ProXpress M3870FW",
                brandName: "Samsung",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "High-speed multifunction laser printer with NFC and Wi-Fi.",
                price: 299,
                sellingPrice: 269
            },
            {
                productName: "HP LaserJet Pro M404dn",
                brandName: "HP",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Reliable monochrome laser printer with fast printing and security features.",
                price: 249,
                sellingPrice: 229
            },
            {
                productName: "Canon SELPHY CP1300",
                brandName: "Canon",
                category: "printer",
                productImage: getRandomImages(printersImages, 4),
                description: "Compact photo printer with wireless printing and dye-sublimation technology.",
                price: 129,
                sellingPrice: 119
            },
        ]

        const mobiles = [
            {
                productName: "iPhone 12 Pro Max",
                brandName: "Apple",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Flagship smartphone with A14 Bionic chip and Pro camera system.",
                price: 1099,
                sellingPrice: 999
            },
            {
                productName: "Samsung Galaxy S21 Ultra",
                brandName: "Samsung",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "High-end smartphone with 108MP camera and 120Hz AMOLED display.",
                price: 1199,
                sellingPrice: 1099
            },
            {
                productName: "Google Pixel 5",
                brandName: "Google",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Google's flagship phone with exceptional camera and 5G capability.",
                price: 699,
                sellingPrice: 649
            },
            {
                productName: "OnePlus 9 Pro",
                brandName: "OnePlus",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "High-performance smartphone with Hasselblad camera and 120Hz display.",
                price: 1069,
                sellingPrice: 969
            },
            {
                productName: "Xiaomi Mi 11 Ultra",
                brandName: "Xiaomi",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Flagship smartphone with 120x zoom camera and 67W fast charging.",
                price: 1299,
                sellingPrice: 1199
            },
            {
                productName: "Sony Xperia 1 III",
                brandName: "Sony",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Smartphone with 4K HDR OLED display and professional-grade camera.",
                price: 1299,
                sellingPrice: 1199
            },
            {
                productName: "Oppo Find X3 Pro",
                brandName: "Oppo",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Innovative smartphone with 10-bit color display and advanced camera.",
                price: 1099,
                sellingPrice: 999
            },
            {
                productName: "Huawei P40 Pro",
                brandName: "Huawei",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Smartphone with Leica quad camera and exceptional night photography.",
                price: 899,
                sellingPrice: 849
            },
            {
                productName: "Asus ROG Phone 5",
                brandName: "Asus",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Gaming smartphone with 144Hz display and AirTrigger 5 controls.",
                price: 999,
                sellingPrice: 949
            },
            {
                productName: "Motorola Edge Plus",
                brandName: "Motorola",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "High-performance smartphone with Endless Edge display and 108MP camera.",
                price: 799,
                sellingPrice: 749
            },
            {
                productName: "Nokia 8.3 5G",
                brandName: "Nokia",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Versatile smartphone with PureView quad camera and ZEISS optics.",
                price: 699,
                sellingPrice: 649
            },
            {
                productName: "Realme GT",
                brandName: "Realme",
                category: "mobile",
                productImage: getRandomImages(mobilesImages, 4),
                description: "Flagship smartphone with Snapdragon 888 and 120Hz Super AMOLED display.",
                price: 599,
                sellingPrice: 549
            },
        ]

        const processors = [
            {
                productName: "Intel Core i9-11900K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "10th generation unlocked desktop processor with 8 cores and 16 threads.",
                price: 539,
                sellingPrice: 499
            },
            {
                productName: "AMD Ryzen 9 5900X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "12-core, 24-thread unlocked desktop processor for gaming and content creation.",
                price: 549,
                sellingPrice: 529
            },
            {
                productName: "Intel Core i7-11700K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "8-core, 16-thread unlocked desktop processor for high performance.",
                price: 399,
                sellingPrice: 379
            },
            {
                productName: "AMD Ryzen 7 5800X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "8-core, 16-thread unlocked desktop processor for serious gamers.",
                price: 449,
                sellingPrice: 429
            },
            {
                productName: "Intel Core i5-11600K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "6-core, 12-thread unlocked desktop processor for mainstream gamers.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "AMD Ryzen 5 5600X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "6-core, 12-thread unlocked desktop processor for gaming and content creation.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "Intel Core i3-10100",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "4-core, 8-thread desktop processor for entry-level gaming and productivity.",
                price: 129,
                sellingPrice: 119
            },
            {
                productName: "AMD Ryzen 3 3300X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "4-core, 8-thread unlocked desktop processor for budget gaming.",
                price: 120,
                sellingPrice: 110
            },
            {
                productName: "Intel Core i9-10900K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "10-core, 20-thread unlocked desktop processor for extreme performance.",
                price: 529,
                sellingPrice: 499
            },
            {
                productName: "AMD Ryzen 9 3950X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "16-core, 32-thread unlocked desktop processor for creators.",
                price: 749,
                sellingPrice: 729
            },
            {
                productName: "Intel Core i7-10700K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "8-core, 16-thread unlocked desktop processor for high performance gaming.",
                price: 379,
                sellingPrice: 359
            },
            {
                productName: "AMD Ryzen 7 3700X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "8-core, 16-thread unlocked desktop processor for advanced gaming.",
                price: 329,
                sellingPrice: 309
            },
            {
                productName: "Intel Core i5-10600K",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "6-core, 12-thread unlocked desktop processor for mid-tier gaming.",
                price: 262,
                sellingPrice: 249
            },
            {
                productName: "AMD Ryzen 5 3600X",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "6-core, 12-thread unlocked desktop processor for powerful gaming.",
                price: 249,
                sellingPrice: 229
            },
            {
                productName: "Intel Core i3-10300",
                brandName: "Intel",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "4-core, 8-thread desktop processor for entry-level performance.",
                price: 143,
                sellingPrice: 129
            },
            {
                productName: "AMD Ryzen 3 3100",
                brandName: "AMD",
                category: "processor",
                productImage: getRandomImages(processorsImages, 4),
                description: "4-core, 8-thread unlocked desktop processor for budget-friendly performance.",
                price: 99,
                sellingPrice: 89
            },
        ]

        const refrigerators = [
            {
                productName: "Samsung Family Hub Refrigerator",
                brandName: "Samsung",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Smart refrigerator with Wi-Fi, touchscreen, and voice control.",
                price: 2999,
                sellingPrice: 2799
            },
            {
                productName: "LG InstaView Door-in-Door Refrigerator",
                brandName: "LG",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Refrigerator with knock-to-see technology and smart features.",
                price: 3499,
                sellingPrice: 3299
            },
            {
                productName: "Whirlpool Double Door Refrigerator",
                brandName: "Whirlpool",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Spacious double door refrigerator with advanced cooling technology.",
                price: 1599,
                sellingPrice: 1499
            },
            {
                productName: "GE Profile Smart Refrigerator",
                brandName: "GE",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Smart refrigerator with built-in Keurig K-Cup brewing system.",
                price: 2499,
                sellingPrice: 2299
            },
            {
                productName: "Frigidaire Gallery Refrigerator",
                brandName: "Frigidaire",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "French door refrigerator with adjustable interior storage.",
                price: 1999,
                sellingPrice: 1799
            },
            {
                productName: "KitchenAid French Door Refrigerator",
                brandName: "KitchenAid",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "High-capacity refrigerator with exterior ice and water dispenser.",
                price: 2799,
                sellingPrice: 2599
            },
            {
                productName: "Bosch 800 Series Refrigerator",
                brandName: "Bosch",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Counter-depth refrigerator with VitaFreshPro technology.",
                price: 2999,
                sellingPrice: 2799
            },
            {
                productName: "Maytag Top Freezer Refrigerator",
                brandName: "Maytag",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Durable top freezer refrigerator with PowerCold feature.",
                price: 999,
                sellingPrice: 899
            },
            {
                productName: "Haier Quad Door Refrigerator",
                brandName: "Haier",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Innovative quad door design with flexible storage options.",
                price: 1899,
                sellingPrice: 1699
            },
            {
                productName: "Sub-Zero Built-In Refrigerator",
                brandName: "Sub-Zero",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Built-in refrigerator with dual refrigeration system.",
                price: 7999,
                sellingPrice: 7499
            },
            {
                productName: "Hisense French Door Refrigerator",
                brandName: "Hisense",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "French door refrigerator with water dispenser and LED lighting.",
                price: 1399,
                sellingPrice: 1299
            },
            {
                productName: "Midea Compact Refrigerator",
                brandName: "Midea",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Compact refrigerator for small spaces with adjustable thermostat.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Electrolux French Door Refrigerator",
                brandName: "Electrolux",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "French door refrigerator with TasteLock crisper and LuxCool cooling system.",
                price: 2599,
                sellingPrice: 2399
            },
            {
                productName: "Kenmore Side-by-Side Refrigerator",
                brandName: "Kenmore",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Side-by-side refrigerator with ice and water dispenser.",
                price: 1499,
                sellingPrice: 1399
            },
            {
                productName: "GE Side-by-Side Refrigerator",
                brandName: "GE",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Side-by-side refrigerator with advanced water filtration.",
                price: 1399,
                sellingPrice: 1299
            },
            {
                productName: "Samsung French Door Refrigerator",
                brandName: "Samsung",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Spacious French door refrigerator with Family Hub features.",
                price: 2899,
                sellingPrice: 2699
            },
            {
                productName: "LG Bottom Freezer Refrigerator",
                brandName: "LG",
                category: "refrigerator",
                productImage: getRandomImages(refrigeratorsImages, 4),
                description: "Bottom freezer refrigerator with Smart Cooling system.",
                price: 1499,
                sellingPrice: 1399
            },
        ]

        const speakers = [
            {
                productName: "JBL Charge 4",
                brandName: "JBL",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable Bluetooth speaker with powerful sound and long battery life.",
                price: 149,
                sellingPrice: 129
            },
            {
                productName: "Bose SoundLink Revolve+",
                brandName: "Bose",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable Bluetooth speaker with 360-degree sound and water-resistant design.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "Sony SRS-XB43",
                brandName: "Sony",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable wireless speaker with extra bass and party lights.",
                price: 249,
                sellingPrice: 229
            },
            {
                productName: "Ultimate Ears Boom 3",
                brandName: "Ultimate Ears",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable Bluetooth speaker with 360-degree sound and deep bass.",
                price: 179,
                sellingPrice: 159
            },
            {
                productName: "Anker Soundcore Flare 2",
                brandName: "Anker",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Bluetooth speaker with 360-degree sound, bass-up technology, and LED light show.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "Marshall Kilburn II",
                brandName: "Marshall",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable Bluetooth speaker with classic design and powerful sound.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "Sonos Move",
                brandName: "Sonos",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Durable, battery-powered smart speaker for indoor and outdoor listening.",
                price: 399,
                sellingPrice: 379
            },
            {
                productName: "Harman Kardon Onyx Studio 6",
                brandName: "Harman Kardon",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Elegant portable Bluetooth speaker with premium sound quality.",
                price: 299,
                sellingPrice: 279
            },
            {
                productName: "Bose HomePage Speaker 500",
                brandName: "Bose",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Smart speaker with built-in Alexa and Google Assistant.",
                price: 349,
                sellingPrice: 329
            },
            {
                productName: "Sony HT-S350 Soundbar",
                brandName: "Sony",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "2.1 channel soundbar with wireless subwoofer and Bluetooth connectivity.",
                price: 249,
                sellingPrice: 229
            },
            {
                productName: "Klipsch The One II",
                brandName: "Klipsch",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Stylish Bluetooth speaker with legendary sound and mid-century modern design.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Bang & Olufsen Beosound A1 (2nd Gen)",
                brandName: "Bang & Olufsen",
                category: "speaker",
                productImage: getRandomImages(speakersImages, 4),
                description: "Portable Bluetooth speaker with Alexa integration and 18-hour battery life.",
                price: 250,
                sellingPrice: 230
            },
        ]

        const trimmers = [
            {
                productName: "Philips Norelco Multigroom Series 7000",
                brandName: "Philips",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "All-in-one trimmer with 23 pieces for beard, head, body, and face.",
                price: 69,
                sellingPrice: 59
            },
            {
                productName: "Braun MGK3980",
                brandName: "Braun",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "8-in-1 men's grooming kit for beard, hair, and body trimming.",
                price: 49,
                sellingPrice: 39
            },
            {
                productName: "Wahl Lithium Ion Plus",
                brandName: "Wahl",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Rechargeable beard and nose hair trimmer with stainless steel blades.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "Panasonic ER-GB80-S",
                brandName: "Panasonic",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Beard trimmer with 39 precision settings for personalized grooming.",
                price: 69,
                sellingPrice: 59
            },
            {
                productName: "Remington PG6025",
                brandName: "Remington",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "All-in-one lithium powered grooming kit with 8 attachments.",
                price: 39,
                sellingPrice: 29
            },
            {
                productName: "Gillette Styler",
                brandName: "Gillette",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "3-in-1 body groomer, beard trimmer, and razor with Braun technology.",
                price: 29,
                sellingPrice: 19
            },
            {
                productName: "Hatteker Men's Beard Trimmer Kit",
                brandName: "Hatteker",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Cordless hair trimmer and clipper set with adjustable precision dial.",
                price: 59,
                sellingPrice: 49
            },
            {
                productName: "Philips OneBlade Pro",
                brandName: "Philips",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Hybrid electric trimmer and shaver with 14 length settings.",
                price: 79,
                sellingPrice: 69
            },
            {
                productName: "Andis Professional T-Outliner",
                brandName: "Andis",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Professional beard and hair trimmer with carbon-steel T-blade.",
                price: 69,
                sellingPrice: 59
            },
            {
                productName: "ConairMAN Super Stubble Ultimate Flexhead",
                brandName: "Conair",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Cordless trimmer with 15 ultra-precise length settings.",
                price: 99,
                sellingPrice: 89
            },
            {
                productName: "Bevel Beard Trimmer",
                brandName: "Bevel",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Cordless beard trimmer with soft-touch grip and hypoallergenic blades.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Manscaped Lawn Mower 3.0",
                brandName: "Manscaped",
                category: "trimmer",
                productImage: getRandomImages(trimmersImages, 4),
                description: "Waterproof body trimmer with SkinSafe technology for a smooth shave.",
                price: 69,
                sellingPrice: 59
            },
        ]

        const televisions = [
            {
                productName: "Samsung Q90T QLED tv",
                brandName: "Samsung",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K QLED smart tv with Quantum Processor and HDR.",
                price: 1999,
                sellingPrice: 1799
            },
            {
                productName: "LG CX OLED tv",
                brandName: "LG",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K OLED tv with AI ThinQ and Dolby Vision.",
                price: 2499,
                sellingPrice: 2299
            },
            {
                productName: "Sony A8H OLED tv",
                brandName: "Sony",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K OLED tv with X-Motion Clarity and Acoustic Surface Audio.",
                price: 2799,
                sellingPrice: 2599
            },
            {
                productName: "TCL 6-Series Roku tv",
                brandName: "TCL",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K QLED Roku tv with Dolby Vision and mini-LED technology.",
                price: 1299,
                sellingPrice: 1199
            },
            {
                productName: "Vizio P-Series Quantum X",
                brandName: "Vizio",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K HDR smart tv with Quantum Color and Active Full Array backlight.",
                price: 1499,
                sellingPrice: 1399
            },
            {
                productName: "Samsung The Frame",
                brandName: "Samsung",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K QLED smart tv designed to look like a piece of art.",
                price: 1499,
                sellingPrice: 1299
            },
            {
                productName: "LG NanoCell 90 Series",
                brandName: "LG",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K smart tv with NanoCell technology and α7 Gen 3 Processor.",
                price: 1399,
                sellingPrice: 1199
            },
            {
                productName: "Sony X900H",
                brandName: "Sony",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K HDR smart tv with X-Motion Clarity and Game Mode.",
                price: 1599,
                sellingPrice: 1399
            },
            {
                productName: "Hisense H9G Quantum Series",
                brandName: "Hisense",
                category: "television",
                productImage: getRandomImages(tvImages, 4),
                description: "4K ULED smart tv with Quantum Dot technology and Dolby Vision.",
                price: 1099,
                sellingPrice: 999
            },
        ]

        const watches = [
            {
                productName: "Sony SmartWatch 3",
                brandName: "Sony",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Android Wear smartwatch with GPS and water resistance.",
                price: 199,
                sellingPrice: 179
            },
            {
                productName: "Sony Wena Wrist Pro",
                brandName: "Sony",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Smart band with customizable watch faces and fitness tracking.",
                price: 399,
                sellingPrice: 349
            },
            {
                productName: "Sony SmartBand Talk",
                brandName: "Sony",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Fitness tracker with e-ink display and voice control.",
                price: 149,
                sellingPrice: 129
            },
            {
                productName: "Apple Watch Series 8",
                brandName: "Apple",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Advanced health sensors and apps, always-on display.",
                price: 399,
                sellingPrice: 379
            },
            {
                productName: "Apple Watch Ultra",
                brandName: "Apple",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Rugged and capable with advanced metrics for athletes.",
                price: 799,
                sellingPrice: 749
            },
            {
                productName: "Apple Watch SE (2nd Generation)",
                brandName: "Apple",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Essential features with an affordable price.",
                price: 279,
                sellingPrice: 259
            },
            {
                productName: "Samsung Galaxy Watch 5 Pro",
                brandName: "Samsung",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Advanced fitness tracking and long-lasting battery.",
                price: 449,
                sellingPrice: 419
            },
            {
                productName: "Samsung Galaxy Watch 5",
                brandName: "Samsung",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Versatile smartwatch with health monitoring features.",
                price: 329,
                sellingPrice: 299
            },
            {
                productName: "Samsung Galaxy Watch 4 Classic",
                brandName: "Samsung",
                category: "watch",
                productImage: getRandomImages(watchesImages, 4),
                description: "Classic design with rotating bezel and advanced health features.",
                price: 399,
                sellingPrice: 369
            }
        ]

        await Product.insertMany(airpodes)
        await Product.insertMany(cameras)
        await Product.insertMany(earphones)
        await Product.insertMany(mouses)
        await Product.insertMany(printers)
        await Product.insertMany(mobiles)
        await Product.insertMany(processors)
        await Product.insertMany(refrigerators)
        await Product.insertMany(trimmers)
        await Product.insertMany(televisions)
        await Product.insertMany(watches)
        await Product.insertMany(speakers)

        console.log("Data successfully seeded")
    } catch (err) {
        console.error("Error seeding data:", err)
    } finally {
        mongoose.connection.close()
    }
}


const deleteAllResourcesFromCloudinary = async () => {
    try {
        let resources = await cloudinary.api.resources({max_results: 500})

        while (resources.resources.length > 0) {
            const publicIds = resources.resources.map(resource => resource.public_id)

            const chunkSize = 100
            for (let i = 0; i < publicIds.length; i += chunkSize) {
                const chunk = publicIds.slice(i, i + chunkSize)
                await cloudinary.api.delete_resources(chunk)
            }

            resources = await cloudinary.api.resources({max_results: 500})
        }

        console.log("All resources have been deleted.");
    } catch (error) {
        console.error("Error deleting resources:", error);
    }
}

const deleteAllResourcesFromDatabase = async () => {
    await Product.deleteMany({})
}


connectDB()
    .then(deleteAllResourcesFromCloudinary)
    .then(deleteAllResourcesFromDatabase)
    .then(seedDatabase)
    .catch(err => console.error("Error connecting to database:", err))
