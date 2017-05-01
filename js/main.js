$(function(){ 
    
    
// Can also be used with $(document).ready()

$('.ui.basic.modal').modal('show');
//animacion
$('.autumn.leaf').transition('fade up');
setTimeout(function(){
     $('.ui.basic.modal').modal('hide');
}, 2700);
setTimeout(function(){
    $('.jiggle.images .image').transition({
        animation : 'jiggle',
        duration  : 800,
        interval  : 200
    });  
  $('.autumn.leaf').transition('swing right'); 
}, 3000);
//Traer usuarios 
var aleatorio = Math.floor((Math.random() * 10) + 1);
var id_user;
var id_albums;
$.ajax({
    url: "http://jsonplaceholder.typicode.com/users/"+aleatorio,
    type: 'GET', 
    success:
        function(data) { 
            $('#Nombre').html(data.name);    
            $('#Usuario').html(data.username);    
            $('#Correo').html(data.email);     
            $('#Telefono').html(data.phone);    
            $('#Compania').html(data.company['name']); 
            id_user = data.id;
            call_albums(id_user);
            
        },
    error: 
        function() { 
            alert( "Ha ocurrido un error" );
        }
});
function call_albums(id_user){
    $.ajax({
    url: "http://jsonplaceholder.typicode.com/albums/"+id_user,
    type: 'GET', 
    success:
        function(albums) { 
            id_albums = albums.id;
            call_photos(id_albums);
        },
    error: 
        function() { 
            alert( "Ha ocurrido un error" );
        }
});
}
function call_photos(id_albums){
    $.ajax({
    url: "http://jsonplaceholder.typicode.com/photos/?albumId="+id_albums,
    type: 'GET', 
    success:
        function(photos) {
           $(photos).each(function(i){
                $("#fotos").append('<div class="column"><div class="ui fluid card"><div class="jiggle images image"><img class="ui wireframe image" src="'+photos[i].thumbnailUrl+'"/></div><div class="content"><div class="meta">      <a>'+photos[i].title+'</a> </div></div>  </div>');
            });         
        }, 
    error:  
        function() { 
            alert( "Ha ocurrido un error" );
        }
    }); 
} 

});

    

