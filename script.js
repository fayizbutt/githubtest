const products = JSON.parse(localStorage.getItem('products')) || [
    {
        image: 'allbirds-sneakers-review-tree-runnerjpg.jpg',
        name: 'Allbirds Sneakers',
        description: 'Comfortable and sustainable sneakers.',
        price: '19.99'
    },
    {
        image: '5.jpg',
        name: 'Nike Air Force',
        description: 'This is another great product.',
        price: '29.99'
    },
    {
        image: '3.jpg',
        name: 'Nike Air Force',
        description: 'This product is also great.',
        price: '39.99'
    },
    {
        image: '6.jpg',
        name: 'Calvin',
        description: 'This product is also great.',
        price: '59.99'
    },
    {
        image: '7.jpg',
        name: 'Nike Force',
        description: 'This product is also great.',
        price: '49.99'
    },
    {
        image: '8.jpg',
        name: 'Nike Force 4',
        description: 'This product is also great.',
        price: '69.99'
    },
    {
        image: '9.jpg',
        name: 'Tommy ',
        description: 'This product is also great.',
        price: '39.99'
    },
    {
        image: '1.jpg',
        name: 'Spidey',
        description: 'This product is also great.',
        price: '89.99'
    },
];

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function generateProductCard(product, index) {
    return `
        <div class="product-card" data-index="${index}">
            <div>
                <img src="${product.image}" alt="Product Image" class="product-image">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
            </div>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            </div>
        </div>
    `;
}



function displayProducts(filteredProducts = products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const productCardHTML = generateProductCard(product, index);
        productContainer.insertAdjacentHTML('beforeend', productCardHTML);
    });
}

function openModal() {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = 'Add Product';
    document.getElementById('cardForm').reset();
    document.getElementById('product-index').value = '';
    document.getElementById('modal-submit-btn').innerText = 'Add Card';
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

document.getElementById('add-product-btn').addEventListener('click', openModal);
document.querySelector('.close').addEventListener('click', closeModal);

document.getElementById('cardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const index = document.getElementById('product-index').value;
    const image = document.getElementById('imgUrl').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const product = { image, name, description, price };

    if (index === '') {
        products.push(product);
    } else {
        products[index] = product;
    }

    saveProductsToLocalStorage(); 
    displayProducts();
    closeModal();
});

function editProduct(index) {
    const product = products[index];
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = 'Edit Product';

    document.getElementById('product-index').value = index;
    document.getElementById('imgUrl').value = product.image;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('modal-submit-btn').innerText = 'Save Changes';
    modal.style.display = 'flex';
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProductsToLocalStorage(); 
    displayProducts();
}


function filterProducts(searchInput) {
    const filteredProducts = products.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.price}`.toLowerCase();
        return searchableText.includes(searchInput.toLowerCase());
    });

    displayProducts(filteredProducts);
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim();
    filterProducts(searchTerm);
});

displayProducts();