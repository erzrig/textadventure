function Command(cmd, args){
  let output = '';
  if (cmd === 'n' || cmd === 's' || cmd === 'e' || cmd === 'w') {
      output = Move(cmd);
  }

  else if(cmd === 'look') {
    if(args[0] === 'at'){
        if(propInRoom(args[1]) != -1){
          output = roomlist[loc].props[propInRoom(args[1])].description;
        }else if(propInInventory(args[1]) != -1){
          output = inventory[propInInventory(args[1])].description;
        }
        else{
          output = "You can't inspect what you can't see.";
        }
    }
    else {
      output = roomlist[loc].description;
      for(let i = 0; i < roomlist[loc].props.length; i++){
        output += ' ' + roomlist[loc].props[i].roomdescription;
      }
    }
  }

  else if(cmd === 'exits' || cmd === 'exit'){
    if(roomlist[loc].exits[0] != null){
      output += 'N '
    }
    if(roomlist[loc].exits[1] != null){
      output += 'S '
    }
    if(roomlist[loc].exits[2] != null){
      output += 'W '
    }
    if(roomlist[loc].exits[3] != null){
      output += 'E '
    }
    output = '[[b;#fff;]' + exits +']';
  }

  else if(cmd === 'inv'){
    if(inventory.length == 0){
      output = 'Your pockets are empty.';
    }else{
      for(let i = 0; i < inventory.length; i++){
        output += '[[b;#fff;]' + inventory[i].name + '] - ' + inventory[i].shortdesc;
        if(inventory.length != 1 && inventory.length-1 != i){
          output += '\n';
        }
      }
    }
  }

  else if(cmd === 'take'){
    if(propInRoom(args[0]) != -1){
      let propindex = propInRoom(args[0]);
      addToInvetory(propindex);
      removeFromRoom(propindex);
      output = 'You pick up ' + inventory[inventory.length-1].name;
    }else{
      output = 'There is no ' + args[0] + ' here.';
    }
  }

  else if(cmd === 'drop'){
    if(propInInventory(args[0] != -1)) {
      let propindex = propInInventory(args[0]);
      addToRoom(propindex);
      removeFromInvetory(propindex);
      output = 'You drop ' + roomlist[loc].props[roomlist[loc].props.length-1].name;
    }else{
      output = 'You are not carrying that.';
    }
  }

  else if(cmd === 'debug'){
    debug = !debug;
    output = 'Debug: ' + !debug;
  }

  else if(cmd === 'use'){
    if(args.length == 2){
      if(propInInventory(args[0]) != -1) {
        if(propInInventory(args[1]) != -1){
          output = inventory[propInInventory(args[0])].use(inventory[propInInventory(args[1])]);
        }else if (propInRoom(args[1]) != -1){
          output = inventory[propInInventory(args[0])].use(roomlist[loc].props[propInRoom(args[1])]);
        }else{
          output = "You can't do that.";
        }
      }else{
      outptu = "You need to hold something to be able to use it.";
      }
    }else{
      output = "Use what on what?";
    }
  }

  else{
    output = '[[b;#fff;]Unknown Command]';
  }

  return output;
}



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

// Room Functions
function propInRoom(prop){
  let output = roomlist[loc].props.findIndex(x => x.name === prop);
  return output;
}

function addToRoom(propindex){
  roomlist[loc].props.push(inventory[propindex]);
}

function removeFromRoom(propindex){
  roomlist[loc].props.splice(propindex,1);
}

// Inventory Functions
function propInInventory(prop){
  let output = inventory.findIndex(x => x.name === prop);
  return output;
}

function addToInvetory(propindex){
  inventory.push(roomlist[loc].props[propindex]);
}

function removeFromInvetory(propindex){
  inventory.splice(propindex,1);
}
