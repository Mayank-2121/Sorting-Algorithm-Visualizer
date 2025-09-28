async function insertionSort() {
  showInfo("Insertion Sort", "O(n²)", "O(1)", "Yes");
  const bars = document.querySelectorAll(".bar");
  const n = bars.length;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  if (n === 0) {
    enableSortingBtn(); enableSizeSlider(); enableNewArrayBtn(); return;
  }

  bars[0].style.background = "green";
  for (let i = 1; i < n; i++) {
    let keyHeight = parseInt(bars[i].style.height);
    let keyText = bars[i].innerText;
    let j = i - 1;

    bars[i].style.background = "blue";
    await waitforme(delay);

    while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
      comparisons++;
      updateCounter();
      bars[j].style.background = "blue";
      
      await waitforme(delay);
      await checkPaused();


      // shift element right
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].innerText = bars[j].innerText;
      swaps++;
      updateCounter();

      bars[j].style.background = "cyan";
      j--;
    }
    // insert key
    bars[j + 1].style.height = `${keyHeight}px`;
    bars[j + 1].innerText = keyText;

    // mark sorted segment
    for (let k = 0; k <= i; k++) {
      bars[k].style.background = "green";
    }
    await waitforme(Math.max(5, delay / 2));
  }

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".insertionSort").addEventListener("click", insertionSort);
