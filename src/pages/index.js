import Image from "next/image";
import { Inter } from "next/font/google";
import ThemeSwitch from "@/components/theme/themeSwitch";
import Appbar from "@/components/Appbar/Appbar";
import Slogan from "@/sections/LandingPage/Slogan/Slogan";
import ProductsShowcase from "@/sections/LandingPage/ProductShowcase/ProductsShowcase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center ${inter.className}`}
        >
            <div className="fixed -top-10 left-0 -z-30">
                <div className="absolute w-[110vw] h-[110vh] backdrop-blur-3xl bg-[#D9D9D9ba] dark:bg-[#48484871]">
                </div>
            </div>
            <Appbar links={{ login: "/login", signup: "/signup" }}></Appbar>
            <div className="mt-14">
            </div>
              <Slogan></Slogan>
              <ProductsShowcase></ProductsShowcase>
        </main>
    );
}
