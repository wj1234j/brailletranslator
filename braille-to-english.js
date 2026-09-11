// dictionary //

const braille = {

    // letters
    "⠁": "a",
    "⠃": "b",
    "⠉": "c",
    "⠙": "d",
    "⠑": "e",
    "⠋": "f",
    "⠛": "g",
    "⠓": "h",
    "⠊": "i",
    "⠚": "j",
    "⠅": "k",
    "⠇": "l",
    "⠍": "m",
    "⠝": "n",
    "⠕": "o",
    "⠏": "p",
    "⠟": "q",
    "⠗": "r",
    "⠎": "s",
    "⠞": "t",
    "⠥": "u",
    "⠧": "v",
    "⠺": "w",
    "⠭": "x",
    "⠽": "y",
    "⠵": "z",

    // numbers
    "⠼⠁": "1",
    "⠼⠃": "2",
    "⠼⠉": "3",
    "⠼⠙": "4",
    "⠼⠑": "5",
    "⠼⠋": "6",
    "⠼⠛": "7",
    "⠼⠓": "8",
    "⠼⠊": "9",
    "⠼⠚": "0",

    // punctuation
    "⠲": ".",
    "⠂": ",",
    "⠦": "?",
    "⠖": "!",
    "⠄": "'",
    "⠒": ":",
    "⠆": ";",
    "⠤": "-",

    // symbols
    "⠈⠁": "@",
    "⠼": "#",
    "⠬": "+",
    "⠨⠅": "=",
    "⠌": "/",
    "⠔": "*",
    "⠨⠴": "%"

};

// braille keyboard dictionary //

const dotToBraille = {

    // letters

    "1": "⠁",
    "12": "⠃",
    "14": "⠉",
    "145": "⠙",
    "15": "⠑",
    "124": "⠋",
    "1245": "⠛",
    "125": "⠓",
    "24": "⠊",
    "245": "⠚",
    "13": "⠅",
    "123": "⠇",
    "134": "⠍",
    "1345": "⠝",
    "135": "⠕",
    "1234": "⠏",
    "12345": "⠟",
    "1235": "⠗",
    "234": "⠎",
    "2345": "⠞",
    "136": "⠥",
    "1236": "⠧",
    "2456": "⠺",
    "1346": "⠭",
    "13456": "⠽",
    "1356": "⠵",

    // number sign

    "3456": "⠼",

    // punctuation

    "256": "⠲",
    "2": "⠂",
    "236": "⠦",
    "235": "⠖",
    "3": "⠄",
    "25": "⠒",
    "23": "⠆",
    "36": "⠤",

    // symbols

    "4": "⠈",
    "346": "⠬",
    "34": "⠌",
    "35": "⠔" 

};

// textbox //

const brailleInput = document.getElementById("brailleInput");


// translation output //

document.getElementById("translateButton").addEventListener("click", function() {

    const input = brailleInput.value;

    let result = "";
    let position = 0;

    // Sort dictionary from longest to shortest
    // so ⠼⠁ is recognised before ⠼
    const keys = Object.keys(braille)
        .sort((a, b) => b.length - a.length);

    while (position < input.length) {

        // Keep spaces
        if (input[position] === " ") {

            result += " ";
            position++;

            continue;
        }

        let found = false;

        // Look for a matching Braille sequence
        for (let key of keys) {

            if (input.startsWith(key, position)) {

                result += braille[key];

                position += key.length;

                found = true;

                break;
            }
        }

        // No matching Braille character
        if (!found) {

            document.getElementById("result").textContent =
                "Please enter valid Braille characters.";

            return;
        }
    }

    document.getElementById("result").textContent = result;

});


// read aloud button //

document.getElementById("speakButton").addEventListener("click", function() {

    const text = document.getElementById("result").textContent;

    if (text === "") {
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

});


// text area expansion //

brailleInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height = this.scrollHeight + "px";

});


// braille keyboard //

let pressedDots = new Set();

document.querySelectorAll(".braille-key").forEach(function(button) {

    button.addEventListener("click", function() {

        const dot = this.dataset.dot;

        if (pressedDots.has(dot)) {

            pressedDots.delete(dot);
            this.classList.remove("selected");

        } else {

            pressedDots.add(dot);
            this.classList.add("selected");

        }

    });

});

    




// enter button //

document.getElementById("enterButton").addEventListener("click", function() {

    const combination = [...pressedDots]
        .sort((a, b) => Number(a) - Number(b))
        .join("");

    if (dotToBraille[combination]) {

        // Add the new Braille character
        brailleInput.value += dotToBraille[combination];

    }

    // Clear selected dots
    pressedDots.clear();

    // Remove grey selection
    document.querySelectorAll(".braille-key").forEach(function(button) {

        button.classList.remove("selected");

    });

});


// space button //

document.getElementById("spaceButton").addEventListener("click", function() {

    brailleInput.value += " ";

});


// delete button //

document.getElementById("deleteButton").addEventListener("click", function() {

    brailleInput.value = brailleInput.value.slice(0, -1);

});
