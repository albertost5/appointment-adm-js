import Appointment from "../js/classes/Appointment.js";


describe('Testing Appoinment class', () => {

    const appointment = new Appointment();
    const id = 1661616567676;

    it('1. Add new appoinment', () => {
        const appointmentObj = {
            brand: 'BMW',
            owner: 'Alberto',
            telephone: '1234',
            date: '11/11/2022',
            time: '11:11',
            description: 'New car!',
            id
        }

        appointment.newAppointment( appointmentObj );

        expect(appointment).toMatchSnapshot();
    });

    it('2. To delete an appoinment', () => {

        const newAppointment = {
            brand: 'BMW',
            owner: 'Alberto',
            telephone: '1234',
            date: '12/11/2022',
            time: '10:00',
            description: 'First revision!',
            id
        }

        appointment.replaceAppointment( newAppointment );
        
        expect(appointment).toMatchSnapshot();
    });

});