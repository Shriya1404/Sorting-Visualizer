let array = [];
const container = document.getElementById("array-container");

function generateArray(num=10){
    container.innerHTML = "";
    array = [];

    for(let i = 0; i < num; i++){
        let value = Math.floor(Math.random()*200)+20;
        array.push(value);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    }
}
//bubble sorting
async function bubbleSort(){
    let bars = document.getElementsByClassName("bar");

    for(let i = 0; i < array.length - 1; i++){
        for(let j = 0;j < array.length - i - 1; j++ ){
            bars[j].classList.add("comparing");
            bars[j + 1].classList.add("comparing");

            await sleep(300);

            if(array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;

                bars[j].classList.remove("comparing");
                bars[j + 1].classList.remove("comparing");
                bars[j].classList.add("swapped");
                bars[j + 1].classList.add("swapped");

                await sleep(300);

                bars[j].classList.remove("swapped");
                bars[j + 1].classList.remove("swapped");
            }else{
                bars[j].classList.remove("comparing");
            bars[j + 1].classList.remove("comparing");
            }
        }
        bars[array.length - i - 1].classList.add("sorted");
    }
    bars[0].classList.add("sorted");
}
//selection sorting
async function selectionSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("comparing");

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("comparing");
            await sleep(300);
            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove("comparing");
                minIndex = j;
                bars[minIndex].classList.add("comparing");
            } else {
                bars[j].classList.remove("comparing");
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;

            bars[i].classList.add("swapped");
            bars[minIndex].classList.add("swapped");

            await sleep(400);

            bars[i].classList.remove("swapped");
            bars[minIndex].classList.remove("swapped");
        }

        bars[minIndex].classList.remove("comparing");
        bars[i].classList.add("sorted");
    }
}


//insertion sort
async function insertionSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("comparing");
        await sleep(300);

        while (j >= 0 && array[j] > key) {
            bars[j].classList.add("comparing");
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;

            await sleep(300);
            bars[j].classList.remove("comparing");
            j--;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].classList.remove("comparing");

        // Add swapped color
        bars[j + 1].classList.add("swapped");
        await sleep(300);
        bars[j + 1].classList.remove("swapped");
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].classList.add("sorted");
        await sleep(60);
    }
}

//merge sort
async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;
    let bars = document.getElementsByClassName("bar");

    while (i < left.length && j < right.length) {
        bars[k].classList.add("comparing");
        await sleep(300);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            bars[k].style.height = `${left[i]}px`;
            i++;
        } else {
            array[k] = right[j];
            bars[k].style.height = `${right[j]}px`;
            j++;
        }

        bars[k].classList.remove("comparing");
        bars[k].classList.add("swapped");
        await sleep(100);
        bars[k].classList.remove("swapped");
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = `${left[i]}px`;
        bars[k].classList.add("swapped");
        await sleep(100);
        bars[k].classList.remove("swapped");
        i++; k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = `${right[j]}px`;
        bars[k].classList.add("swapped");
        await sleep(100);
        bars[k].classList.remove("swapped");
        j++; k++;
    }

    for (let x = start; x <= end; x++) {
        bars[x].classList.add("sorted");
    }
}

//quick sort
async function quickSort(start = 0, end = array.length - 1) {
    if (start < end) {
        let pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    } else if (start === end) {
        document.getElementsByClassName("bar")[start].classList.add("sorted");
    }
}

async function partition(start, end) {
    let pivot = array[end];
    let pivotIndex = start;
    let bars = document.getElementsByClassName("bar");

    bars[end].classList.add("comparing");

    for (let i = start; i < end; i++) {
        bars[i].classList.add("comparing");
        await sleep(300);

        if (array[i] < pivot) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];

            bars[i].style.height = `${array[i]}px`;
            bars[pivotIndex].style.height = `${array[pivotIndex]}px`;

            bars[i].classList.add("swapped");
            bars[pivotIndex].classList.add("swapped");

            await sleep(300);
            bars[i].classList.remove("swapped");
            bars[pivotIndex].classList.remove("swapped");

            pivotIndex++;
        }

        bars[i].classList.remove("comparing");
    }

    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex]}px`;
    bars[end].style.height = `${array[end]}px`;

    bars[pivotIndex].classList.add("swapped");
    await sleep(300);
    bars[pivotIndex].classList.remove("swapped");
    bars[end].classList.remove("comparing");

    bars[pivotIndex].classList.add("sorted");

    return pivotIndex;
}

//heap sort
async function heapSort() {
    let n = array.length;
    let bars = document.getElementsByClassName("bar");

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        // Swap root with end
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0]}px`;
        bars[i].style.height = `${array[i]}px`;

        // Animate swap
        bars[0].classList.add("swapped");
        bars[i].classList.add("swapped");
        await sleep(400);
        bars[0].classList.remove("swapped");
        bars[i].classList.remove("swapped");

        bars[i].classList.add("sorted");

        // Re-heapify root
        await heapify(i, 0);
    }

    bars[0].classList.add("sorted"); // Mark final bar
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let bars = document.getElementsByClassName("bar");

    if (left < n) {
        bars[left].classList.add("comparing");
        await sleep(300);
        if (array[left] > array[largest]) {
            largest = left;
        }
        bars[left].classList.remove("comparing");
    }

    if (right < n) {
        bars[right].classList.add("comparing");
        await sleep(300);
        if (array[right] > array[largest]) {
            largest = right;
        }
        bars[right].classList.remove("comparing");
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[largest].style.height = `${array[largest]}px`;

        bars[i].classList.add("swapped");
        bars[largest].classList.add("swapped");
        await sleep(400);
        bars[i].classList.remove("swapped");
        bars[largest].classList.remove("swapped");

        await heapify(n, largest);
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = () => generateArray();


/*.comparing → Yellow during comparisons
.swapped → Pink/purple during swaps
.sorted → Blue/green when fixed in place*/