async function partition(ele, l, r) {
  const pivotVal = parseInt(ele[r].style.height);
  ele[r].style.background = "red"; // pivot
  let i = l - 1;

  for (let j = l; j <= r - 1; j++) {
    comparisons++;
    updateCounter();
    ele[j].style.background = "blue";

    await waitforme(delay);
    await checkPaused();


    if (parseInt(ele[j].style.height) < pivotVal) {
      i++;
      swap(ele[i], ele[j]);
    }
    ele[j].style.background = "cyan";
  }

  swap(ele[i + 1], ele[r]);
  ele[i + 1].style.background = "green";
  ele[r].style.background = "cyan";
  return (i + 1);
}

async function quickSortRecursive(ele, l, r) {
  if (l < r) {
    const pi = await partition(ele, l, r);
    await quickSortRecursive(ele, l, pi - 1);
    await quickSortRecursive(ele, pi + 1, r);
  } else if (l === r) {
    ele[l].style.background = "green";
  }
}

async function quickSortMain() {
  showInfo("Quick Sort", "O(n log n) avg", "O(log n)", "No");
  const ele = document.querySelectorAll(".bar");
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  await quickSortRecursive(ele, 0, ele.length - 1);

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".quickSort").addEventListener("click", quickSortMain);
