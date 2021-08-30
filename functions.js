function Move(direction){
  let dirnum = 0;
  let output = '';
  switch (direction) {
    case 'n':
      dirnum = 0;
      break;
    case 's':
      dirnum = 1;
      break;
    case 'w':
      dirnum = 2;
      break;
    case 'e':
      dirnum = 3;
      break;
  }
  if(roomlist[loc].exits[dirnum] == null){
    output = 'Unable to go there.';
  }else{
    loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[dirnum]);
    output += roomlist[loc].description;
      for(let i = 0; i < roomlist[loc].props.length; i++){
        output += ' ' + roomlist[loc].props[i].roomdescription;
      }
  }
  return output;
}

function propinroom(prop){
  let output = roomlist[loc].props.findIndex(x => x.name === prop);
  return output;
}

function propininv(prop){
  let output = inventory.findIndex(x => x.name === prop);
  return output;
}
