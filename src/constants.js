const constants = {
    alert:{
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Todos los datos tienen que estar rellenos ",
          },
    urlsApi:{
        baseUrl:'http://vps-b0e4feec.vps.ovh.net:8000/api/',
        calendar:'calendar/',
        mail:'sendMail/',
        vaccines:'vaccines/',
        lastVaccine:'lastVaccine/',
        vaccine:'vaccine/',
        dog:'dog/',
        showDog:'showDog/',
        
    },
    routes:{
        dashboard:'/',
        editVaccines:'/editvaccines',
        edit:'/edit',
        
    },
    urlPhoto:'http://vps-b0e4feec.vps.ovh.net/Puppys'
}
export default constants;