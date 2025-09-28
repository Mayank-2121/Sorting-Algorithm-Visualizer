async function bubbleSort() {
  showInfo("Bubble Sort", "O(n²)", "O(1)", "Yes");
  const bars = document.querySelectorAll(".bar");
  const n = bars.length;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      updateCounter();
      bars[j].style.background = "blue";
      bars[j + 1].style.background = "blue";

      await waitforme(delay);
      await checkPaused();


      const h1 = parseInt(bars[j].style.height);
      const h2 = parseInt(bars[j + 1].style.height);
      if (h1 > h2) {
        swap(bars[j], bars[j + 1]);
      }

      bars[j].style.background = "cyan";
      bars[j + 1].style.background = "cyan";
    }
    bars[n - 1 - i].style.background = "green";
  }
  if (bars.length) bars[0].style.background = "green";

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".bubbleSort").addEventListener("click", bubbleSort);
