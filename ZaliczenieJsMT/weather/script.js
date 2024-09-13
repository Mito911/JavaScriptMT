let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let input3 = document.getElementById('input3');
let input4 = document.getElementById('input4');

let sumElement = document.getElementById('sum');
let averageElement = document.getElementById('average')
let minElement = document.getElementById('min');
let maxElement = document.getElementById('max');

let calculateBatton=document.getElementById('calculateBatton')

let calculateBattonFunction =()=>{
    let num1=parseFloat(input1.value) || 0;
    let num2=parseFloat(input2.value) || 0;
    let num3=parseFloat(input3.value) || 0;
    let num4=parseFloat(input4.value) || 0;

    let sum= num1+num2+num3+num4;
    let average=sum/4;
    let min=Math.min(num1,num2,num3,num4);
    let max=Math.max(num1,num2,num3,num4);

    sumElement.textContent=sum;
    averageElement.textContent=average;
    minElement.textContent=min;
    maxElement.textContent=max;
}

function zmientytul(){
    let tytul= document.getElementById('tytul');
    tytul.innerText="Tytuł został zmieniony"
}

calculateBatton.addEventListener('click',calculateBattonFunction);