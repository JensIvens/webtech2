/*
 * GET ask page.
 */

exports.ask = function(req, res){
  res.render('ask', { title: 'IMDWall' });
};
