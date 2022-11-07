import { useEffect, useState } from "react";


export default function Cocktail() {
    const [item, setItem] = useState("")
    const [drinkImage, setDrinkImage] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [glass, setGlass] = useState("")
    const [instuctions, setInstuctions] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")


    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function ok(e) {
        e.preventDefault();
        if (search != "") {
            DrinkSearch();

        } else {
            DrinkChange();
        }
    }

    async function DrinkChange() {
        setItem("Loading...")
        try {
            let res = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/random.php"
            );
            let result = await res.json();
            setItem(result["drinks"][0]["strDrink"]);
            setDrinkImage(result["drinks"][0]["strDrinkThumb"]);
            setGlass(result["drinks"][0]["strGlass"])
            setInstuctions(result["drinks"][0]["strInstructions"])
            let i = 1;
            let t = [];
            while (result["drinks"][0]["strIngredient" + i.toString()] !== null) {
                t.push({
                    id: i,
                    dr: result["drinks"][0]["strIngredient" + i.toString()],
                    ms: result["drinks"][0]["strMeasure" + i.toString()],
                });
                i++;
            }
            setIngredients([...t]);
            await sleep(200);
            console.log(search);
        } catch (error) {
            setItem("Error");
        }
        setIsLoading(false);
    }


    async function DrinkSearch() {
        setItem("Loading...")
        try {
            let res = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search
            );
            let result = await res.json();
            setItem(result["drinks"][0]["strDrink"]);
            setDrinkImage(result["drinks"][0]["strDrinkThumb"]);
            setGlass(result["drinks"][0]["strGlass"])
            setInstuctions(result["drinks"][0]["strInstructions"])
            let i = 1;
            let t = [];
            while (result["drinks"][0]["strIngredient" + i.toString()] !== null) {
                t.push({
                    id: i,
                    dr: result["drinks"][0]["strIngredient" + i.toString()],
                    ms: result["drinks"][0]["strMeasure" + i.toString()],
                });
                i++;
            }
            setIngredients([...t]);
            await sleep(200);
            console.log(search);
        } catch (error) {
            setItem("Error");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (search != "") {
            DrinkSearch();

        } else {
            DrinkChange();
        }
    }, [])

    if (isLoading) {
        return (
            <>
                <p>{item}</p>
            </>
        )
    } else if (item == "Error") {
        return (
            <>
                <h3>Drink not found!</h3>
            </>
        )


    } else {
        return (
            <>
                <h1>Cocktail of the day</h1>
                <form onSubmit={ok}>
                    <input placeholder='Search by name' value={search} onChange={e => setSearch(e.target.value)}></input><button>Search/Get random</button>
                </form>
                <img src={drinkImage} id="image"></img>
                <h2>{item}</h2>
                <h3>Glass</h3>
                <p>{glass}</p>
                <h3>Instuctions</h3>
                <p>{instuctions}</p>
                <ul>
                    {
                        ingredients.map(ingredients =>
                            <li>{ingredients.dr} {ingredients.ms}</li>)
                    }
                </ul>

            </>
        )
    }

}