// HTML ELEMENTS
const brandInput = document.querySelector('#brand');
const ownerInput = document.querySelector('#owner');
const telephoneInput = document.querySelector('#telephone');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const descInput = document.querySelector('#description');

const form = document.querySelector('#appointment-form');

const appointmentList = document.querySelector('#appointment-list');

// APPOINMENT OBJ
const appointmentObj = {
    brand: '',
    owner: '',
    telephone: '',
    date: '',
    time: '',
    description: ''
}

// CLASSES
class Appointment {
    constructor() {
        this.appointments = [];
    }

    newAppointment( appointment ) {
        this.appointments = [ ...this.appointments, appointment ];
    }
}

class UI {
    showMessage( message, type ) {
        const contentDiv = document.querySelector('#content');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('alert', 'col-12', 'text-center', 'd-block');

        type === 'error'
        ? messageDiv.classList.add('alert-danger')
        : messageDiv.classList.add('alert-success');

        contentDiv.insertBefore( messageDiv, document.querySelector('.add-appointment') );

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    showAppointment( {appointments} ) {

        this.clearAppointmentList();

        appointments.forEach( appointment => {

            const { brand, owner, telephone, date, time, description, id } = appointment;
            const appointmentDiv = document.createElement('div');
            appointmentDiv.classList.add('appointment', 'p-3');
            appointmentDiv.dataset.id = id;

            // Appointment HTML

            const brandTitle = document.createElement('h2');
            brandTitle.textContent = brand;
            brandTitle.classList.add('card-title', 'font-weight-bolder');

            const ownerp = document.createElement('p');
            ownerp.innerHTML = `<span class="font-weight-bolder">Owner: </span>${ owner }`;

            const telephonep = document.createElement('p');
            telephonep.innerHTML = `<span class="font-weight-bolder">Telephone: </span>${ telephone }`;

            const datep = document.createElement('p');
            datep.innerHTML = `<span class="font-weight-bolder">Date: </span>${ date }`;

            const timep = document.createElement('p');
            timep.innerHTML = `<span class="font-weight-bolder">Time: </span>${ time }`;

            const descriptionp = document.createElement('p');
            descriptionp.innerHTML = `<span class="font-weight-bolder">Description: </span>${ description }`;

            

            appointmentDiv.appendChild( brandTitle );
            appointmentDiv.appendChild( ownerp );
            appointmentDiv.appendChild( telephonep );
            appointmentDiv.appendChild( datep );
            appointmentDiv.appendChild( timep );
            appointmentDiv.appendChild( descriptionp );

            appointmentList.appendChild( appointmentDiv );
        });
    }

    clearAppointmentList() {
        appointmentList.textContent = '';
    }
}

const ui = new UI();
const appointment = new Appointment();

// EVENTS
function eventListeners() {
    brandInput.addEventListener('input', carData);
    ownerInput.addEventListener('input', ownerData);
    telephoneInput.addEventListener('input', telephoneData);
    dateInput.addEventListener('input', dateData);
    timeInput.addEventListener('input', timeData);
    descInput.addEventListener('input', descData);

    form.addEventListener('submit', addAppointment);
}


// FUNCTIONS
function carData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function ownerData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function telephoneData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function dateData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function timeData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function descData( e ) {
    appointmentObj[ e.target.name ] = e.target.value;
}

function addAppointment( e ) {
    e.preventDefault();
    
    const { brand, owner, telephone, date, time, description } = appointmentObj;

    if( !brand || !owner || !telephone || !date || !time || !description ) {
        ui.showMessage( 'All fields are required', 'error' );
        return;
    }

    // Add id to make the CRUD
    appointmentObj.id = Date.now();

    // Add the appointment
    appointment.newAppointment( {...appointmentObj} );

    // Reset obj to validate the obj 
    resetObj();

    form.reset();

    // Display new appointment
    ui.showAppointment( appointment );
}

function resetObj() {
    appointmentObj.brand = '';
    appointmentObj.owner = '';
    appointmentObj.telephone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.description = '';
}



eventListeners();

