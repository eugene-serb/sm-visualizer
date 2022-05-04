/* ------------- */
/* SM VISUALIZER */
/* ------------- */

'use strict'

class Support {
    constructor() {
        this.getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
        };
    };
};

class Item {
    constructor(cost) {
        this.cost = cost;
        this.state = '';
    };
};

class Map {
    constructor(container, width) {
        this.container = container;
        this.matrix_width = width;

        this.support = new Support();

        this.matrix = this.generateMatrix(this.matrix_width);
        this.draw();
    };

    copyMatrix = (matrix) => {
        let result = [];
        for (let x = 0; x < matrix.length; x++) {
            result[x] = matrix[x];
        };
        return result;
    };
    generateMatrix = (matrix_width) => {
        let matrix = new Array();
        for (let x = 0; x < matrix_width; x++) {
            matrix[x] = this.#generateItem();
        };
        return matrix;
    };
    #generateItem = () => {
        return new Item(this.support.getRandomInteger(0, 1000));
    };
    draw = () => {
        this.container.innerHTML = '';
        for (let x = 0; x < this.matrix_width; x++) {
            let item = document.createElement('div');
            item.classList.add('item');
            item.innerText = this.matrix[x].cost;
            if (this.matrix[x].state !== '') item.classList.add(this.matrix[x].state);
            this.container.appendChild(item);
        };
    };
};

class Visualizer {
    constructor() {
        this.#configurations();
        this.#DOMs();
        this.#eventListeners();

        this.map = new Map(this.$MAP, this.MATRIX_WIDTH);

        this.inWork = false;
        this.isSorted = false;
    };

    start = () => {
        switch (this.$SELECTOR_METHOD.value) {
            case '0':
                this.sortBubble();
                break;
            case '1':
                this.sortBubbleFlag();
                break;
            case '2':
                this.sortShaker();
                break;
            case '3':
                this.sortGnome();
                break;
            default:
                break;
        };
    };
    async sortBubble(){
        let arr = this.map.copyMatrix(this.map.matrix);

        for (let j = arr.length - 1; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                await this.setState(arr, 'item_focus', i);
                if (arr[i].cost > arr[i + 1].cost) {
                    await this.setState(arr, 'item_swap', i + 1);
                    [arr[i].cost, arr[i + 1].cost] = [arr[i + 1].cost, arr[i].cost];
                    await this.setState(arr, '', i + 1);
                };
                await this.setState(arr, '', i);
            };
            await this.setState(arr, 'item_disabled', j);
        };

        this.inWork = false;
        this.isSorted = true;
        return arr;
    };
    async sortBubbleFlag() {
        let arr = this.map.copyMatrix(this.map.matrix);
        let swapped;

        do {
            swapped = false;
            for (let i = 0; i < arr.length - 1; i++) {
                await this.setState(arr, 'item_focus', i);
                if (arr[i].cost > arr[i + 1].cost) {
                    await this.setState(arr, 'item_swap', i + 1);
                    [arr[i].cost, arr[i + 1].cost] = [arr[i + 1].cost, arr[i].cost];
                    swapped = true;
                    await this.setState(arr, '', i + 1);
                };
                await this.setState(arr, '', i);
            };
        } while (swapped);

        this.inWork = false;
        this.isSorted = true;
        return arr;
    };
    async sortShaker() {
        let arr = this.map.copyMatrix(this.map.matrix);
        let left = 0;
        let right = arr.length - 1;

        do {
            for (let i = left; i < right; i++) {
                await this.setState(arr, 'item_ocus', i);
                if (arr[i].cost > arr[i + 1].cost) {
                    await this.setState(arr, 'item_swap', i + 1);
                    [arr[i].cost, arr[i + 1].cost] = [arr[i + 1].cost, arr[i].cost]
                    await this.setState(arr, '', i + 1);
                };
                await this.setState(arr, '', i);
            };
            await this.setState(arr, 'item_disabled', right);
            right--;
            for (let i = right; left < i; i--) {
                await this.setState(arr, 'item_focus', i);
                if (arr[i].cost < arr[i - 1].cost) {
                    await this.setState(arr, 'item_swap', i);
                    [arr[i].cost, arr[i - 1].cost] = [arr[i - 1].cost, arr[i].cost]
                    await this.setState(arr, '', i);
                };
                await this.setState(arr, '', i);
            };
            await this.setState(arr, 'item_disabled', left);
            left++;
        } while (left < right);

        this.inWork = false;
        this.isSorted = true;
        return arr;
    };
    async sortGnome() {
        let arr = this.map.copyMatrix(this.map.matrix);
        let i = 1;

        while (i < arr.length) {
            await this.setState(arr, 'item_focus', i);
            await this.setState(arr, '', i);
            if (i > 0 && arr[i - 1].cost > arr[i].cost) {
                await this.setState(arr, 'item_focus', i);
                await this.setState(arr, 'item_swap', i - 1);
                [arr[i].cost, arr[i - 1].cost] = [arr[i - 1].cost, arr[i].cost];
                await this.setState(arr, '', i);
                await this.setState(arr, '', i - 1);
                i--;
            } else {
                i++;
            };
        };

        this.inWork = false;
        this.isSorted = true;
        return arr;
    };

    async setState(arr, state, index) {
        await this.sleep(this.SPEED_RATE);
        arr[index].state = state;
        this.map.matrix = this.map.copyMatrix(arr);
        this.map.draw();
        await this.sleep(this.SPEED_RATE);
    };
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    #configurations = () => {
        this.MATRIX_WIDTH = 16;
        this.SPEED_RATE = 100;
    };
    #DOMs = () => {
        this.$SELECTOR_METHOD = document.getElementById('methods');
        this.$BUTTON_SORT = document.getElementById('sort');
        this.$MAP = document.querySelector('.map');
    };
    #eventListeners = () => {
        this.$BUTTON_SORT.addEventListener('click', () => {
            if (this.isSorted === true) {
                this.map.matrix = this.map.generateMatrix(this.map.matrix_width);
                this.map.draw();
                this.isSorted = false;
                this.inWork = false;
            };
            if (this.inWork === false) {
                this.inWork = true;
                this.start();
            };
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const VISUALIZER = new Visualizer();

