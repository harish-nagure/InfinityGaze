import React, { useState, useEffect } from "react";
import '../CSS/SearchExplore.css';
import CardComponent from './CardComponent';
import logo3 from '../image/logo3.png';
import HowToPlay from './HowToPlay';

const SearchExplore = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [initialResults, setInitialResults] = useState([]); // Store initial results
    useEffect(() => {
        // Set initial results when component mounts
        setInitialResults([
            { 
                name: "Dragon",
                cardLink:"https://offline-dino-game.firebaseapp.com/",
                logo:"https://ih1.redbubble.net/image.1693032645.6671/ur,pin_large_front,square,600x600.jpg",
            },
            { 
                name: "Dr Strange Mudras",
                cardLink:"",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk1Z3_tRmMRlA4YwBJKMz6_gPYa8RqBtdEf2GzNgcKciHco2A3NbH1Kyz_TBXeT8Deu0&usqp=CAU",
            },
            { 
                name: "Hill Climb",
                cardLink:"",
                logo: "https://play-lh.googleusercontent.com/b5lXziaoIOrheJ_VEn2VYjarBPlvgQGalt3CcSUib-WknRtG5EBpH45NDBTeYbfWpJQ"
            },
            { 
                name: "Traffic Racer",
                cardLink:"https://yandex.com/games/app/170779#app-id=170779&catalog-session-uid=catalog-661e1c2f-3b5e-566b-8fb7-689f9c4949a4-1708667068735-d0f8&rtx-reqid=12048024825284239080&pos=%7B%22listType%22%3A%22played%22%2C%22tabCategory%22%3A%22common%22%7D&redir-data=%7B%22http_ref%22%3A%22https%253A%252F%252Fyandex.com%252Fgames%252F%2523app-id%253D170779%2526catalog-session-uid%253Dcatalog-661e1c2f-3b5e-566b-8fb7-689f9c4949a4-1708666882208-dbdc%2526rtx-reqid%253D9577038554848381771%2526pos%253D%25257B%252522listType%252522%25253A%252522played%252522%25252C%252522tabCategory%252522%25253A%252522common%252522%25257D%22%2C%22rn%22%3A401246633%7D",
                logo: "https://m.media-amazon.com/images/I/81o52rlixQL.png"
            },
            { 
                name: "Moto X3",
                cardLink:"https://poki.com/en/g/moto-x3m-4-winter",
                logo: "https://play-lh.googleusercontent.com/_Yd7Dc8MgDya7aRbNtxXlLuvGNUgxkk44PJg4swPpDuDy27dZjRRH1vJEJflMJpHQ4M7"
            },
            { 
                name: "Subway Surfer",
                cardLink:"https://poki.com/en/g/subway-surfers",
                logo: "https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/97d3658ee1de2cf5e809710f174eb29d.png"
                // logo: "https://assets-prd.ignimgs.com/2023/03/01/subwaysurfers-1677630205274.jpg"
            },
            {
                name: "Retro Highway",
                cardLink:"https://poki.com/en/g/retro-highway",
                logo:"https://www1.minijuegosgratis.com/v3/games/thumbnails/247515_7_sq.jpg"
            }
        ]);
    }, []);

    useEffect(() => {
        // Update search results based on search term
        if (searchTerm === "") {
            setSearchResults(initialResults);
            
        } else {
            const results = initialResults.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
        
    }, [searchTerm, initialResults]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState('');

    const handleOpenHowToPlay = (type) => {
        setIsHowToPlayOpen(true);
        setSelectedGame(type);
    };
  
    const handleCloseHowToPlay = () => {
        setIsHowToPlayOpen(false);
        setSelectedGame('');
    };
    
    return (
        <div className="explore">
            <div className="overlay-explore">
            <div className='heading-explore'>
                <img src={logo3} alt='logo' className="logo-3"/>
                <h1>Explore captivating games and elevate your gaming<br/>experience like never before!</h1>
                <form onSubmit={e => e.preventDefault()} className="forms">
                    <input
                        type="search"
                        placeholder="&#x1F50E;&#xFE0E;  Search here...."
                        value={searchTerm}
                        onChange={handleChange}
                        className="search"
                    />
                </form>
            </div>
            <section id="explore">
                    {searchResults.length === 0 ? (
                        <h1>No results found</h1>
                    ) : (
                        searchResults.map((item, index) => (
                            <CardComponent key={index} item={item} onOpenHowToPlay={handleOpenHowToPlay} />
                        ))
                    )}
            </section>
            {isHowToPlayOpen && <HowToPlay type={selectedGame} onClose={handleCloseHowToPlay} />}
        </div>
        </div>
    );
};

export default SearchExplore;
