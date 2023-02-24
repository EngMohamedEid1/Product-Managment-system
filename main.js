let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let btnMode = "create";

let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#025c02";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#5a0606";
  }
}

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  console.log(btnMode);

  if ((btnMode = "update")) {
    dataPro[tmp] = newPro;
    btnMode = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  } else {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  }
  localStorage.setItem("product", JSON.stringify(dataPro));

  clearData();
  showData();
};

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}

// read data

function showData() {
  let table = "";
  //   tbody.innerHTML = table;

  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr> 
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateItem(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
        

      </tr>`;
    let btnDAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
      btnDAll.innerHTML = `
        <button  onclick="deleteAll()">Delete All </button>
        `;
    } else {
      btnDAll.innerHTML = "";
    }
  }
  tbody.innerHTML = table;
}
showData();

//  update

function updateItem(i) {
  title.value = dataPro[i].title;
  category.value = dataPro[i].category;
  price.value = dataPro[i].price;
  ads.value = dataPro[i].ads;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  count.style.display = "none";
  submit.innerHTML = "Update";

  getTotal();

  btnMode = "update";

  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete

function deleteItem(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
  btnDAll.innerHTML = "";
}

// search

let searchInput = document.getElementById("search");

let searchMode = "title";

function searchBtn(id) {
  searchInput.focus();

  if (id == "searchTitle") {
    searchInput.placeholder = "SEARCH BY TITLE";
    searchMode = "title";
  } else {
    searchInput.placeholder = "SEARCH BY CATEGORY";
    searchMode = "category";
  }
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        console.log(i);
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button id="update" onclick="updateItem(${i})">Update</button></td>
          <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button id="update" onclick="updateItem(${i})">Update</button></td>
          <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
        </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
}
