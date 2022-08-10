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

    replaceAppointment( appointment ) {
        console.log(appointment.id);
        console.log(this.appointments[0]);
        const index = this.appointments.findIndex( appoinmnt => appoinmnt.id === appointment.id );
        this.appointments[ index ] = appointment;
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

    showAppointments( {appointments} ) {

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

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'mr-2');
            deleteBtn.innerHTML = `
                Delete 
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `; 

            deleteBtn.onclick = () => deleteAppointment( id );

            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-info');
            editBtn.innerHTML = `
                Edit
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
            `;

            editBtn.onclick = () => editAppointment( appointment );

            appointmentDiv.appendChild( brandTitle );
            appointmentDiv.appendChild( ownerp );
            appointmentDiv.appendChild( telephonep );
            appointmentDiv.appendChild( datep );
            appointmentDiv.appendChild( timep );
            appointmentDiv.appendChild( descriptionp );
            appointmentDiv.appendChild( deleteBtn );
            appointmentDiv.appendChild( editBtn );

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
    
    // Appointment Object
    const { brand, owner, telephone, date, time, description, id } = appointmentObj;
    
    if( !brand || !owner || !telephone || !date || !time || !description ) {
        ui.showMessage( 'All fields are required', 'error' );
        return;
    }
    
    // Edit appointment (it could be done using a global variable);
    if( document.querySelector('button[type="submit"]').textContent === 'Save changes' ) {
        appointment.replaceAppointment( {...appointmentObj} );
        ui.showMessage('Appointment edited successfully!');
        document.querySelector('button[type="submit"]').textContent = 'Create Appointment';
    } else {
        // Add the appointment (add id to be able to do the CRUD)
        appointmentObj.id = Date.now();
        ui.showMessage('Appointment added successfully!');
        appointment.newAppointment( {...appointmentObj} );
    }

    // Reset obj to validate the obj 
    resetObj();

    form.reset();
    console.log(appointment.appointments);
    // Display new appointment
    ui.showAppointments( appointment );
}

function resetObj() {
    appointmentObj.brand = '';
    appointmentObj.owner = '';
    appointmentObj.telephone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.description = '';
}

function deleteAppointment( appointmentId ) {
    appointment.appointments = appointment.appointments.filter( appointmnt => appointmnt.id !== appointmentId );
    document.querySelector(`[data-id="${appointmentId}"]`).remove();
    ui.showMessage('Appointment deleted successfully!');
} 

function editAppointment( appointmentEd ) {
    const { brand, owner, telephone, date, time, description, id } = appointmentEd;
    
    brandInput.value = brand;
    ownerInput.value = owner;
    telephoneInput.value = telephone;
    dateInput.value = date;
    timeInput.value = time;
    descInput.value = description;

    document.querySelector('button[type="submit"]').textContent = 'Save changes';
    
    // Appointment Object
    appointmentObj.brand = brand;
    appointmentObj.owner = owner;
    appointmentObj.telephone = telephone;
    appointmentObj.date = date;
    appointmentObj.time = time;
    appointmentObj.description = description;
    appointmentObj.id = id;
}


eventListeners();

