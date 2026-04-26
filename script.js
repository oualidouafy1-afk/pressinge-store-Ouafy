let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

/* عرض السلة */
function renderCart(){
    const list = document.getElementById("cartList");
    list.innerHTML = "";
    total = 0;

    if(cart.length === 0){
        list.innerHTML = "<li>السلة فارغة</li>";
        document.getElementById("total").textContent = 0;
        return;
    }

    cart.forEach((item,index)=>{
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price} درهم 
            <button onclick="removeItem(${index})">❌</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* إضافة للسلة */
function addToCart(name,price){
    cart.push({name,price});
    showNotification("تمت إضافة المنتج ✅");
    renderCart();
}

/* حذف منتج */
function removeItem(index){
    cart.splice(index,1);
    showNotification("تم حذف المنتج ❌");
    renderCart();
}

/* تأكيد الطلب */
function confirmOrder(){
    if(cart.length === 0){
        alert("السلة فارغة ❗");
        return;
    }

    showNotification("تم تأكيد الطلب 🎉");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
}

/* إشعارات احترافية */
function showNotification(message){
    let notif = document.createElement("div");
    notif.textContent = message;

    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.background = "#1d0c6d";
    notif.style.color = "white";
    notif.style.padding = "10px 20px";
    notif.style.borderRadius = "8px";
    notif.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
    notif.style.zIndex = "999";

    document.body.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    },2000);
}

/* طلب عبر واتساب */
function orderWhatsApp(){
    if(cart.length === 0){
        alert("السلة فارغة ❗");
        return;
    }

    let message = "طلب جديد:%0A";
    cart.forEach(item=>{
        message += ${item.name} - ${item.price} درهم %0A;
    });
    message += المجموع: ${total} درهم;

    window.open(https://wa.me/212680842460?text=${message},"_blank");
}

/* تحميل السلة عند فتح الموقع */
renderCart();
