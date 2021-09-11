function Prop(id, name, description, roomdescription, shortdesc, item, usable, combineid, createid) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.roomdescription = roomdescription;
  this.shortdesc = shortdesc;
  this.item =  item;
  this.usable = usable;
  this.combin = combineid;
  this.createid = createid;
}

Prop.prototype.use = function(item, thisindex, itemindex){
  let output = '';
  // this | refers to the object that is calling the function.
  // Prop | refers to the other object that is referenced.
  if(this.usable === true && item.usable === true){
    if(this.combin === item.id || item.combin === this.id){
        removeFromInvetory(thisindex);
        if (propInRoom(itemindex) != -1){
          removeFromRoom(itemindex);
        }
        else{
          removeFromInvetory(itemindex);
        }
        createProp(this.createid);
        let propindex;
        if(this.createid != null){
          propindex = createProp(this.createid);
        }
        else{
          propindex = createProp(item.createid);
        }
        inventory.push(combinedprops[propindex]);
        combinedprops.splice(propindex,1);
    }
  }
  else{
    output += "No can do scooby doo";
  }
  return output;
}


//Room 1
var trashcan = new Prop(
  0,
  'trashcan',
  "It's a heavily dented trashcan with the word Excalican carved into it.",
  "A heavily dented trashcan is laying on it's side.",
  "It's a trashcan genius.",
  true,
  true,
  null,
  null
);
var rock = new Prop(
  1,
  'rock',
  "It's your best friend, it has eyes and everything. You have named it Hugh.",
  "A small rock looks at you with hope in it's eyes.",
  "It's a rock.",
  true,
  true,
  null,
  null
);
var string = new Prop(
  2,
  'string',
  "It's a pice of string.",
  "It's a pice of string.",
  "It's a pice of string.",
  true,
  true,
  null,
  null
);
var stick = new Prop(
  3,
  'stick',
  "It's a pice of stick.",
  "It's a pice of stick.",
  "It's a pice of stick.",
  true,
  true,
  2,
  4
);
var stringstick = new Prop(
  4,
  'stringstick',
  "It's a pice of stick tied to a stick.",
  "It's a stick with some string tied to it, it's the world worst fishing pole.",
  "It's a pice of stick tied to a stick.",
  true,
  true,
  1,
  5
);
var hughflail = new Prop(
  5,
  'hughflail',
  "It's a Hughflail",
  "It's a stick with some string tied to it with a Hugh tied to the string.",
  "It's a mighty weapon",
  true,
  true,
  null,
  null
);
var combinedprops = new Array;

combinedprops.push(stringstick);
combinedprops.push(hughflail);

roomlist[0].props.push(trashcan);
roomlist[0].props.push(rock);
roomlist[0].props.push(string);
roomlist[0].props.push(stick);


function createProp(propid){
  let output = combinedprops.findIndex(x => x.id === propid);
  return output;
}
