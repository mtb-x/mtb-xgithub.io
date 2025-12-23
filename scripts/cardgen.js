const cardsDiv = document.getElementById("cards");

function generateCards(count, suitNames, rankVals, noDupes, jokers){
    cardsDiv.innerHTML = "";

    // const count = +document.getElementById("count").value;
    // const suitNames = [...document.querySelectorAll(".suit:checked")].map(s=>s.value);
    // const rankVals = [...document.querySelectorAll(".rank:checked")].map(r=>+r.value);
    // const noDupes = document.getElementById("noDupes").checked;
    // const jokers = document.getElementById("jokers").checked;

console.log(suitNames)
console.log(rankVals)

    let deck = [];
    suits.forEach(s=>{
        if(suitNames.length && !suitNames.includes(s.name)) return;
        ranks.forEach(r=>{
            if(!rankVals.includes(r.v)) return;
            deck.push({s,r});
        });
    });

    if(jokers){
        deck.push({joker:true,color:"red"});
        deck.push({joker:true,color:"black"});
    }

    if(noDupes && count > deck.length){
        alert("Not enough cards matching constraints.");
        return;
    }

    for(let i=0;i<count;i++){
        const idx = Math.floor(Math.random()*deck.length);
        const card = deck[idx];
        if(noDupes) deck.splice(idx,1);
        renderCard(card, cardsDiv);
        log(card);
        // get_stack_number_for_card(card)
    }
}

function renderCard(c, div){
    const d = document.createElement("div");
    d.className = "card"; // keep the card styling for size/shadow

    let imgSrc = "";

    if(c.joker){
        // If you also have Joker images, you could do something like:
        imgSrc = `${c.color}_joker.png`; // adjust filename if needed
    } else {
        let rankName = "";
        // Map numeric values to filenames
        if(c.r.v >= 2 && c.r.v <= 10){
            rankName = c.r.l; // 2-10
        } else if(c.r.v === 11){
            rankName = "jack";
        } else if(c.r.v === 12){
            rankName = "queen";
        } else if(c.r.v === 13){
            rankName = "king";
        } else if(c.r.v === 14){
            rankName = "ace";
        }

        // Check if it's a face card that uses the "2" suffix
        const faceCard = ["jack","queen","king"];
        if(faceCard.includes(rankName)){
            imgSrc = `${rankName}_of_${c.s.name}2.png`;
        } else {
            imgSrc = `${rankName}_of_${c.s.name}.png`;
        }
    }

    // Create the image element
    const img = document.createElement("img");
    img.src = `images/${imgSrc}`; // assuming all images are in ./images/ folder
    console.log("!-=-=-=-=-=-=!");
    console.log(img.src);
    img.alt = c.joker ? `${c.color} Joker` : `${c.r.l} of ${c.s.label}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    // Create stack label for card
    const stack_label = document.createElement("p");
    stack_label.className = "stack-label";
    stack_label.textContent = "stack position: " + get_stack_number_for_card(c)
    stack_label.style.display = showStack ? "block" : "none";

    d.appendChild(img);
    d.appendChild(stack_label);
    div.appendChild(d);

}

function getCardName(c){
    return capitalizeFirstLetter(get_rank_name(c)) + ` of ${c.s.label}`;
}