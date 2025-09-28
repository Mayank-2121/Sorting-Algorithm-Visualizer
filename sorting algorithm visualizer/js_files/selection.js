async function selectionSort() {
  showInfo("Selection Sort", "O(n²)", "O(1)", "No");
  const bars = document.querySelectorAll(".bar");
  const n = bars.length;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    bars[i].style.background = "blue";

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      updateCounter();
      bars[j].style.background = "blue";

      await waitforme(delay);
      await checkPaused();

      if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
        if (minIdx !== i) bars[minIdx].style.background = "cyan";
        minIdx = j;
        bars[minIdx].style.background = "red"; // temporary mark new min
      } else {
        bars[j].style.background = "cyan";
      }
    }

    await waitforme(delay);
    if (minIdx !== i) {
      swap(bars[minIdx], bars[i]);
      bars[minIdx].style.background = "cyan";
    }
    bars[i].style.background = "green";
  }

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".selectionSort").addEventListener("click", selectionSort);
