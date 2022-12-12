$(document).ready(function(){
  $("#edit").hide();
  $("#create").show();

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

  $('#createTargetAudienceForm').on('reset', function(){
    document.location.reload();
  });

  $('#createTargetAudienceForm').submit(function() {
    // Get all the forms elements and their values in one step
    if (db.rowCount("target_audience") > 0){
      $("#creationModal").modal('toggle');
      return false;
    } else {
      var values = $(this).serialize();

      var target_audience_values = {};
      values = values.split("&");

      for(i=0; i<values.length; i++){
        const value = values[i].split("=");
        Object.defineProperty(target_audience_values, value[0], {value: decodeURIComponent(value[1])});
      }
      
      console.log(target_audience_values);
      db.insert("target_audience", target_audience_values);
      db.commit();
    };
  });

  $("#creationModal").on('hide.bs.modal', function(){
    $('#createTargetAudienceForm').trigger("reset");
  });

  buildTable();

    let id;
    let last_id_num;

    $(".fa-pencil-square-o").click(function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
      id = $(this).attr("id");
      last_id_num = id.split("-")[1];
      $("#" + id).removeClass("text-primary");
      $("#" + id).addClass("text-danger");
      $("#edit").show();
      $("#create").hide();
      const target_audience = db.queryAll("target_audience", { query: {ID: last_id_num} })[0];
      console.log(target_audience)
      $('[name="edit_genre"]').val(target_audience.genre);
      $('[name="edit_age"]').val(target_audience.age);
      $('[name="edit_type"][value="' + target_audience.type + '"]').prop('checked', true);
      $('[name="edit_schooling_level"]').val(target_audience.schooling_level);
      $('[name="edit_knowledge"]').val(target_audience.knowledge);
    });

    $("#targetAudienceEditButton").click(function() {
      $("#confirmEditModal").modal('toggle');
    });

    $("#returnEditButton").click(function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
      $("#edit").hide();
      $("#create").show();
    });

    $("#edit_target_audience").click(function(){
      // Get all the forms elements and their values in one step
      var values = $("#editTargetAudienceForm").serialize();

      var target_audience_values = {};
      values = values.split("&");

      for(i=0; i<values.length; i++){
        const value = values[i].split("=");
        Object.defineProperty(target_audience_values, value[0], {value: decodeURIComponent(value[1])});
      }
    
      console.log(target_audience_values);
      
      console.log("EDITING TARGET AUDIENCE");
      db.update("target_audience", {ID: last_id_num}, function(row){
        row.genre = target_audience_values.edit_genre;
        row.age = target_audience_values.edit_age;
        row.type = target_audience_values.edit_type;
        row.schooling_level = target_audience_values.edit_schooling_level;
        row.knowledge = target_audience_values.edit_knowledge;

        // the update callback function returns to the modified record
        return row;
      });
      db.commit();
      document.location.reload();
    });
    
    $(".fa-trash-o").click(function(){
      id = $(this).attr("id");
      last_id_num = id.split("-")[1];
      $("#confirmDeleteModal").modal('toggle');
      $("#" + id).removeClass("text-primary");
      $("#" + id).addClass("text-danger");
    });

    $("#confirmDeleteModal").on('hide.bs.modal', function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
    });

    $("#delete_target_audience").click(function(){
      console.log("DELETING TARGET AUDIENCE");
      db.deleteRows("target_audience", {ID: last_id_num});
      db.commit();
      document.location.reload();
    });

  function buildTable() {
    var table = $('#table-body');

    var myList = db.queryAll("target_audience");

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].genre}</td>
                  <td>${myList[i].age}</td>
                  <td>${myList[i].type}</td>
                  <td>${myList[i].schooling_level}</td>
                  <td>${myList[i].knowledge}</td>
                  <td class="text-center">
                    <a href="#"><span id="${'lg_edit-' + myList[i].ID}" class="fa fa-pencil-square-o fa-3x me-1 text-primary "></span></a>
                    <a href="#"><span id="${'lg_delete-' + myList[i].ID}" class="fa fa-trash-o fa-3x ms-1 text-primary "></span></a>
                  </td>
                  `;
        table.append(row);
    }
  }
});