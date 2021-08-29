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
    1,
    "You stand in a dead end with a trashcan laying on its side.",
    [2,,,]
  )
);

roomlist.push(
  new Room(
    2,
    "The sky above the port was the color of television tuned to a dead channel, standing in a alley crossing with muck upon you feet.",
    [3,1,4,5]
  )
);

roomlist.push(
  new Room(
    3,
    "Before you is a river of filth, there is no way you will wade through that.",
    [,2,,]
  )
);

roomlist.push(
  new Room(
    4,
    "You see a group of razergirls up ahead currently preforming the worlds second oldest profession mugging.",
    [,,,2]
  )
);

roomlist.push(
  new Room(
    5,
    "Bob tells you that you can't go this way",
    [,,2,]
  )
);
