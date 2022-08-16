import UI from './classes/UI.js';
import Appointment from './classes/Appointment.js';
import { form, brandInput, dateInput, descInput, ownerInput, telephoneInput, timeInput } from './selectors.js';

// DB
let DB;
let objectStoreAppointments;
let edit = false;

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
        
        // Update entry in IndexedDb
        const transaction = DB.transaction( ['appointments'], 'readwrite' );
        const objectStore = transaction.objectStore('appointments');
        objectStore.put( appointmentObj );
        
        transaction.oncomplete = () => {      
            ui.showMessage('Appointment edited successfully!');
            document.querySelector('button[type="submit"]').textContent = 'Create Appointment';
        }

        transaction.onerror = () => {
            console.log('There was an error updating the appointment!');
        }

    } else {
        // Add the appointment (add id to be able to do the CRUD)
        appointmentObj.id = Date.now();
        ui.showMessage('Appointment added successfully!');
        appointment.newAppointment( {...appointmentObj} );

        // Insert entry in IndexedDb
        const transaction = DB.transaction( ['appointments'], 'readwrite' );
        
        transaction.oncomplete = () => {
            console.log('Transaction OK!');
        }

        transaction.onerror = () => {
            console.log('Transaction ERROR!');
        }

        const objectStore = transaction.objectStore('appointments');
        objectStore.add( appointmentObj );
    }

    // Reset obj to validate the obj 
    resetObj();

    form.reset();
    console.log(appointment.appointments);
    // Display new appointment
    objectStoreAppointments = DB.transaction('appointments').objectStore('appointments');

    ui.showAppointments( DB );
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
    const transaction = DB.transaction( ['appointments'], 'readwrite' );
    const objectStore = transaction.objectStore('appointments');
    objectStore.delete( appointmentId );
    
    transaction.oncomplete = () => {
        console.log(`Appointment ${ appointmentId} deleted!`);
        ui.showAppointments( DB );
    }

    transaction.onerror = () => {
        console.log('There was an error deleting the entry!');
    }
} 

function editAppointment( appointmentEd ) {
    console.log('appointment to edit => ', appointmentEd);

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

function initDb () {
    const openRequest = indexedDB.open('appointments', 1);
    
    openRequest.onerror = () => {
        console.log('Error creating the DB!');
    }

    openRequest.onsuccess = () => {
        DB = openRequest.result;
        console.log('DB created!', DB);
        // Show appointments
        ui.showAppointments( DB );
    }

    // Executed the first time that is created
    openRequest.onupgradeneeded = ( e ) => {
        const db = e.target.result;

        const objectStore = db.createObjectStore( 'appointments', {
            keyPath: 'id',
            autoIncrement: true
        });

        // Columns
        objectStore.createIndex( 'brand', 'brand', { unique: false } );
        objectStore.createIndex( 'owner', 'owner', { unique: false } );
        objectStore.createIndex( 'telephone', 'telephone', { unique: false } );
        objectStore.createIndex( 'date', 'date', { unique: false } );
        objectStore.createIndex( 'time', 'time', { unique: false } );
        objectStore.createIndex( 'description', 'description', { unique: false } );
        objectStore.createIndex( 'id', 'id', { unique: true });

        console.log('Db created and ready! ');
    }
}

export {
    appointmntData,
    addAppointment,
    resetObj,
    deleteAppointment,
    editAppointment,
    initDb
}

