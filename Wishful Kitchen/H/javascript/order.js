
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeDishButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeDishButtons.length; i++) {
        var button = removeDishButtons[i]
        button.addEventListener('click', removeDishItem)
    }

    var quantityInputs = document.getElementsByClassName('list-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
//coding to add items to order list using click event \\
    var addToListButtons = document.getElementsByClassName('chosen-item-button')
    for (var i = 0; i < addToListButtons.length; i++) {
        var button = addToListButtons[i]
        button.addEventListener('click', addToListClicked)
    }

    document.getElementsByClassName('btn-select')[0].addEventListener('click', selectClicked)
}

function selectClicked() {
    alert('Your order has been placed')
    var listItems = document.getElementsByClassName('list-items')[0]
    while (listItems.hasChildNodes()) {
        listItems.removeChild(listItems.firstChild)
    }
    updateOrderTotal()
}

function removeDishItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateOrderTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateOrderTotal()
}

function addToListClicked(event) {
    var button = event.target
    var chosenItem = button.parentElement.parentElement
    var title = chosenItem.getElementsByClassName('chosen-item-title')[0].innerText
    var price = chosenItem.getElementsByClassName('chosen-item-price')[0].innerText
    var imageSrc = chosenItem.getElementsByClassName('chosen-item-image')[0].src
    addItemToList(title, price, imageSrc)
    updateOrderTotal()
}

function addItemToList(title, price, imageSrc) {
    var listRow = document.createElement('div')
    listRow.classList.add('list-row')
    var listItems = document.getElementsByClassName('list-items')[0]
    var listItemNames = listItems.getElementsByClassName('list-item-title')
    for (var i = 0; i < listItemNames.length; i++) {
        if (listItemNames[i].innerText == title) {
            alert('This dish has already been added to the order list ')
            return
        }
    }
    var listRowContents = `
        <div class="list-item list-column">
            <img class="list-item-image" src="${imageSrc}" width="50" height="50">
            <span class="list-item-title">${title}</span>
        </div>
        <span class="list-price list-column">${price}</span>
        <div class="list-quantity list-column">
            <input class="list-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    listRow.innerHTML = listRowContents
    listItems.append(listRow)
    listRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeDishItem)
    listRow.getElementsByClassName('list-quantity-input')[0].addEventListener('change', quantityChanged)
}
// coding for calculation of total amount i.e adding and removing items price and quantity//
function updateOrderTotal() {
    var listItemContainer = document.getElementsByClassName('list-items')[0]
    var listRows = listItemContainer.getElementsByClassName('list-row')
    var total = 0
    for (var i = 0; i < listRows.length; i++) {
        var listRow = listRows[i]
        var priceElement = listRow.getElementsByClassName('list-price')[0]
        var quantityElement = listRow.getElementsByClassName('list-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('list-total-price')[0].innerText = '$' + total
}