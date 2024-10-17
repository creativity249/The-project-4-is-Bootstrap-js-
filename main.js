let cartCount = 0;
let favoriteCount = 0;
const cartItems = [];
const favoriteItems = [];

// دالة لإضافة المنتجات إلى السلة
function addToCart() {
    const productCard = event.target.parentElement;
    const productName = productCard.querySelector('.card-title').innerText;
    const price = parseFloat(productCard.querySelector('.card-text').getAttribute('price'));
    const quantity = parseInt(productCard.querySelector('.quantity').innerText);
    
    if (quantity <= 0) {
        alert('يرجى إضافة كمية صحيحة للمنتج.');
        return;
    }

    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ name: productName, price: price, quantity: quantity });
    }
    
    cartCount += quantity;
    updateCartCount();
    alert(`${productName} تم إضافته إلى السلة.`);
}

// دالة لإضافة المنتجات إلى المفضلة
function addToFavorites(productName) {
    if (!favoriteItems.includes(productName)) {
        favoriteItems.push(productName);
        favoriteCount++;
        updateFavoriteCount();
        alert(`${productName} تم إضافته إلى المفضلة.`);
    } else {
        alert(`${productName} موجود بالفعل في المفضلة.`);
    }
}

// دالة لتحديث عداد السلة
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.style.display = cartCount > 0 ? 'inline' : 'none';
        element.innerText = cartCount;
    });
} 

// دالة لتحديث عداد المفضلة
function updateFavoriteCount() {
    const favoriteCountElements = document.querySelectorAll('.favorite-count');
    favoriteCountElements.forEach(element => {
        element.style.display = favoriteCount > 0 ? 'inline' : 'none';
        element.innerText = favoriteCount;
    });
}

// دالة لعرض تفاصيل السلة والفاتورة
function showCartDetails() {
    const cartDetails = document.getElementById('cartDetails');
    const totalPriceElement = document.getElementById('totalPrice');
    cartDetails.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartDetails.innerHTML = '<p>لا توجد منتجات في السلة.</p>';
    } else {
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            cartDetails.innerHTML += `
                <div>${item.name} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} جنيهاً سودانياً
                <button onclick="removeFromCart('${item.name}')">حذف</button>
                </div>
            `;
        });
    }

    totalPriceElement.innerText = `الإجمالي: ${totalPrice} جنيهاً سودانياً`;
}

// دالة لعرض المنتجات المفضلة
function showFavoriteItems() {
    if (favoriteItems.length === 0) {
        alert('لا توجد منتجات في المفضلة!');
        return;
    }

    let favoritesList = 'المنتجات المفضلة:\n';
    favoriteItems.forEach(item => {
        favoritesList += `${item}\n`;
    });
    alert(favoritesList);
}

// دالة لزيادة الكمية
function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
}

// دالة لتقليل الكمية
function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const currentQuantity = parseInt(quantityElement.innerText);
    
    if (currentQuantity > 1) {
        quantityElement.innerText = currentQuantity - 1;
    } else if (currentQuantity === 1) {
        const productName = button.parentElement.parentElement.querySelector('.card-title').innerText;
        removeFromCart(productName);
    }
}

// دالة لحذف منتج من السلة
function removeFromCart(productName) {    
    const itemIndex = cartItems.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        cartCount -= cartItems[itemIndex].quantity;
        cartItems.splice(itemIndex, 1);
        updateCartCount();
        alert(`${productName} تم حذفه من السلة.`);
    }
} 

// ربط الأزرار مع الدوال المناسبة
document.querySelector('.navbar-nav .fa-shopping-cart').parentElement.onclick = () => {
    showCartDetails();
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
};

document.querySelector('.navbar-nav .fa-heart').parentElement.onclick = showFavoriteItems;

function filterProducts(selectedCategory) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.style.display = (selectedCategory === 'all' || category === selectedCategory) ? 'block' : 'none';
    });
}

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        card.style.display = (title.includes(input) || description.includes(input)) ? '' : 'none';
    });
}
