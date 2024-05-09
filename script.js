const arrow_right = document.getElementById("arrow-right");
const answer = document.getElementById("answer");
const balao = document.getElementById("balao");
const form = document.getElementById("form");

let final_answer = [];
let count = 0;

let row = 0;
let column = 0;

const clickInput = () => {
  arrow_right.classList.toggle("right-0");
  arrow_right.classList.toggle("-right-2");
  arrow_right.classList.toggle("scale-105");
};

const closeBalloon = (rowB, columnB, countB) => {
  let balloon = document.getElementById(
    `${rowB.toString() + columnB.toString()}`
  );

  balloon.classList.remove("scale-100");
  balloon.classList.remove("opacity-95");
  balloon.classList.add("opacity-0");
  balloon.classList.add("scale-0");
  balloon.innerHTML = "";

  final_answer.splice(countB, 1);

  row = 0;
  column = 0;
  count = 0;
};

const addJob = () => {
  const childDivs = balao.querySelectorAll(".balao-row");

  if (answer.value.length > 0) {
    if (row <= 2) {
      if (column <= 2) {
        let balloons = childDivs[row].querySelectorAll(".balao-column");
        if (balloons[column].innerHTML.length < 1) {
          final_answer.splice(count, 0, answer.value.toString());
          balloons[
            column
          ].innerHTML += `<span class="truncate">${answer.value.toString()}</span>`;
          balloons[
            column
          ].innerHTML += `<div onClick="closeBalloon(${row}, ${column}, ${count})" class="absolute cursor-pointer right-2 top-1 text-sm">x</div>`;
          balloons[column].classList.remove("opacity-0");
          balloons[column].classList.remove("scale-0");
          balloons[column].classList.add("opacity-95");
          balloons[column].classList.add("scale-100");
          balloons[column].id = row.toString() + column.toString();

          column++;
          count++;
          if (column > 2) {
            row++;
            column = 0;
          }

          answer.value = "";
          console.log(final_answer);
        } else {
          column++;
          count++;
          if (column > 2) {
            row++;
            column = 0;
          }
          addJob();
        }
      } else {
        console.log("error math");
      }
    } else {
      answer.value = "";
      alert("quantidade máxima atingida");
      return false;
    }
  } else {
    console.log(answer.value);
  }
};

function checkEnter() {
  addJob();
  return false;
}

const concluir = () => {
  if (final_answer.length == 9) {
    try {
      console.log(JSON.stringify(final_answer));
      alert(final_answer.length);
    } catch (e) {
      alert(e);
    }
  } else {
    alert("Quantidade inválida. Insira mais opções!");
    return false;
  }
};
