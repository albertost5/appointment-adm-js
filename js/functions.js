import UI from './classes/UI.js';
import Appointment from './classes/Appointment.js';
import { form, brandInput, dateInput, descInput, ownerInput, telephoneInput, timeInput } from './selectors.js';


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
const ui = new UI();
const appointment = new Appointment();

// FUNCTIONS
function appointmntData( e ) {
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

export {
    appointmntData,
    addAppointment,
    resetObj,
    deleteAppointment,
    editAppointment
}

