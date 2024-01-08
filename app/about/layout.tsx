import React from "react";

export default function RootLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-red-500">
                {children}
            </body>
        </html>
    )
}