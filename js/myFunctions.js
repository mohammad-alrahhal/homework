let addBtn = document.getElementsByTagName("button");
let basketTable = document.getElementsByClassName("basket-table")[0];
let basketRow = document.getElementsByClassName("empty-row")[0];
let taxRow = document.getElementsByClassName("tax-row")[0];
let totalRow = document.getElementsByClassName("total-row")[0];
let buttonsRow = document.getElementsByClassName("buttons-row")[0];
let taxField = document.getElementById("tax-field");
let finalPrice = document.getElementById("final-price");
let confirmButton = document.getElementById("confirm");
let cancelButton = document.getElementById("cancel");
let appNames = document.getElementsByClassName("name");
let appPrices = document.getElementsByClassName("price");
let infoFormHolder = document.getElementsByClassName("form")[0];
let infoForm = document.getElementsByTagName("form")[0];
let nameField = document.getElementById("uname");
let numberField = document.getElementById("unumber");
let phoneField = document.getElementById("phone-number");
let captcha = document.getElementById("captcha");
let captchaVal = document.getElementById("captcha-val");
let buyBtn = document.getElementById("buy-btn");

let tax = 0;
let totalCount = 0;
let counter = 0;
let clickCounters = [];
let totalPrices = 0;
for (let i = 0; i < addBtn.length; i++) {
  clickCounters[i] = 0;
}

for (let i = 0; i < addBtn.length; i++) {
  addBtn[i].onclick = function () {
    clickCounters[i]++;
    if (clickCounters[i] > 1) {
      document.getElementsByClassName("total-count")[counter - 1].textContent =
        clickCounters[i];
      document.getElementsByClassName("total-price")[counter - 1].textContent =
        appPrices[i].textContent * clickCounters[i];
    } else {
      counter++;
      let tr = document.createElement("tr");
      tr.className = "item";
      let countField = document.createElement("td");
      let nameField = document.createElement("td");
      let totalCountField = document.createElement("td");
      totalCountField.className = "total-count";
      let priceField = document.createElement("td");
      let totalPriceField = document.createElement("td");
      totalPriceField.className = "total-price";
      let counterContent = document.createTextNode(counter);
      let nameContent = document.createTextNode(appNames[i].textContent);
      let priceContent = document.createTextNode(appPrices[i].textContent);
      let totalPriceContent = document.createTextNode(appPrices[i].textContent);

      countField.appendChild(counterContent);
      nameField.appendChild(nameContent);
      priceField.appendChild(priceContent);
      totalCountField.appendChild(document.createTextNode(clickCounters[i]));
      totalPriceField.appendChild(totalPriceContent);
      tr.appendChild(countField);
      tr.appendChild(nameField);
      tr.appendChild(priceField);
      tr.appendChild(totalCountField);
      tr.appendChild(totalPriceField);
      basketTable.children[1].appendChild(tr);
      basketTable.children[1].appendChild(basketRow);
      basketTable.children[1].appendChild(taxRow);
      basketTable.children[1].appendChild(totalRow);
      basketTable.children[1].appendChild(buttonsRow);
    }
    tax = tax + (appPrices[i].textContent * 5) / 100;
    taxField.textContent = tax;
    let prices = document.getElementsByClassName("total-price");
    totalPrices = 0;
    for (let i = 0; i < prices.length; i++) {
      totalPrices = totalPrices + parseInt(prices[i].textContent);
    }
    finalPrice.textContent = totalPrices;
  };
}
cancelButton.onclick = function () {
  let items = document.getElementsByClassName("item");
  if (items.length != 0) {
    for (let i = 0; i < clickCounters.length; i++) {
      clickCounters[i] = 0;
    }

    for (let i = 0; ; i++) {
      if (items.length != 0) {
        items[0].remove();
        continue;
      } else break;
    }
    counter = 0;
    tax = 0;
    taxField.textContent = "";
    finalPrice.textContent = "";
    if (infoFormHolder.style.visibility == "visible") {
      infoFormHolder.style.visibility = "hidden";
    }
  }
};
confirmButton.onclick = function () {
  let items = document.getElementsByClassName("item");
  if (items.length != 0) {
    infoFormHolder.style.visibility = "visible";
  } else {
    alert("لم تقم بوضع أي منتجات في السلة");
  }
};
// Captcha code
let lettersAndNumbers =
  "ABCDEFGHIJKLMNOPQRSTUVWXYSabcdefghijklmnopqrstuvwxyz1234567890";
let cCode = "";
for (let i = 0; i < 4; i++) {
  cCode =
    cCode + lettersAndNumbers.charAt(Math.random() * lettersAndNumbers.length);
}
captcha.textContent = cCode;

//Patterns

infoForm.onsubmit = function () {
  let nameVal = nameField.value.search(/^\S+\W+\S+/);
  if (nameVal != 0) {
    alert("أدخل الاسم باللغة العربية فقط");
    nameField.focus();
    return false;
  }
  let numberVal = numberField.value.search(/^(0[1-9]|1[0-4])\d{9}$/);
  if (numberVal != 0) {
    alert("أدخل الرقم الوطني بشكل صحيح");
    numberField.focus();
    return false;
  }
  let phoneVal = phoneField.value.search(/^09[3-9]\d{7}$/);
  if (phoneVal != 0) {
    alert("أدخل رقم الهاتف بشكل صحيح");
    phoneField.focus();
    return false;
  }
  if (captchaVal.value != cCode) {
    alert("أدخل الرمز بشكل صحيح");
    captchaVal.focus();
    return false;
  }
  alert(
    "تمت العملية بنجاح، المبلغ الاجمالي الواجب دفعه هو" +
      "\n" +
      totalPrices +
      "ل.س"
  );
};
