const api = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";
async function getItems() {
  let res = await fetch(api);

  let items = await res.json();

  let list = document.querySelector(".items-list");

  let filterButton = document.querySelector(".nav__button");

  let input = document.querySelector("#filter");

  filterButton.addEventListener("click", function (e) {
    let elements = document.querySelectorAll(".item");
    if (input.value != "") {
      for (const element of elements) {
        if (!element.firstChild.innerHTML.includes(input.value)) {
          element.classList.add("hide");
          // window.location.search = "?=" + input.value;
          e.preventDefault();
        } else {
          element.classList.remove("hide");
        }
      }
    } else {
      elements.forEach(function (element) {
        element.classList.remove("hide");
        // window.location.search = "";
      });
    }
    e.preventDefault();
  });

  for (const key in items) {
    list.innerHTML += `
    <div class='item'><div class='item__title'>${items[key].title}</div>
    <div class='item__body'>${items[key].body}</div>
    <div class='item__checkbox'}><input type='checkbox' id=${items[key].id} ></input></div>
    </div>`;
  }
  let checkboxes = document.querySelectorAll(".item__checkbox");
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", function () {
      const item__parent = checkbox.parentNode;
      if (item__parent.classList.contains("active")) {
        item__parent.classList.remove("active");
      } else {
        item__parent.classList.add("active");
      }
    });
  }
}

getItems();
