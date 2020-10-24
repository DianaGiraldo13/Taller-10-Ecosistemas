
const inputidregistrar= document.getElementById("inputidregistrar")
const inputnombreid=document.getElementById("inputnombreid")
const registrarboton= document.getElementById("registrarboton")
const inputidvotar= document.getElementById("inputidvotar")
const votarboton= document.getElementById("votarboton")
const vercandidatosboton= document.getElementById("vercandidatosboton")
const vervotacionesboton= document.getElementById("vervotacionesboton")
const database=firebase.database();



let registrar=()=>{
    
    var id=inputidregistrar.value;
    var nombre=inputnombreid.value;
    var nuevo=true;

    database.ref('candidatos').on('value',function(data){
        data.forEach(function(C){
            let candidato=C.val();
            let idcandidato=candidato.idc;
            if(idcandidato===id){
                nuevo=false;
                console.log(nuevo)

            }


        })
        

        
       

    })

   
    if(nuevo){
        let Candidato= {
            idc:id,
            nombrecandidato:nombre
        }
        database.ref("candidatos").push().set(Candidato)

    }
    else{
        alert("Este candidato ya esta registrado")
        
    }
}




let votar=()=>{
    var idvoto=inputidvotar.value
    var key;
    var existe=false;
    database.ref('candidatos').on('value',function(data){
        data.forEach(function(C){
            let candidato=C.val();
            let idcandidato=candidato.idc;
            if(idcandidato===idvoto){
                existe=true;
                key=C.key;
               

            }



        })
        

        
       

    })
    if(existe){
        let voto={
            id:idvoto
            
        }
        database.ref('candidatos').child(key).child('votos').push().set(voto);
        database.ref('votos').push().set(voto);
    }

    else{
        alert("Id invalido,no existe ningun candidato")
    }


    

}
let vercandidatos=()=>{
    let arraylistacandidatos=[];
    database.ref('candidatos').on('value',function(data){
        data.forEach(function(C){
            let candidato=C.val();
           arraylistacandidatos.push(candidato.idc+" "+candidato.nombrecandidato)
          


        })
        

        
       

    })
    alert(arraylistacandidatos)


}
let vervotaciones=()=>{
    let arrayvotaciones=[];
    let votostotales;
    database.ref('votos').on('value',function(C){
       votostotales=C.numChildren()
        console.log(votostotales)

    })
    database.ref('candidatos').on('value',function(data){
        data.forEach(function(C){
            let candidato=C.val();
           database.ref('candidatos').child(C.key).child('votos').on('value',function(C){
            arrayvotaciones.push(candidato.nombrecandidato+" "+C.numChildren()/votostotales*100)
           })


        })
        

        
       

    })

   alert(arrayvotaciones)
}


















registrarboton.addEventListener('click',registrar)
votarboton.addEventListener('click',votar)
vercandidatosboton.addEventListener('click',vercandidatos)
vervotacionesboton.addEventListener('click',vervotaciones)


