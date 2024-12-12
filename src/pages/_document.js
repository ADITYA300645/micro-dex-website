import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />

            <body className="duration-500 transition-all dark:bg-[#242936] bg-[#EFFEFF] overflow-x-hidden">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
