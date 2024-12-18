document.addEventListener("DOMContentLoaded",()=>{
fetch('../../components/Layouts/Footer/Footer.html')
.then(response=>{
    if (!response.ok) {
        throw new Error("No se puedo cargar el archivo")
    }
    return response.text();
})
.then(data=>{
    document.getElementById('Footer').innerHTML=data;
})
.catch(error=>{
    console.error('Error al cargar el archivo',error);
    
})
    //
})