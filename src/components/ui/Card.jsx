import { children } from "react";

export default function Card ({children}) {
    return (
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        {children}
        </div>
    )
}