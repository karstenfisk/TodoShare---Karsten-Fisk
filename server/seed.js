const { db, User, Note } = require("./db/index");

const users = [
  { username: "karsten", password: "123" },
  { username: "iraffeorty1", password: "JKeBVbmNJx8" },
  { username: "rdearnaley2", password: "BpObLkHm" },
  { username: "mdegiorgis3", password: "rhXHPx5" },
  { username: "ftwitty4", password: "9t663ME7" },
  { username: "yes", password: "123" },
  { username: "no", password: "123" },
];

const notes = [
  {
    title: "Texas Hercules' Club",
    content:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
  },
  {
    title: "Brazilian Red-cloak",
    content:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
  },
  {
    title: "Rimmed Navel Lichen",
    content:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  },
  {
    title: "Fringed Nutrush",
    content:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  },
  {
    title: "Tomentose Gopherweed",
    content: "In congue. Etiam justo. Etiam pretium iaculis justo.",
  },
  {
    title: "Alderleaf Mountain Mahogany",
    content:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  },
  {
    title: "Sharp Cupgrass",
    content:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  },
  {
    title: "Florida Gamagrass",
    content:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  },
  {
    title: "Marsh Milkvetch",
    content:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  },
  {
    title: "Grassleaf Lettuce",
    content:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  },
  {
    title: "Jim's Clover",
    content:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  },
  {
    title: "Fijian Sawsedge",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
  },
  {
    title: "Tapertip False Wheatgrass",
    content:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
  },
  {
    title: "Trapeliopsis Lichen",
    content:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  },
  {
    title: "Loose Watermilfoil",
    content:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  },
  {
    title: "San Luis Obispo Sedge",
    content:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  },
  {
    title: "Laurel Amarillo",
    content:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  },
  {
    title: "Wiggins' Cryptantha",
    content:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    title: "Strong Bladderpod",
    content:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  },
  {
    title: "Muehlenberg's Astomum Moss",
    content:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    title: "Mexican Blazing Star",
    content:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
  },
  {
    title: "Wildcane",
    content:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  },
  {
    title: "Coast Plantain",
    content:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  },
  {
    title: "Viscid Mallow",
    content:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  },
  {
    title: "Hawkweed Oxtongue",
    content:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
  {
    title: "Paradox Sunflower",
    content:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  },
  {
    title: "Openflower Rosette Grass",
    content: "Fusce consequat. Nulla nisl. Nunc nisl.",
  },
  {
    title: "Metcalfe's Ticktrefoil",
    content:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
  },
  {
    title: "Arizona Baccharis",
    content:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    title: "Bigflower Bladderpod",
    content: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
  },
];

const seed = async () => {
  await db.sync({ force: true });

  // await Promise.all(users.map((user) => User.create(user)));
  // await Promise.all(
  //   notes.map(async (note) => {
  //     const newNote = await Note.create(note);
  //     const OwnerGuest = Math.floor(Math.random() * 2) + 1;
  //     const userIdx = Math.floor(Math.random() * 5) + 1;
  //     const user = await User.findByPk(userIdx);
  //     if (OwnerGuest === 2) {
  //       // add user as guest
  //       await newNote.addUser(user, { through: { userType: "guest" } });
  //     } else {
  //       //just add user
  //       await newNote.addUser(user);
  //     }
  //   })
  // );
};
seed();
