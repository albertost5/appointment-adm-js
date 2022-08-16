import { appointmentList } from '../selectors.js';
import { editAppointment, deleteAppointment } from '../functions.js';

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

    showAppointments( indexDb ) {
        const objectStore = indexDb.transaction('appointments').objectStore('appointments');
        
        objectStore.openCursor().onsuccess = ( e ) => {
            const cursor = e.target.result;

            if( cursor ) {

                const { brand, owner, telephone, date, time, description, id } = cursor.value;
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

                const appointmentToEdit = cursor.value;

                editBtn.onclick = () => editAppointment( appointmentToEdit );

                appointmentDiv.appendChild( brandTitle );
                appointmentDiv.appendChild( ownerp );
                appointmentDiv.appendChild( telephonep );
                appointmentDiv.appendChild( datep );
                appointmentDiv.appendChild( timep );
                appointmentDiv.appendChild( descriptionp );
                appointmentDiv.appendChild( deleteBtn );
                appointmentDiv.appendChild( editBtn );

                appointmentList.appendChild( appointmentDiv );

                cursor.continue();
            }
        }

        this.clearAppointmentList();
    }

    clearAppointmentList() {
        appointmentList.textContent = '';
    }
}

export default UI;