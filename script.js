const ff = document.getElementById("1-1");
const fs = document.getElementById("1-2");
const ft = document.getElementById("1-3");
const sf = document.getElementById("2-1");
const ss = document.getElementById("2-2");
const st = document.getElementById("2-3");
const tf = document.getElementById("3-1");
const ts = document.getElementById("3-2");
const tt = document.getElementById("3-3");

const allButtons = [ff, fs, ft, sf, ss, st, tf, ts, tt];
ff.addEventListener("click", selectCellPlayer());

const selectCellPlayer = () => {
    ff.style.backgroundColor = "blue";
}

const selectCellComputer = () => {
}