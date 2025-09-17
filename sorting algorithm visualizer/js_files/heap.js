// Heapify function
async function heapify(ele, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    // highlight current node in orange
    ele[i].style.background = "orange";
    if (l < n) ele[l].style.background = "blue";
    if (r < n) ele[r].style.background = "blue";
    await waitforme(delay);

    // check left child
    if (l < n && parseInt(ele[l].style.height) > parseInt(ele[largest].style.height)) {
        largest = l;
    }

    // check right child
    if (r < n && parseInt(ele[r].style.height) > parseInt(ele[largest].style.height)) {
        largest = r;
    }

    // if largest is not root
    if (largest !== i) {
        swap(ele[i], ele[largest]);

        await waitforme(delay);

        // reset colors
        ele[i].style.background = "orange";
        ele[largest].style.background = "orange";

        // recursively heapify affected subtree
        await heapify(ele, n, largest);
    }

    // reset colors after heapify done
    ele[i].style.background = "orange";
    if (l < n) ele[l].style.background = "orange";
    if (r < n) ele[r].style.background = "orange";
}

// Heap Sort function
async function heapSort(ele) {
    let n = ele.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(ele, n, i);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        swap(ele[0], ele[i]);

        // mark as sorted
        ele[i].style.background = "green";
        await waitforme(delay);

        await heapify(ele, i, 0);
    }

    // mark last element as sorted
    ele[0].style.background = "green";
}

// Attach button event
const heapSortbtn = document.querySelector(".heapSort");
console.log("Heap Sort button:", heapSortbtn);

heapSortbtn.addEventListener("click", async function () {
    console.log("Heap Sort button clicked!");
    let ele = document.querySelectorAll(".bar");

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await heapSort(ele);

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
