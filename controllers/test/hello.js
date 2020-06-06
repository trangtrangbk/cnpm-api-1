const sayHello = (req, res) => {
    res.send("Hello from test");
  };
  
  const user = (req, res) => {
    res.send("hello USER");
  };
  
  const admin = (req, res) => {
    res.send("hello AMIN");
  };
  
  module.exports = { sayHello, user, admin };
  