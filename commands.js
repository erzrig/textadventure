var loc = 1;
var delay = 50;
var inventory = new Array();

$('body').terminal(function(command) {
  var cmd = $.terminal.parse_command(command);
  if(cmd.name.toLowerCase() === 'help' || cmd.name === '?'){
    this.echo('[[b;#fff;]n] - Go North' +
              '\n[[b;#fff;]s] - Go South' +
              '\n[[b;#fff;]e] - Go East' +
              '\n[[b;#fff;]w] - Go West' +
              '\n[[b;#fff;]look] - Describes the room' +
              '\n[[b;#fff;]exits] Shows room exits' +
              '\n[[b;#fff;]clear] Clears the screen');
  }else if(cmd.name.toLowerCase() === 'look' || cmd.name === 'description'){
    if(cmd.args[0] === 'at'){
        if(roomlist[loc].props.findIndex(x => x.name === cmd.args[1].toLowerCase()) != -1){
            this.echo(roomlist[loc].props[roomlist[loc].props.findIndex(x => x.name === cmd.args[1].toLowerCase())].description);
        }else{
          this.echo("You can't inspect what you can't see.");
        }
    }else {
    this.echo(roomlist[loc].description, { typing: true, delay: (delay/4) });
    }
  }else if(cmd.name.toLowerCase() === 'n'){
    if(roomlist[loc].exits[0] == null){
      this.echo('Unable to go there.', { typing: true, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[0]);
      if(roomlist[loc].visited == true){
        this.echo(roomlist[loc].description, { typing: true, delay: (delay/4) });
      }else{
        roomlist[loc].visited = true;
        this.echo(roomlist[loc].description, { typing: true, delay: delay });
      }
    }
  }else if(cmd.name.toLowerCase() === 's'){
    if(roomlist[loc].exits[1] == null){
      this.echo('Unable to go there.', { typing: true, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[1]);
      if(roomlist[loc].visited == true){
        this.echo(roomlist[loc].description, { typing: true, delay: (delay/4) });
      }else{
        roomlist[loc].visited = true;
        this.echo(roomlist[loc].description, { typing: true, delay: delay });
      }
    }
  }else if(cmd.name.toLowerCase() === 'e'){
    if(roomlist[loc].exits[3] == null){
      this.echo('Unable to go there.', { typing: true, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[3]);
      if(roomlist[loc].visited == true){
        this.echo(roomlist[loc].description, { typing: true, delay: (delay/4) });
      }else{
        roomlist[loc].visited = true;
        this.echo(roomlist[loc].description, { typing: true, delay: delay });
      }
    }
  }else if(cmd.name.toLowerCase() === 'w'){
    if(roomlist[loc].exits[2] == null){
      this.echo('Unable to go there.', { typing: true, delay: delay });
    }else{
      loc = roomlist.findIndex(x => x.id === roomlist[loc].exits[2]);
      if(roomlist[loc].visited == true){
        this.echo(roomlist[loc].description, { typing: true, delay: (delay/4) });
      }else{
        roomlist[loc].visited = true;
        this.echo(roomlist[loc].description, { typing: true, delay: delay });
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
    this.echo('[[b;#fff;]' + exits +']', { typing: true, delay: delay });
  }else if(cmd.name.toLowerCase() === 'inv'){
    if(inventory.length == 0){
      this.echo('Your pockets are empty.', { typing: true, delay: (delay/4) });
    }else{
      let output = '';
      for(let i = 0; i < inventory.length; i++){
        output += '[[b;#fff;]' + inventory[i].name + '] ';
      }
      this.echo(output, { typing: true, delay: (delay/4) });
    }
  }else if(cmd.name.toLowerCase() === 'take'){
    if(roomlist[loc].props.findIndex(x => x.name === cmd.args[0].toLowerCase()) != -1){
      let propindex = roomlist[loc].props.findIndex(x => x.name === cmd.args[0].toLowerCase());
      inventory.push(roomlist[loc].props[propindex]);
      roomlist[loc].props.splice(propindex,1);
      this.echo('You pick up ' + inventory[inventory.length-1].name);
    }else{
      this.echo('There is no ' + cmd.args[0] + ' here.');
    }
  }
  else{
    this.echo('[[b;#fff;]Unknown Command]', { typing: true, delay: delay });
  }
}, {
    greetings: function() {
      //this.echo('Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?', { typing: true, delay: 50 });
      this.echo('Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?\n');
      roomlist[loc].visited = true;
      this.echo(roomlist[loc].description, { typing: true, delay: delay });
    }
});
