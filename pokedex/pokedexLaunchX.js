const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    dark: '#291e6dc7',
    default: '#2A1A1F',
};

const fetchPokemon = () => {
    const pTxtPokeName = document.getElementById("txtPokeName");
    let vTxtPokeNameVal = pTxtPokeName.value.toLowerCase();

    const oPokeName = document.getElementById("dataPokeName");
    oPokeName.textContent = "Searching";
    const url = `https://pokeapi.co/api/v2/pokemon/${vTxtPokeNameVal}`;
    fetch(url).then((res) => {
        if(res.status!=200){
            mSetPokeName('Pokemon Not Found');
            mSetPokeImage("./assets/images/poke-shadow.png");
            mSetPokeType('');
            mSetPokeStats('');
            mSetPokeMoves('');
            mSetPokeImageBackground('white')
        }
        else{
            return res.json();
        }
    }).then((data) => {
        if(data!=undefined){
             console.log(data);
            mSetPokeName(data.name.toUpperCase());
            mSetPokeImage(data.sprites.front_default);
            mSetPokeType(data.types);
            mSetPokeStats(data.stats);
            mSetPokeMoves(data.moves);
            mSetPokeImageBackground(typeColors[data.types[0].type.name]);
        }
    });
}

const mSetPokeName = (name) => {
    const oPokeName = document.getElementById("dataPokeName");
    oPokeName.textContent=name;
}

const mSetPokeImage = (url) => {
    const oPokeImg = document.getElementById("dataPokeImg");
    oPokeImg.src=url;
}

const mSetPokeImageBackground = (color) => {
    const oPokeImgContainer = document.getElementById("dataPokeImgContainer");
    oPokeImgContainer.style.backgroundColor = color;
}

const mSetPokeType = (types) => {
    const oPokeType = document.getElementById("dataPokeTypes");
    oPokeType.innerHTML='';
    if(types!=''){
        types.forEach(type => {
            const typeTextElement = document.createElement("div");
            typeTextElement.style.backgroundColor = typeColors[type.type.name];
            typeTextElement.textContent = type.type.name;
            oPokeType.appendChild(typeTextElement);
        });
    }
}

const mSetPokeStats = (stats) => {
    const oPokeStats = document.getElementById("dataPokeStats");
    oPokeStats.innerHTML='';
    if(stats!=''){
        stats.forEach(stat => {
            const statElement = document.createElement("div");
            const statName = document.createElement("div");
            const statValue = document.createElement("div");
            statElement.style.display="flex";
            statElement.style.justifyContent="space-between";
            statName.style.display = "inline";
            statName.style.float = "left";
            statValue.style.display = "inline";
            statValue.style.float = "right";
            statName.textContent = stat.stat.name;
            statValue.textContent = stat.base_stat;
            statElement.appendChild(statName);
            statElement.appendChild(statValue);
            oPokeStats.appendChild(statElement);
        });
    }
}

const mSetPokeMoves = (moves) => {
    const oPokeMoves = document.getElementById("dataPokeMoves");
    oPokeMoves.innerHTML='';
    if(moves!=''){
        moves.forEach(move => {
            console.log(move);
            const moveElement = document.createElement("div");
            moveElement.textContent = move.move.name;
            oPokeMoves.appendChild(moveElement);
        });
    }
}

