function Prop(id, name, description, roomdescription, shortdesc, item, usable) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.roomdescription = roomdescription;
  this.shortdesc = shortdesc;
  this.item =  item;
  this.usable = usable;
}

Prop.prototype.use = function(Prop){
  // this | refers to the object that is calling the function.
  // Prop | refers to the other object that is referenced.
  // Need to generalize the add and remove functions from rooms and inventory so that it can be used here.
  if(this.usable == true && Prop.usable == true){
    console.log(Prop.name + ' is smashed against ' + this.name);
  }else{
    console.log("No can do scooby doo");
  }
}


//Room 1
var trashcan = new Prop(
  0,
  'trashcan',
  "It's a heavily dented trashcan with the word Excalican carved into it.",
  "A heavily dented trashcan is laying on it's side.",
  "It's a trashcan genius.",
  true,
  true
);
var rock = new Prop(
  1,
  'rock',
  "It's your best friend, it has eyes and everything. You have named it Hugh.",
  "A small rock looks at you with hope in it's eyes.",
  "It's a rock.",
  true,
  true
);

roomlist[0].props.push(trashcan);
roomlist[0].props.push(rock);
