class Product {
    constructor(Name, Price, Quantity) {
        this.Name = Name;
        this.Price = Price;
        this.Quantity = Quantity;
    }

    updateQuantity(amount) {
        this.Quantity += amount;
    }
}

let products = [];

const addbtn = document.getElementById("addbtn");
const table = document.getElementById("tab");

addbtn.onclick = () => addProduct(display);

function addProduct(callback) {
    let pname = document.getElementById("productname").value.trim();
    let pprice = document.getElementById("productprice").value;
    let pquantity = document.getElementById("productquantity").value;

    if (isNaN(Number(pprice)) || isNaN(Number(pquantity)) || !pname || !pprice || !pquantity) {
        window.alert("Please enter a valid name, price, and quantity.");
        return;
    }

    const price = Number(pprice);
    const quantity = Number(pquantity);

    const existingProduct = products.find(p => p.Name === pname);
    if (existingProduct) {
        existingProduct.updateQuantity(quantity);
    } else {
        const prod = new Product(pname, price, quantity);
        products.push(prod);
    }

    // Clear form fields
    document.getElementById("productname").value = "";
    document.getElementById("productprice").value = "";
    document.getElementById("productquantity").value = "";

    callback();
}

function display() {
    let html = [];
    html.push(`<tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
               </tr>`);

    for (let i of products) {
        html.push(`<tr>
                    <td>${i.Name}</td>
                    <td>$${i.Price.toFixed(2)}</td>
                    <td>${i.Quantity}</td>
                  </tr>`);
    }

    table.innerHTML = html.join('');
}
display();
