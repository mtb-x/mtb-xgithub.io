// * ---------- INIT STACK ---------- */
let showStack = false;
let current_stack = particle_stack //TODO: Change default 

/* ----------  STACK SELECTION ---------- */
const stackSelect = document.getElementById("stack-lst");

stackSelect.addEventListener("change", () => {
    const selected = stackSelect.value;

    // Switch current_stack based on the selection
    if (selected === "newdeck") {
        current_stack = new_deck_stack; 
    } else if (selected === "ps") {
        current_stack = particle_stack; // assuming you have this defined
    }
    console.log("Current stack changed to:", selected);
});

function get_stack_number_for_card(c){
    let card = c.joker ? `${c.color}_joker` : get_rank_name(c) + `_of_${c.s.label}`.toLowerCase();
    return current_stack[card]
}

function get_card_from_stack_number(n){
    // find the key whose value matches n
    const key = Object.keys(current_stack).find(k => current_stack[k] === n);
    if(!key) return null;

    // joker keys are like "red_joker" or "black_joker"
    if(key.endsWith("_joker")){
        const color = key.replace("_joker", "");
        return {
            joker: true,
            color: color
        };
    }

    // normal cards look like "ace_of_spades" or "10_of_hearts"
    const parts = key.split("_of_");
    if(parts.length !== 2) return null;

    const rankStr = parts[0]; // e.g. "ace" or "10"
    const suitLabel = parts[1]; // e.g. "spades"

    let rankValue;
    const r = rankStr.toLowerCase();
    if(r === "jack") rankValue = 11;
    else if(r === "queen") rankValue = 12;
    else if(r === "king") rankValue = 13;
    else if(r === "ace") rankValue = 14;
    else rankValue = Number(r); // 2-10

    return {
        joker: false,
        r: { v: rankValue, l: rankStr },
        s: { label: suitLabel, name: suitLabel}
    };
}

/* ---------- CARD UTILS ---------- */

function get_rank_name(c){
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
    return rankName;
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}