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

