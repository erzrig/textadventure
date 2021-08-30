function Prop(id, name, description, roomdescription, shortdesc, item, usable) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.roomdescription = roomdescription;
  this.shortdesc = shortdesc;
  this.item =  item;
  this.usable = usable;
}



//Room 1
roomlist[0].props.push(new Prop(0,'trashcan', "It's a heavily dented trashcan with the word Excalican carved into it.", "A heavily dented trashcan is laying on it's side.", "It's a trashcan genius.", true, false));
roomlist[0].props.push(new Prop(1,'rock', "It's your best friend, it has eyes and everything. You have named it Hugh.", "A small rock looks at you with hope in it's eyes.", "It's a rock.", true, true));
