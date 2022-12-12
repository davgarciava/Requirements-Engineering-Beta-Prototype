$(document).ready(function(){

  var db = new localStorageDB("game_design_best_practices", localStorage);

  // Check if the database was just created. Useful for initial database setup
  if( db.isNew() ) {

    // create the tables
    db.createTable("learning_goals", ["type", "stakeholder", "problem", "problem_domain", "description"]);
    db.createTable("target_audience", ["genre", "age", "type", "schooling_level", "knowledge"]);
    db.createTable("goals", ["order", "description"]);
    db.createTable("functional_requirements", ["description"]);
    db.createTable("non_functional_requirements", ["description"]);
    db.createTable("story", ["description"]);
    db.createTable("characters", ["name", "type", "nature", "role", "description"]);
    db.createTable("behaviors", ["movement", "movement_element", "character"]);
    db.createTable("narratives", ["chronological_order", "topic", "dialog", "emotional_element", "character"]);
    db.createTable("game_design_document", ["game_name", "summary", "team_name", "team_members", "company_logo", "date"])

    // commit the database to localStorage
    // all create/drop/insert/update/delete operations should be committed
    db.commit();
  }

  if (db.rowCount("game_design_document") > 0){
    const game_design_document = db.queryAll("game_design_document", { query: {ID: 1} })[0];
    $('[name="game_name"]').val(game_design_document.game_name);
    $('[name="summary"]').val(game_design_document.summary);
    $('[name="team_name"]').val(game_design_document.team_name);
    $('[name="team_members"]').val(game_design_document.team_members);

    /*
    if (game_design_document.company_logo != null) {
      var dt = new DataTransfer();
      dt.items.add(game_design_document.company_logo);
      var file_list = dt.files;
      document.getElementById('company_logo').files = file_list;
    }
    */

    $('[name="date"]').val(game_design_document.date);
  };

  $('#generateDocumentForm').submit(function() {
    // Get all the forms elements and their values in one step
    var values = $(this).serialize();
    const file = document.getElementById('company_logo').files[0];

    var game_design_document_values = {};
    values = values.split("&");

    for(i=0; i<values.length; i++){
      const value = values[i].split("=");
      Object.defineProperty(game_design_document_values, value[0], {value: decodeURIComponent(value[1])});
    }

    if (file) {
      Object.defineProperty(game_design_document_values, "company_logo", {value: file.name});
    } else {
      Object.defineProperty(game_design_document_values, "company_logo", {value: ""});
    }
    console.log(game_design_document_values);

    if (db.rowCount("game_design_document") > 0){
      db.update("game_design_document", {ID: 1}, function(row) {
      row.game_name = game_design_document_values.game_name;
      row.summary = game_design_document_values.summary;
      row.team_name = game_design_document_values.team_name;
      row.team_members = game_design_document_values.team_members;
      row.company_logo = game_design_document_values.company_logo;
      row.date = game_design_document_values.date;
      
      // the update callback function returns to the modified record
        return row;
      });
    } else {
      db.insert("game_design_document", game_design_document_values);
      
    }
    db.commit();

    alert("The generation of the document has not been programmed yet because this application is a prototype. However, the data entered in the form fields above has been correctly inserted into the database.")
  });
});