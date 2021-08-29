var loc = 0;
var delay = 50;
var inventory = new Array();
var debug = true;

$('body').terminal(function(command) {
  var cmd = $.terminal.parse_command(command);
  if(cmd.name.toLowerCase() === 'help' || cmd.name === '?'){
    this.echo('[[b;#fff;]n] - Go North' +
              '\n[[b;#fff;]s] - Go South' +
              '\n[[b;#fff;]e] - Go East' +
              '\n[[b;#fff;]w] - Go West' +
              '\n[[b;#fff;]look] - Describes the room' +
              '\n[[b;#fff;]inv] - Lists your inventory' +
              '\n[[b;#fff;]take] - Take an item' +
              '\n[[b;#fff;]drop] - Drop an item' +
              '\n[[b;#fff;]exits] Shows room exits' +
              '\n[[b;#fff;]clear] Clears the screen');
  }

  else if(cmd.name.toLowerCase() === 'look'){
    if(cmd.args[0] === 'at'){
        if(roomlist[loc].props.findIndex(x => x.name === cmd.args[1].toLowerCase()) != -1){
          this.echo(roomlist[loc].props[roomlist[loc].props.findIndex(x => x.name === cmd.args[1].toLowerCase())].description);
        }else if(inventory.findIndex(x => x.name === cmd.args[1].toLowerCase()) != -1){
          this.echo(inventory[inventory.findIndex(x => x.name === cmd.args[1].toLowerCase())].description);
        }
        else{
          this.echo("You can't inspect what you can't see.");
        }
    }else {
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      this.echo(output, { typing: debug, delay: (delay/4) });
    }
  }

  else if(cmd.name.toLowerCase() === 'n'){
    if(roomlist[loc].exits[0] == null){
      this.echo('Unable to go there.', { typing: debug, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[0]);
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      if(roomlist[loc].visited == debug){
        this.echo(output, { typing: debug, delay: (delay/4) });
      }else{
        roomlist[loc].visited = debug;
        this.echo(output, { typing: debug, delay: delay });
      }
    }
  }

  else if(cmd.name.toLowerCase() === 's'){
    if(roomlist[loc].exits[1] == null){
      this.echo('Unable to go there.', { typing: debug, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[1]);
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      if(roomlist[loc].visited == debug){
        this.echo(output, { typing: debug, delay: (delay/4) });
      }else{
        roomlist[loc].visited = debug;
        this.echo(output, { typing: debug, delay: delay });
      }
    }
  }

  else if(cmd.name.toLowerCase() === 'e'){
    if(roomlist[loc].exits[3] == null){
      this.echo('Unable to go there.', { typing: debug, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[3]);
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      if(roomlist[loc].visited == debug){
        this.echo(output, { typing: debug, delay: (delay/4) });
      }else{
        roomlist[loc].visited = debug;
        this.echo(output, { typing: debug, delay: delay });
      }
    }
  }

  else if(cmd.name.toLowerCase() === 'w'){
    if(roomlist[loc].exits[2] == null){
      this.echo('Unable to go there.', { typing: debug, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[2]);
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      if(roomlist[loc].visited == debug){
        this.echo(output, { typing: debug, delay: (delay/4) });
      }else{
        roomlist[loc].visited = debug;
        this.echo(output, { typing: debug, delay: delay });
      }
    }
  }

  else if(cmd.name.toLowerCase() === 'exits' || cmd.name.toLowerCase() === 'exit'){
    let exits = '';
    if(roomlist[loc].exits[0] != null){
      exits += 'N '
    }
    if(roomlist[loc].exits[1] != null){
      exits += 'S '
    }
    if(roomlist[loc].exits[2] != null){
      exits += 'W '
    }
    if(roomlist[loc].exits[3] != null){
      exits += 'E '
    }
    this.echo('[[b;#fff;]' + exits +']', { typing: debug, delay: delay });
  }

  else if(cmd.name.toLowerCase() === 'inv'){
    if(inventory.length == 0){
      this.echo('Your pockets are empty.', { typing: debug, delay: (delay/4) });
    }else{
      let output = '';
      for(let i = 0; i < inventory.length; i++){
        output += '[[b;#fff;]' + inventory[i].name + '] - ' + inventory[i].shortdesc;
        if(inventory.length != 1 && inventory.length-1 != i){
          output += '\n';
        }
      }
      this.echo(output, { typing: debug, delay: (delay/4) });
    }
  }

  else if(cmd.name.toLowerCase() === 'take'){
    if(roomlist[loc].props.findIndex(x => x.name === cmd.args[0].toLowerCase()) != -1){
      let propindex = roomlist[loc].props.findIndex(x => x.name === cmd.args[0].toLowerCase());
      inventory.push(roomlist[loc].props[propindex]);
      roomlist[loc].props.splice(propindex,1);
      this.echo('You pick up ' + inventory[inventory.length-1].name);
    }else{
      this.echo('There is no ' + cmd.args[0] + ' here.');
    }
  }

  else if(cmd.name.toLowerCase() === 'drop'){
    if(inventory.findIndex(x => x.name === cmd.args[0].toLowerCase()) != -1){
      let propindex = inventory.findIndex(x => x.name === cmd.args[0].toLowerCase());

      roomlist[loc].props.push(inventory[propindex]);
      inventory.splice(propindex,1);
      this.echo('You drop ' + roomlist[loc].props[roomlist[loc].props.length-1].name);
    }else{
      this.echo('You are not carrying that.');
    }
  }else if(cmd.name.toLowerCase() === 'debug'){
    debug = !debug;
    this.echo('Debug: ' + !debug);
  }

  else{
    this.echo('[[b;#fff;]Unknown Command]', { typing: true, delay: delay });
  }
}, {
    greetings: function() {
      //this.echo('Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?', { typing: true, delay: 50 });
      this.echo('Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?\n');
      roomlist[loc].visited = true;
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      this.echo(output, { typing: true, delay: delay });
    }
});
