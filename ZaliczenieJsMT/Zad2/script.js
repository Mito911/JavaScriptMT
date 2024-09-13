let activeSlideNumber = 1;

let arrowLeft = document.querySelector('#prev');
let arrowRight = document.querySelector('#next');

let dot1 = document.querySelector('#dot1');
let dot2 = document.querySelector('#dot2');
let dot3 = document.querySelector('#dot3');
let dot4 = document.querySelector('#dot4');

let picture1 = document.querySelector('#picture1');
let picture2 = document.querySelector('#picture2');
let picture3 = document.querySelector('#picture3');
let picture4 = document.querySelector('#picture4');

let hideActiveSlide = () => {
    let activeElement = document.querySelector('.active');
    if (activeElement) {
        activeElement.classList.remove('active'); 
    }
};

let showSlide = (slideNumber) => {
    hideActiveSlide();
    document.querySelector('#picture' + slideNumber).classList.add('active');
};

let dot1Function = () => {
    activeSlideNumber = 1;
    showSlide(1);
};

let dot2Function = () => {
    activeSlideNumber = 2;
    showSlide(2);
};

let dot3Function = () => {
    activeSlideNumber = 3;
    showSlide(3);
};

let dot4Function = () => {
    activeSlideNumber = 4;
    showSlide(4);
};

dot1.addEventListener('click', dot1Function);
dot2.addEventListener('click', dot2Function);
dot3.addEventListener('click', dot3Function);
dot4.addEventListener('click', dot4Function);

let arrowRightFunction = () => {
    if (activeSlideNumber === 4) { 
        activeSlideNumber = 1;
    } else {
        activeSlideNumber += 1;
    }
    showSlide(activeSlideNumber);
};

let arrowLeftFunction = () => {
    if (activeSlideNumber === 1) {
        activeSlideNumber = 4; 
    } else {
        activeSlideNumber -= 1;
    }
    showSlide(activeSlideNumber);
};

arrowRight.addEventListener('click', arrowRightFunction);
arrowLeft.addEventListener('click', arrowLeftFunction);

