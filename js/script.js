"use strict"
const movieSelect = document.querySelector('#movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

populateUI();

let ticketPrice = +movieSelect.value;

// update count and price
const updateSelectedCount = function(){
    const selectedSeats = document.querySelectorAll('.row .selected');
    const seatsIndex = [...selectedSeats].map(seat =>{
        return [...seats].indexOf(seat)
    })
    localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
    count.textContent = selectedSeats.length;
    total.textContent = ticketPrice * selectedSeats.length;
    console.log(seatsIndex);
}

// save selected movie index and price
const setMoviesData = function(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// get data from local storage and update ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1){
            seat.classList.add('selected');
        }
    })}
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// detect change on movieSelect
movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value;
    setMoviesData(e.target.selectedIndex, +e.target.value);
    updateSelectedCount();
})

//handle click on seat
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// first put count and total
updateSelectedCount();