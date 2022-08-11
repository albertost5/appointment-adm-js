class Appointment {
    constructor() {
        this.appointments = [];
    }

    newAppointment( appointment ) {
        this.appointments = [ ...this.appointments, appointment ];
    }

    replaceAppointment( appointment ) {
        const index = this.appointments.findIndex( appoinmnt => appoinmnt.id === appointment.id );
        this.appointments[ index ] = appointment;
    }
}

export default Appointment;

