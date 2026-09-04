// dictionary //
const braille = {

    // letters //
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

    // numbers //
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

    // punctuation //
    "⠲": ".",
    "⠂": ",",
    "⠦": "?",
    "⠖": "!",
    "⠄": "'",
    "⠒": ":",
    "⠆": ";",
    "⠤": "-",

    // common symbols //
    "⠈⠁": "@",
    "⠼": "#",
    "⠬": "+",
    "⠨⠅": "=",
    "⠌": "/",
    "⠔": "*",
    "⠨⠴": "%",

    // space //
    " ": " "
};

//translation output//
document.getElementById("translateButton").addEventListener("click", function() {

    const input = document.getElementById("brailleInput").value;

    let result = "";

    for (let character of input) {

        if (character === " ") {
            result += " ";
        } else if (braille[character]) {
            result += braille[character];
        } else {
            document.getElementById("result").textContent =
                "Please enter Braille characters.";
            return;
        }
    }

    document.getElementById("result").textContent = result;
});


//read aloud//
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

//text expansion//
const input = document.getElementById("brailleInput");

input.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});