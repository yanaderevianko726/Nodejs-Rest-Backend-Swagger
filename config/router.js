const user = require('../components/user');
const auth = require('../components/auth');

module.exports = app => {
  const components = [auth, user];
  components.forEach(component => {
    component(app);
  });
};
