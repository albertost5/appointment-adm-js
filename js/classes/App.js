import { appointmntData, addAppointment } from '../functions.js';
import { brandInput, ownerInput, telephoneInput, dateInput, timeInput, descInput, form } from '../selectors.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        brandInput.addEventListener('input', appointmntData);
        ownerInput.addEventListener('input', appointmntData);
        telephoneInput.addEventListener('input', appointmntData);
        dateInput.addEventListener('input', appointmntData);
        timeInput.addEventListener('input', appointmntData);
        descInput.addEventListener('input', appointmntData);

        form.addEventListener('submit', addAppointment);
    }
}

export default App;