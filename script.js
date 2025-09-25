
// testimonial script //
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll('.testimonial');
  let index = 0;

  setInterval(() => {
    testimonials[index].classList.remove('active');
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.add('active');
  }, 4000); // change every 4 seconds
});


// fade function //
  const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -20px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = (window.scrollY > 200) ? "block" : "none";
});

// smooth scroll//
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, 0);
});


// testimonial slide script //
const testimonials = document.querySelectorAll(".testimonial");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  let index = 0;

  function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
      t.classList.remove("active");
      if (idx === i) {
        t.classList.add("active");
      }
    });
  }

  next.addEventListener("click", () => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
  });

  // Show the first testimonial by default
  showTestimonial(index);

// open and close model for meanu //
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Optional: Close modal on background click
window.addEventListener('click', function(e) {
  const modals = document.querySelectorAll('.menu-modal');
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
});



/*
function orderNow(itemName) {
  const phoneNumber = "2348065675035"; // Replace with your WhatsApp number
  const message = `Hello, I’d like to order ${itemName} from your menu.`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
} */



// Add order function //

let orderItems = {}; // Store item name as key, value as { quantity, price }

const orderList = document.getElementById("orderItems");
const countDisplay = document.getElementById("itemCount");
const totalDisplay = document.createElement("p");
totalDisplay.id = "totalAmount";
orderList.parentElement.appendChild(totalDisplay);

const whatsappLink = document.getElementById("whatsappLink");

function addToOrder(itemName, itemPrice) {
  if (orderItems[itemName]) {
    orderItems[itemName].quantity++;
  } else {
    orderItems[itemName] = { quantity: 1, price: itemPrice };
  }
  updateOrderList();
}

function removeFromOrder(itemName) {
  if (orderItems[itemName]) {
    orderItems[itemName].quantity--;
    if (orderItems[itemName].quantity <= 0) {
      delete orderItems[itemName];
    }
    updateOrderList();
  }
}


function updateOrderList() {
  orderList.innerHTML = "";
  let itemCount = 0;
  let total = 0;
  let messageList = [];

  for (let item in orderItems) {
    const { quantity, price } = orderItems[item];
    itemCount += quantity;
    total += quantity * price;
    messageList.push(`${item} (x${quantity}) - ₦${price.toLocaleString()} each = ₦${(price * quantity).toLocaleString()}`);

    const li = document.createElement("li");
    li.classList.add("order-item");


li.innerHTML = `
<div class="item-text">
  <span class="item-name">${item}</span>
  <span class="item-qty">(x${quantity})</span>
  <span class="item-unit-price">– ₦${price.toLocaleString()} each</span>
  <span class="item-total">= ₦${(price * quantity).toLocaleString()}</span>
  </div>
`;

    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Remove";
    undoBtn.classList.add("undo-btn");
    undoBtn.onclick = () => removeFromOrder(item);

    li.appendChild(undoBtn);
    orderList.appendChild(li);
  }

  countDisplay.textContent = itemCount;
  totalDisplay.textContent = `Total: ₦${total.toLocaleString()}`;

  /* Update WhatsApp message
  const message = messageList.join(", ");
  whatsappLink.href = `https://wa.me/2348065675035?text=Hello%2C%20I%20would%20like%20to%20order:%20${encodeURIComponent(message)}.%20Total%20is%20₦${total.toLocaleString()}`;
} */

  // ✅ This is the updated WhatsApp message formatting
  let message = `Hello, I would like to order:\n\n`;

  message += messageList.map(item => `• ${item}`).join('\n\n');

  message += `\n\nTotal is ₦${total.toLocaleString()}`;

  message += `\n\nPlease do not edit this message. Kindly confirm your order directly. Thank you.`;
  
  whatsappLink.href = `https://wa.me/2347040030091?text=${encodeURIComponent(message)}`;
}


function orderNow(itemName, itemPrice) {
  const message = `Hello, I would like to order: ${itemName} (₦${itemPrice.toLocaleString()}) from your menu`;
  window.open(`https://wa.me/2347040030091?text=${encodeURIComponent(message)}`, "_blank");
}

  
// hidden notification function
  function showNotification() {
  const notification = document.getElementById("orderNotification");
  notification.style.display = "block";
  notification.style.opacity = "1";

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.style.display = "none";
    }, 200); // match transition
  }, 500); // how long it stays visible
}


// Add-to-order
function addToOrder(itemName, itemPrice) {
  if (orderItems[itemName]) {
    orderItems[itemName].quantity++;
  } else {
    orderItems[itemName] = { quantity: 1, price: itemPrice };
  }
  updateOrderList();
  showNotification();
}


