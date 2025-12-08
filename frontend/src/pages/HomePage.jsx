import {
   CategoryList,
   BannerProduct,
   ProductSliderSmall,
   VerticalProductCard
} from "../utils/imports";


const HomePage = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <ProductSliderSmall category="airpode" heading="Top's Airpodes" />
            <ProductSliderSmall category="earphone" heading="Top's Earphones" />

            <VerticalProductCard category="mobile" heading="Top's Mobiles" />
            <VerticalProductCard category="printer" heading="Top's Printers" />
            <VerticalProductCard category="television" heading="Top's Televisions" />
            <VerticalProductCard category="camera" heading="Top's Cameras" />
            <VerticalProductCard category="speaker" heading="Top's Speakers" />
            <VerticalProductCard category="refrigerator" heading="Top's Refrigerators" />
            <VerticalProductCard category="processor" heading="Top's Processors" />
            <VerticalProductCard category="trimmer" heading="Top's Trimmers" />
            <VerticalProductCard category="watch" heading="Top's Watches" />
            <VerticalProductCard category="mouse" heading="Top's Mouses" />
        </div>
    );
};


export default HomePage;
