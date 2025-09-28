async function mergeHelper(ele, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;

  const Lh = [], Ltxt = [];
  const Rh = [], Rtxt = [];

  for (let i = 0; i < n1; i++) {
    Lh.push(ele[l + i].style.height);
    Ltxt.push(ele[l + i].innerText);
  }
  for (let j = 0; j < n2; j++) {
    Rh.push(ele[m + 1 + j].style.height);
    Rtxt.push(ele[m + 1 + j].innerText);
  }

  let i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    comparisons++;
    updateCounter();
    ele[k].style.background = "blue";
    await waitforme(delay);
    await checkPaused();


    if (parseInt(Lh[i]) <= parseInt(Rh[j])) {
      ele[k].style.height = Lh[i];
      ele[k].innerText = Ltxt[i];
      i++;
    } else {
      ele[k].style.height = Rh[j];
      ele[k].innerText = Rtxt[j];
      swaps++;
      updateCounter();
      j++;
    }

    ele[k].style.background = "green";
    k++;
  }

  while (i < n1) {
    ele[k].style.height = Lh[i];
    ele[k].innerText = Ltxt[i];
    ele[k].style.background = "green";
    i++; k++;
    await waitforme(delay / 2);
    await checkPaused();
  }

  while (j < n2) {
    ele[k].style.height = Rh[j];
    ele[k].innerText = Rtxt[j];
    ele[k].style.background = "green";
    j++; k++;
    await waitforme(delay / 2);
    await checkPaused();
  }
}

async function mergeSortRecursive(ele, l, r) {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  await mergeSortRecursive(ele, l, m);
  await mergeSortRecursive(ele, m + 1, r);
  await mergeHelper(ele, l, m, r);
}

async function mergeSort() {
  showInfo("Merge Sort", "O(n log n)", "O(n)", "Yes");
  const ele = document.querySelectorAll(".bar");
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();

  await mergeSortRecursive(ele, 0, ele.length - 1);

  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
}

document.querySelector(".mergeSort").addEventListener("click", mergeSort);
