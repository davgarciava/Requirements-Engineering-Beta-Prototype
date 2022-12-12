$(document).ready(function(){

  window.addEventListener("contextmenu", e => e.preventDefault());

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

  $("#download").click(function() { 
    const database = "data:text/json;charset=utf-8," + db.serialize(); // encodeURIComponent(JSON.stringify());
    $(this).attr("href", database);
    $(this).attr("download", "GDBP_Database.json");
  });

  $("#upload").click(function() {
    $("#uploadDatabaseModal").modal('toggle');
  });

  $("#clear").click(function() {
    localStorage.clear();
  });

  $('#uploadDatabaseForm').submit(function() {
    const file = document.getElementById('database').files[0];
    console.log(file);
    var read = new FileReader();
    
    read.readAsBinaryString(file);

    read.onloadend = function(){
      console.log(read.result);
      localStorage.setItem('db_game_design_best_practices', read.result);
      alert("Database successfully imported!")
    }
  });

  buildTargetAudienceTable();
  buildLearningGoalsTable();
  buildGoalsTable()
  buildFunctionalRequirementTable()
  buildNonFunctionalRequirementTable()
  buildCharacterTable()
  buildBehaviorTable()
  buildStoryTable()
  buildNarrativeTable()
  buildGameDesignDocumentTable()

  function buildTargetAudienceTable() {
    var table = $('#target_audience-table-body');
    var myList = db.queryAll("target_audience");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].genre}</td>
                  <td>${myList[i].age}</td>
                  <td>${myList[i].type}</td>
                  <td>${myList[i].schooling_level}</td>
                  <td>${myList[i].knowledge}</td>
                  `;
        table.append(row);
    }
  }

  function buildLearningGoalsTable() {
    var table = $('#learning_goals-table-body');
    var myList = db.queryAll("learning_goals");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <th>${myList[i].ID}</th>
                  <td>${myList[i].type}</td>
                  <td>${myList[i].stakeholder}</td>
                  <td>${myList[i].problem}</td>
                  <td>${myList[i].problem_domain}</td>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildGoalsTable() {
    var table = $('#goals-table-body');
    var myList = db.queryAll("goals");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <th>${myList[i].ID}</th>
                  <td>${myList[i].order}</td>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildFunctionalRequirementTable() {
    var table = $('#functional_requirements-table-body');
    var myList = db.queryAll("functional_requirements");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <th>${myList[i].ID}</th>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildNonFunctionalRequirementTable() {
    var table = $('#non_functional_requirements-table-body');
    var myList = db.queryAll("non_functional_requirements");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <th>${myList[i].ID}</th>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildCharacterTable() {
    var table = $('#characters-table-body');
    var myList = db.queryAll("characters");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].type}</td>
                  <td>${myList[i].nature}</td>
                  <td>${myList[i].role}</td>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildBehaviorTable() {
    var table = $('#behaviors-table-body');
    var myList = db.queryAll("behaviors");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <th>${myList[i].ID}</th>
                  <td>${myList[i].movement}</td>
                  <td>${myList[i].movement_element}</td>
                  <td>${myList[i].character}</td>
                  `;
        table.append(row);
    }
  }

  function buildStoryTable() {
    var table = $('#story-table-body');
    var myList = db.queryAll("story");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].description}</td>
                  `;
        table.append(row);
    }
  }

  function buildNarrativeTable() {
    var table = $('#narratives-table-body');
    var myList = db.queryAll("narratives");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].chronological_order}</td>
                  <td>${myList[i].topic}</td>
                  <td>${myList[i].dialog}</td>
                  <td>${myList[i].emotional_element}</td>
                  <td>${myList[i].character}</td>
                  `;
        table.append(row);
    }
  }

  function buildGameDesignDocumentTable() {
    var table = $('#game_design_document-table-body');
    var myList = db.queryAll("game_design_document");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].game_name}</td>
                  <td>${myList[i].summary}</td>
                  <td>${myList[i].team_name}</td>
                  <td>${myList[i].team_members}</td>
                  <td>${myList[i].company_logo}</td>
                  <td>${myList[i].date}</td>
                  `;
        table.append(row);
    }
  }
});