import React, { useRef, useState } from "react";
import ProductsCategory from "./Components/ProductsCategory";
import ProductsInfo from "./Components/ProductsInfo";

function ProductsShowcase() {
    const [activeTile, setActiveTile] = useState(0);
    const contentRef = useRef(null);
    const handleScroll = () => {
        const scrollTop = contentRef.current.scrollTop;
        setActiveTile(Math.floor(scrollTop / sectionHeight));
    };
    const showInfo = () => {
        console.log(activeTile);
    };
    return (
        <div className="mt-16 flex w-[95rem]">
            <div className="flex-[0.25]">
                <ProductsCategory></ProductsCategory>
            </div>
            <div className="flex-[0.75]">
                <ProductsInfo></ProductsInfo>
            </div>
        </div>
    );
}

export default ProductsShowcase;
