async function heapify(ele, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n) {
    comparisons++;
    updateCounter();
    if (parseInt(ele[l].style.height) > parseInt(ele[largest].style.height)) {
      largest = l;
    }
  }

  if (r < n) {
    comparisons++;
    updateCounter();
    if (parseInt(ele[r].style.height) > parseInt(ele[largest].style.height)) {
      largest = r;
    }
  }

  if (largest !== i) {
    swap(ele[i], ele[largest]);
    await waitforme(delay);
    await checkPaused();
    await heapify(ele, n, largest);
  }
}

async function heapSortMain() {
  showInfo("Heap Sort", "O(n log n)", "O(1)", "No");
  const ele = document.querySelectorAll(".bar");
  const n = ele.length;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  // build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(ele, n, i);
  }

  // extract elements
  for (let i = n - 1; i > 0; i--) {
    swap(ele[0], ele[i]);
    ele[i].style.background = "green";
    await waitforme(delay);
    await checkPaused();
    await heapify(ele, i, 0);
  }
  if (ele.length) ele[0].style.background = "green";

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".heapSort").addEventListener("click", heapSortMain);
