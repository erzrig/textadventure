var loc = 0;
var delay = 25;
var inventory = new Array();
var debug = false;

$('body').terminal(function(command) {
  var cmd = $.terminal.parse_command(command);
  if(cmd.name.toLowerCase() === 'help' || cmd.name === '?'){
    this.echo('[[b;#fff;]n] - Go North' +
              '\n[[b;#fff;]s] - Go South' +
              '\n[[b;#fff;]e] - Go East' +
              '\n[[b;#fff;]w] - Go West' +
              '\n[[b;#fff;]look] - Describes the room' +
              '\n[[b;#fff;]look at] - look at <object>' +
              '\n[[b;#fff;]inv] - Lists your inventory' +
              '\n[[b;#fff;]take] - take <object>' +
              '\n[[b;#fff;]use] - use <item in inventory> <item>' +
              '\n[[b;#fff;]drop] - drop <item>' +
              '\n[[b;#fff;]exits] Shows room exits' +
              '\n[[b;#fff;]clear] Clears the screen');
  }

  else if(cmd.name.toLowerCase() === 'look'){
    if(cmd.args[0] === 'at'){
        if(propinroom(cmd.args[1].toLowerCase()) != -1){
          this.echo(roomlist[loc].props[propinroom(cmd.args[1].toLowerCase())].description);
        }else if(propininv(cmd.args[1].toLowerCase()) != -1){
          this.echo(inventory[propininv(cmd.args[1].toLowerCase())].description);
        }
        else{
          this.echo("You can't inspect what you can't see.");
        }
    }else {
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      this.echo(output, { typing: debug, delay: (delay) });
    }
  }

  else if(cmd.name.toLowerCase() === 'n' || cmd.name.toLowerCase() === 's' || cmd.name.toLowerCase() === 'e' || cmd.name.toLowerCase() === 'w'){
    let output = Move(cmd.name.toLowerCase());
    if(roomlist[loc].visited == false){
      roomlist[loc].visited = true;;
    }
      this.echo(output, { typing: debug, delay: delay });
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
      this.echo(output, { typing: debug, delay: (delay) });
    }
  }

  else if(cmd.name.toLowerCase() === 'take'){
    if(propinroom(cmd.args[0].toLowerCase()) != -1){
      let propindex = propinroom(cmd.args[0].toLowerCase());
      inventory.push(roomlist[loc].props[propindex]);
      roomlist[loc].props.splice(propindex,1);
      this.echo('You pick up ' + inventory[inventory.length-1].name, { typing: debug, delay: (delay) });
    }else{
      this.echo('There is no ' + cmd.args[0] + ' here.', { typing: debug, delay: (delay) });
    }
  }

  else if(cmd.name.toLowerCase() === 'drop'){
    if(propininv(cmd.args[0].toLowerCase() != -1)) {
      let propindex = propininv(cmd.args[0].toLowerCase());
      roomlist[loc].props.push(inventory[propindex]);
      inventory.splice(propindex,1);
      this.echo('You drop ' + roomlist[loc].props[roomlist[loc].props.length-1].name, { typing: debug, delay: (delay) });
    }else{
      this.echo('You are not carrying that.', { typing: debug, delay: (delay) });
    }
  }

  else if(cmd.name.toLowerCase() === 'debug'){
    debug = !debug;
    this.echo('Debug: ' + !debug);
  }

  else if(cmd.name.toLowerCase() === 'use'){
    if(cmd.args.length == 2){
      if(propininv(cmd.args[0].toLowerCase()) != -1) {
        if(propininv(cmd.args[1].toLowerCase()) != -1){
          this.echo(inventory[propininv(cmd.args[0].toLowerCase())].use(inventory[propininv(cmd.args[1].toLowerCase())]));
        }else if (propinroom(cmd.args[1].toLowerCase()) != -1){
          this.echo(inventory[propininv(cmd.args[0].toLowerCase())].use(roomlist[loc].props[propinroom(cmd.args[1].toLowerCase())]));
        }else{
          this.echo("You can't do that.", { typing: debug, delay: delay });
        }
      }else{
      this.echo("You need to hold something to be able to use it.", { typing: debug, delay: delay });
    }
  }else{
    this.echo("Use what on what?", { typing: debug, delay: delay });
  }
  }

  else{
    this.echo('[[b;#fff;]Unknown Command]', { typing: debug, delay: delay });
  }
}, {
    greetings: function() {
      this.echo('Type Help for Help...\n');
      roomlist[loc].visited = true;
      let output = roomlist[loc].description;
        for(let i = 0; i < roomlist[loc].props.length; i++){
          output += ' ' + roomlist[loc].props[i].roomdescription;
        }
      this.echo(output, { typing: debug, delay: delay });
    }
});
