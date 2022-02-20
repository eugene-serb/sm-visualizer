getChunk();

let field = document.getElementById('field');

function cleanField() {
    field.innerHTML = '';
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function getRandomArbitrary() {
    let min = 0;
    let max = 255;

    return Math.random() * (max - min) + min;
};

async function getChunk() {
    for (let i = 0; i < 8; i++) {
        let chunk = document.createElement('div');
        chunk.className = 'chunk';
        chunk.id = 'chunk-' + i;
        let content = Math.trunc(getRandomArbitrary()).toString();
        chunk.innerHTML = `<span>${content}</span>`;

        let field = document.getElementById('field');
        field.append(chunk);

        await sleep(1);
    }
};

async function sort() {
    let method = document.getElementById('methods');

    switch (method.value) {
        case 'Bubble-1':
            for (let i = 0; i < 1; i++) {
                bubbleIJ().then(console.log(`${i}`));
                await sleep(100);
            }
            break;
        case 'Bubble-2':
            for (let i = 0; i < 1; i++) {
                bubbleFlag().then(console.log(`${i}`));
                await sleep(100);
            }
            break;
        case 'Shaker':
            for (let i = 0; i < 1; i++) {
                shakerSort().then(console.log(`${i}`));
                await sleep(100);
            }
            break;
        case 'Gnome':
            for (let i = 0; i < 1; i++) {
                gnomeSort().then(console.log(`${i}`));
                await sleep(100);
            }
            break;
        default:
            break;
    }
};

async function gnomeSort() {
    let arr = field.children;
    let l = arr.length;
    let i = 1;

    while (i < l) {

        await sleep(100);
        arr[i].classList.toggle('focus');
        await sleep(100);
        arr[i].classList.toggle('focus');
        await sleep(100);

        if (i > 0 && +arr[i - 1].children[0].innerText > +arr[i].children[0].innerText) {
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
            await sleep(500);
            arr[i - 1].classList.toggle('focusSwap');
            await sleep(500);
            [arr[i].children[0].innerText, arr[i - 1].children[0].innerText] = [arr[i - 1].children[0].innerText, arr[i].children[0].innerText];
            arr[i - 1].classList.toggle('focusSwap');
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
            i--;
        } else {
            i++;
        }
    }
};

async function shakerSort() {
    let arr = field.children;
    let left = 0;
    let right = arr.length - 1;

    do {
        for (let i = left; i < right; i++) {
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
            if (+arr[i].children[0].innerText > +arr[i + 1].children[0].innerText) {
                await sleep(500);
                arr[i + 1].classList.toggle('focusSwap');
                await sleep(500);
                [arr[i].children[0].innerText, arr[i + 1].children[0].innerText] = [arr[i + 1].children[0].innerText, arr[i].children[0].innerText];
                arr[i + 1].classList.toggle('focusSwap');
            }
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
        }

        arr[right].classList.toggle('disabled');
        right--;

        for (let i = right; left < i; i--) {
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
            if (+arr[i].children[0].innerText < +arr[i - 1].children[0].innerText) {
                await sleep(500);
                arr[i - 1].classList.toggle('focusSwap');
                await sleep(500);
                [arr[i].children[0].innerText, arr[i - 1].children[0].innerText] = [arr[i - 1].children[0].innerText, arr[i].children[0].innerText];
                arr[i - 1].classList.toggle('focusSwap');
            }
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
        }

        arr[left].classList.toggle('disabled');
        left++;

    } while (left < right);
};

async function bubbleIJ() {
    let arr = field.children;

    for (let j = arr.length - 1; j >= 0; j--) {

        for (let i = 0; i < j; i++) {
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);

            if (+arr[i].children[0].innerText > +arr[i + 1].children[0].innerText) {
                await sleep(500);
                arr[i + 1].classList.toggle('focusSwap');
                await sleep(500);
                let temp = arr[i].children[0].innerText;
                arr[i].children[0].innerText = arr[i + 1].children[0].innerText;
                arr[i + 1].children[0].innerText = temp;
                arr[i + 1].classList.toggle('focusSwap');
            }
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
        }

        await sleep(100);
        arr[j].classList.toggle('disabled');
    }

    arr.classList.toggle('disabled');
};

async function bubbleFlag() {
    let swapped;

    do {
        swapped = false;
        let field = document.getElementById('field');
        let arr = field.children;

        for (let i = 0; i < arr.length - 1; i++) {
            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);

            if (+arr[i].children[0].innerText > +arr[i + 1].children[0].innerText) {
                await sleep(500);
                arr[i + 1].classList.toggle('focusSwap');
                await sleep(500);
                let temp = arr[i].children[0].innerText;
                arr[i].children[0].innerText = arr[i + 1].children[0].innerText;
                arr[i + 1].children[0].innerText = temp;
                swapped = true;
                arr[i + 1].classList.toggle('focusSwap');
            }

            await sleep(100);
            arr[i].classList.toggle('focus');
            await sleep(100);
        }

    } while (swapped);
};

// for example below. we can use it throw console

function sortThis() {
    let forSort = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    forSort = exampleGnomeSort(forSort);
};

function exampleBubbleIJ(arr) {
    for (let j = arr.length; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        console.log(arr);
    }
};

function exampleBubbleFlag(arr) {
    let swapped;

    do {
        swapped = false;
        console.log(arr);

        arr.forEach((item, index) => {
            if (item > arr[index + 1]) {
                let temp = item;
                arr[index] = arr[index + 1];
                arr[index + 1] = temp;
                swapped = true;
            }
        });

    } while (swapped);
};

function exampleShakerSort(array) {

    console.log('first array :', array);

    let left = 0; //начало массива
    let right = array.length - 1; //конец массива

    do {
        for (let i = left; i < right; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]]
            }
        }

        console.log('array :', array);
        right--;

        for (let i = right; left < i; i--) {
            if (array[i] < array[i - 1]) {
                [array[i], array[i - 1]] = [array[i - 1], array[i]]
            }
        }

        console.log('array :', array);
        left++;

    } while (left < right);

    console.log('array :', array);
    return array;
};

const exampleGnomeSort = arr => {
    const l = arr.length;
    let i = 1;
    while (i < l) {
        if (i > 0 && arr[i - 1] > arr[i]) {
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            i--;
        } else {
            i++;
        }
    }

    console.log(arr);
    return arr;
};

