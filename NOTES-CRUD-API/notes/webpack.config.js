module.exports = {
  entry: ".", // this specifies location to lambda. by default it looks for the /.src directory
  target: "node",
  mode: "production",
  //   mode: 'none' // this will reduce the minification so that we can be able to read our code in the Lambda Console
};
