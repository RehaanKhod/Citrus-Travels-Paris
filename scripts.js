//image slider/gallery slider
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

//function to open a new page upon a click of a button
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


//function to get certain hotel from star ratings
document.getElementById('sort-by').addEventListener('change', filterHotels);
function filterHotels() {
    const sortBy = document.getElementById('sort-by').value;
    const hotels = document.querySelectorAll('.hotel');
    hotels.forEach(hotel => {
        const starElements = hotel.querySelectorAll('.fa-star.checked');
        const stars = starElements.length;
        if (sortBy === 'featured' || sortBy == stars) {
            hotel.style.display = 'block'; 
        } else {
            hotel.style.display = 'none'; 
        }
    });
}




//smooth scrolling
WebGLSampler.registerPlugin(ScroolTrigger, ScrollSmoother);
let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
})

//function to get total price of an entertainment place
function calculatePrice() {
  const placeSelect = document.getElementById('place');
  const selectedPlace = placeSelect.options[placeSelect.selectedIndex];
  const pricePerPerson = parseFloat(selectedPlace.getAttribute('data-price'));
  const numPeople = parseInt(document.getElementById('num-people').value);
  const totalPrice = pricePerPerson * numPeople;
  document.getElementById('price').value = `$${totalPrice.toFixed(2)}`;
}


function calculateHotelPrice() {
  const hotelSelect = document.getElementById('hotel');
  const selectedHotel = hotelSelect.options[hotelSelect.selectedIndex];
  const pricePerPerson = parseFloat(selectedHotel.getAttribute('data-price'));
  const numPeople = parseInt(document.getElementById('NumPeople').value);
  const totalPrice = pricePerPerson * numPeople;
  document.getElementById('price-hotel').value = `$${totalPrice.toFixed(2)}`;
}


//function for search bar
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === 'hotel' || query === 'hotels') {
        window.location.href = 'hotels.html';
    } else if (query === 'entertainment') {
        window.location.href = 'entertainment.html';
    } else if (query === 'bookings') {
        window.location.href = 'booking.html'; 
    } else {
        alert('No results found or invalid input.');
    }
});


  
  function sanitizeId(id) {
    return id.toLowerCase()
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '') 
            .replace(/[^a-z0-9]+/g, '-') 
            .replace(/^-|-$/g, ''); 
}

function handleSearch() {
    const input = document.getElementById("searchInput").value.trim();
    const encodedInput = sanitizeId(input);

    if (input === '') return;

    const searchMap = {
        'hotels': 'hotels.html',
        'entertainment': 'entertainment.html',
        'booking': 'booking.html',
        'hyatt-regency-paris-étoile': 'hotels.html#hyatt-regency-paris-étoile',
        'hotel-lutetia': 'hotels.html#hôtel-lutetia',
        'bulgari-hotel-paris': 'hotels.html#bulgari-hotel-paris',
        'cheval-blanc-paris': 'hotels.html#cheval-blanc-paris',
        'hotel-peyris-opera': 'hotels.html#hotel-peyris-opera',
        'four-seasons-hotel-george-v': 'hotels.html#four-seasons-hotel-george-v',
        'shangri-la-paris': 'hotels.html#shangri-la-paris',
        'la-reserve': 'hotels.html#la-reserve',
        'grand-hotel-nouvel-opera': 'hotels.html#grand-hôtel-nouvel-opéra',
        'ibis-budget-paris-porte-de-montmartre': 'hotels.html#ibis-budget-paris-porte-de-montmartre',
        'hotel-phenix': 'hotels.html#hotel-phenix',
        'hotel-f1': 'hotels.html#hotel-f1',
        'tour-eiffel': 'entertainment.html#tour-eiffel',
        'l-arc-de-triomphe-de-l-etoile': 'entertainment.html#l-arc-de-triomphe-de-l-etoile',
        'the-louvre': 'entertainment.html#the-louvre',
        'sacre-coeur': 'entertainment.html#sacre-coeur',
        'cathedrale-notre-dame-de-paris': 'entertainment.html#cathedrale-notre-dame-de-paris',
        'disneyland': 'entertainment.html#disneyland',
        'musee-d-orsay': 'entertainment.html#musee-d-orsay',
        'palace-of-versailles': 'entertainment.html#palace-of-versailles',
        'musee-de-l-orangerie': 'entertainment.html#musee-de-l-orangerie',
        'palais-garnier': 'entertainment.html#palais-garnier',
        'paris-theatre': 'entertainment.html#paris-theatre',
        'salle-richelieu': 'entertainment.html#salle-richelieu',
        'concerts': 'entertainment.html#concerts'
    };

    const targetUrl = searchMap[encodedInput] || '';
    if (targetUrl) {
        if (targetUrl.includes('#')) {
            window.location.href = targetUrl;
            setTimeout(() => {
                document.querySelector(targetUrl.split('#')[1]).scrollIntoView({ behavior: 'smooth' });
            }, 100); 
        } else {
            window.location.href = targetUrl;
        }
    }
}


