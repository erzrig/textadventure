var loc = 0;
var delay = 25;
var inventory = new Array();
var debug = false;

$('body').terminal(function(command) {
  var cmd = $.terminal.parse_command(command);
  var args = cmd.args.map(args => args.toLowerCase());
  if(cmd.name != ''){
    let output = Command(cmd.name.toLowerCase(), args);
    this.echo(output, { typing: debug, delay: delay });
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
