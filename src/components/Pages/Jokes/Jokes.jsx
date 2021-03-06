// Henter react med hook funktioner useState og useEffect 
// Hook funktioner starter altid med use  React
import React, { useState, useEffect } from "react";

// Eksporterer default
export default function Jokes(props) {
    // Sætter array vars / useState til null
    const [apiData, setApiData] = useState(null);

    // Definerer asynkron funktion til fetch
    // Så slipper vi for then-indenterings helvede
    async function getJoke() {
        // Sætter headers til at acceptere json format
        const fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");

        // Forsøg at fetche api'et
        try {
            const request = await fetch("https://icanhazdadjoke.com/", {headers: fetchHeaders});
            const response = await request.json();
            //console.log("getJoke -> response", response);

            // Tildel svaret til setApiData
            setApiData(response);

        } catch (error) {
            // Fang fejl og vis hvis der er en
            console.log("getJoke -> Error", error);
        }
    }

    // 
    useEffect(() => {
        getJoke()
    }, [])

    return (
        <div>
            <button onClick={getJoke}>Hent joke</button>
            <p>
                {apiData && apiData.joke}
            </p>
        </div>
    )
}