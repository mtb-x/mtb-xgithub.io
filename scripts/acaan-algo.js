
/* ---------- DOM ---------- */
const revStackBox = document.getElementById("rev-stack-chkbx")
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c1op = document.getElementById("c1-opperator");
const keycardDiv = document.getElementById("keycard-slot");
// const c1res = document.getElementById("c1-res");
// const c2res = document.getElementById("c2-res");

/* ---------- INSTRUCTION STRINGS ---------- */
let c1reved = 'Add the stack number to the selected number';
let c1norm = 'Subtract the stack number from the selected number';
let c2reved = 'If the result is over 52, subtract 52 from it';



/* ---------- INIT ---------- */
let keycard = null;
updateInstructionsTest();
document.getElementById("c2-calc-alt-2").hidden = true;
hideKeyCard();

function updateInstructionsTest(){
    if (revStackBox.checked){
        console.log("Using reversed stack");
        c1.textContent = c1reved;
        c1op.textContent = "+";
        c2.textContent = c2reved;
    } else {
        console.log("Using normal order stack");
        c1.textContent = c1norm;
        c1op.textContent = "-";
    }
}

function updateCalculations(){
    let c1 = null;
    let c2 = null;
    if (revStackBox.checked){
        // First calculation: stack num + gen num
        c1 = lastGenCardStackNum + lastGenNum;
    } else {
        // First calculation: gen num - stack num
        c1 = lastGenNum - lastGenCardStackNum;
    }
    updateSecretField("c1-res", c1)
    if (c1 < 0 || c1 > 52){
        if (!showingSecrets){
            document.getElementById("c2-calc-alt-1").hidden = false;
            document.getElementById("c2-calc-alt-2").hidden = true;
        } else {
           document.getElementById("c2-calc-alt-2").hidden = false;
           document.getElementById("c2-calc-alt-1").hidden = true; 
        }
        if(c1 > 52){
            c2 = c1 - 52;
        }
        updateSecretField("c2-res", c2);
    } else {
        document.getElementById("c2-calc-alt-2").hidden = true;
        document.getElementById("c2-calc-alt-1").hidden = false;
        updateSecretField("c2-res", "Nothing required");
        c2 = c1;
    }
    keycard = get_card_from_stack_number(c2);
    updateSecretField("keycard-txt", getCardName(keycard));
    // renderCard(keycard, keycardDiv);
    renderKeyCard();
}

function runAlgorithm(){
    if(lastGenCard && lastGenNum) {
        console.log("able to run cals");
        updateCalculations();
    }
}

function renderKeyCard(){
    if (showingSecrets && keycard){
        keycardDiv.data = keycard;
        keycardDiv.innerHTML = ""; // Clear existing card
        renderCard(keycard, keycardDiv);
        return;
    }
    if (!showingSecrets && keycard){
       keycardDiv.innerHTML = '<span class="keycard-slot-txt">?</span>'; 
    }
}

function hideKeyCard(){
   keycardDiv.innerHTML = '<span class="keycard-slot-txt">?</span>'; 
}

// function showKeyCard(){
//    renderCard(keycard, keycardDiv); 
// }


function updateSecretField(name, val) {
    // Select element by ID (if it exists)
    const byId = document.getElementById(name);

    // Select elements by class
    const byClass = document.querySelectorAll("." + name);

    // Combine into one array (avoids duplicate code)
    const elements = [
        ...(byId ? [byId] : []),
        ...byClass
    ];

    elements.forEach(el => {
        // Store the real value
        el.data = val;

        // Show or hide based on state
        if (showingSecrets) {
            el.textContent = val;
        } else {
            el.textContent = "???";
        }
    });
}

/* ---------- CHECKBOX LISTENER ---------- */
revStackBox.addEventListener('change', (event) => {
    updateInstructionsTest();
    runAlgorithm();
})