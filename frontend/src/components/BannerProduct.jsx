import {
    image1,
    image2,
    image3,
    image4,
    image5,
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
    useEffect,
    useState,
    useCallback,
    FaAngleLeft,
    FaAngleRight
} from "../utils/imports";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        { src: image1, alt: 'Product banner 1' },
        { src: image2, alt: 'Product banner 2' },
        { src: image3, alt: 'Product banner 3' },
        { src: image4, alt: 'Product banner 4' },
        { src: image5, alt: 'Product banner 5' }
    ];

    const mobileImages = [
        { src: image1Mobile, alt: 'Product banner 1 mobile' },
        { src: image2Mobile, alt: 'Product banner 2 mobile' },
        { src: image3Mobile, alt: 'Product banner 3 mobile' },
        { src: image4Mobile, alt: 'Product banner 4 mobile' },
        { src: image5Mobile, alt: 'Product banner 5 mobile' }
    ];

    const nextImage = useCallback(() => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    }, [currentImage, desktopImages.length]);

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage, desktopImages.length, nextImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-56 md:h-72 w-full bg-slate-200 relative">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button className="bg-white shadow-md rounded-full p-1" onClick={prevImage}>
                            <FaAngleLeft />
                        </button>
                        <button className="bg-white shadow-md rounded-full p-1" onClick={nextImage}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {desktopImages.map((image, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-all"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            key={index}
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-full" />
                        </div>
                    ))}
                </div>

                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {mobileImages.map((image, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-all"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            key={index}
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default BannerProduct;
