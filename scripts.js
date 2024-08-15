const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


function OpenNewWindow(page){
  window.location.href = page;
}


document.addEventListener("DOMContentLoaded", function () {
  // Select all the "Book Now" buttons
  const bookButtons = document.querySelectorAll('.book-now');

  bookButtons.forEach(button => {
      button.addEventListener('click', function () {
          // Get the hotel name from the <h2> element
          const hotelName = this.parentElement.querySelector('h2').innerText;

          // Set the hotel name into the input field
          const hotelInputField = document.getElementById('hotel');
          if (hotelInputField) {
              hotelInputField.value = hotelName;
          }

          // Scroll to the input field smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  });
});




document.querySelectorAll('.hotel').forEach(hotel => {
  let slider = hotel.querySelector('.slider .list');
  let items = hotel.querySelectorAll('.slider .list .item');
  let next = hotel.querySelector('.slider .buttons .next');
  let prev = hotel.querySelector('.slider .buttons .prev');
  let dots = hotel.querySelectorAll('.slider .dots li');

  let lengthItems = items.length - 1;
  let active = 0;

  function reloadSlider() {
      slider.style.transform = `translateX(-${active * 100}%)`;
      let last_active_dot = hotel.querySelector('.slider .dots li.active');
      if (last_active_dot) last_active_dot.classList.remove('active');
      dots[active].classList.add('active');
  }

  next.onclick = function () {
      active = (active + 1) % items.length;
      reloadSlider();
  }

  prev.onclick = function () {
      active = (active - 1 + items.length) % items.length;
      reloadSlider();
  }

  let refreshInterval = setInterval(() => { next.click() }, 3000);

  dots.forEach((li, key) => {
      li.addEventListener('click', () => {
          active = key;
          reloadSlider();
      });
  });

  window.onresize = function () {
      reloadSlider();
  };
});



document.getElementById('sort-by').addEventListener('change', filterHotels);

function filterHotels() {
    // Get the selected rating value from the dropdown
    const sortBy = document.getElementById('sort-by').value;
    // Select all hotel elements
    const hotels = document.querySelectorAll('.hotel');

    hotels.forEach(hotel => {
        // Count the number of checked stars in the hotel
        const starElements = hotel.querySelectorAll('.fa-star.checked');
        const stars = starElements.length;

        // Show or hide hotel based on the selected rating
        if (sortBy === 'featured' || sortBy == stars) {
            hotel.style.display = 'block'; // Show hotel
        } else {
            hotel.style.display = 'none'; // Hide hotel
        }
    });
}





WebGLSampler.registerPlugin(ScroolTrigger, ScrollSmoother);

let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
})


function calculatePrice() {
  // Get the selected place
  const placeSelect = document.getElementById('place');
  const selectedPlace = placeSelect.options[placeSelect.selectedIndex];

  // Get the price per person from the selected option's data-price attribute
  const pricePerPerson = parseFloat(selectedPlace.getAttribute('data-price'));

  // Get the number of people
  const numPeople = parseInt(document.getElementById('num-people').value);

  // Calculate the total price
  const totalPrice = pricePerPerson * numPeople;

  // Display the total price in the price input field
  document.getElementById('price').value = `$${totalPrice.toFixed(2)}`;
}


function calculateHotelPrice() {
  // Get the selected hotel
  const hotelSelect = document.getElementById('hotel');
  const selectedHotel = hotelSelect.options[hotelSelect.selectedIndex];

  // Get the price per person from the selected option's data-price attribute
  const pricePerPerson = parseFloat(selectedHotel.getAttribute('data-price'));

  // Get the number of people
  const numPeople = parseInt(document.getElementById('NumPeople').value);

  // Calculate the total price
  const totalPrice = pricePerPerson * numPeople;

  // Display the total price in the price input field
  document.getElementById('price-hotel').value = `$${totalPrice.toFixed(2)}`;
}







// script.js

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === 'hotel' || query === 'hotels') {
        window.location.href = 'hotels.html'; // Redirect to the hotel page
    } else if (query === 'entertainment') {
        window.location.href = 'entertainment.html'; // Redirect to the entertainment page
    } else if (query === 'bookings') {
        window.location.href = 'booking.html'; // Redirect to the bookings page
    } else {
        // Optionally, handle other queries or show an error message
        alert('No results found or invalid input.');
    }
});
