
/*
 * GET vote page.
 */

exports.show = function(req, res){
  res.render('vote', { title: 'Express' });
};