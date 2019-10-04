module.exports = {
    createTwilio: async (req, res) => {
        router.render('appointments/create', {
            timeZones: getTimeZones(),
            appointment: new Appointment({name: '',
                                        phoneNumber: '',
                                        notification: '',
                                        timeZone: '',
                                        time: ''})});
    } 
}