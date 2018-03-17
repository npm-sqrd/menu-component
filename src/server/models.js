const dbHelpers = require('../../seedDatabase');

module.exports = {
  menuType: (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const { meal, name } = req.params;
    const queryObj = {
      name: name,
      query: `menu.${meal}`,
    };
    dbHelpers.find(queryObj, (err, result) => {
      res.send(result.menu[meal]);
    });
  },
  filterBy: (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const { meal, tag, name } = req.params;
    const queryObj = {
      name: name,
      query: `menu.${meal}`,
    };
    dbHelpers.find(queryObj, (err, result) => {
      const menu = result.menu[meal];
      const filteredMenu = menu.filter(item => item.tags === tag);
      res.send(filteredMenu);
    });
  },
};
