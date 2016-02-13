var AUTH0_CLIENT_ID='uXgVqdM2nkQBzDZrrjldvIRryL8JkUPM'; 
var AUTH0_DOMAIN='ladicle.auth0.com'; 
var AUTH0_CALLBACK_URL=location.href;

$(function() {
 var userProfile;
 var lock = new Auth0Lock(
   // All these properties are set in auth0-variables.js
   AUTH0_CLIENT_ID,
   AUTH0_DOMAIN
 );

 $('.login').click(function(e) {
   e.preventDefault();
   lock.showSignin(function(err, profile, token) {
     if (err) {
       // Error callback
       console.log("There was an error");
	 
     } else {
       // Save the JWT token.
       localStorage.setItem('userToken', token);
	 
       // Save the profile
       changeMode('detect')
       userProfile = profile;
       $('.nickname').text(profile.nickname);
       $('.nickname').text(profile.name);
     }
   });
 });

 $.ajaxSetup({
   'beforeSend': function(xhr) {
     if (localStorage.getItem('userToken')) {
       xhr.setRequestHeader('Authorization',
             'Bearer ' + localStorage.getItem('userToken'));
     }
   }
 });

 $('.btn-api').click(function(e) {
   // Just call your API here. The header will be sent
   $.ajax({
     url: 'http://localhost:3001/secured/ping',
     method: 'GET'
   }).then(function(data, textStatus, jqXHR) {
     alert("The request to the secured enpoint was successfull");
   }, function() {
     alert("You need to download the server seed and start it to call this API");
   });
 });
});


const milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
const ds = milkcocoa.dataStore('events');
const id = makeId();

// Send Reaction
let buttons = [...document.querySelectorAll('.reaction')];
Bacon.fromArray(buttons)
  .flatMap((e) => Bacon.fromEventTarget(e, 'click'))
  .map((e) => e.target.value)
  .onValue((value) => ds.send({to: 'pc', type: value}));

// Change Mode
let stream = Bacon.fromBinder((callback) => {
    ds.on('send', callback);
    () => ds.off('send');
  })
  .filter((data) => data.value.to == 'sp');

stream
  .map((data) => data.value.mode)
  .onValue((mode) => {
    changeMode(mode);
  });

function changeMode(mode){
  document.getElementsByClassName('showing')[0].classList.remove('showing');
  document.getElementsByClassName(mode)[0].classList.add('showing');
}

function makeId(){
  let randam = Math.floor(Math.random()*1000);
  let date = new Date();
  let time = date.getTime();
  return randam + time.toString();

}
