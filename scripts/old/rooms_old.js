function Room(id, description, exits){
  this.id = id;
  this.description = description;
  this.exits = exits;
  this.visited = false;
  this.props = new Array;
}

var roomlist = new Array;

// [,,,] n,s,w,e

roomlist.push(
  new Room(
    "dead end",
    "You stand in a dead end.",
    ["crossing",,,]
  )
);

roomlist.push(
  new Room(
    "crossing",
    "The sky above the port was the color of television tuned to a dead channel, standing in a alley crossing with muck upon you feet.",
    ["riverfilth","dead end","muggers","bob"]
  )
);

roomlist.push(
  new Room(
    "riverfilth",
    "Before you is a river of filth, there is no way you will wade through that.",
    [,"crossing",,]
  )
);

roomlist.push(
  new Room(
    "muggers",
    "You see a group of razergirls up ahead currently preforming the worlds second oldest profession mugging.",
    [,,,"crossing"]
  )
);

roomlist.push(
  new Room(
    "bob",
    "Bob tells you that you can't go this way",
    [,,"crossing",]
  )
);
