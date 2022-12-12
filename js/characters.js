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

  $('#createCharactersForm').on('reset', function(){
    document.location.reload();
  });

  $('#createCharactersForm').submit(function() {
    // Get all the forms elements and their values in one step
    var values = $(this).serialize();

    var character_values = {};
    values = values.split("&");

    for(i=0; i<values.length; i++){
      const value = values[i].split("=");
      Object.defineProperty(character_values, value[0], {value: decodeURIComponent(value[1])});
    }
    
    console.log(character_values);

    if (db.queryAll("characters", { query: {name: character_values.name} }).length != 0){
      $("#creationModal").modal('toggle');
      return false;
    } else {
      db.insert("characters", character_values);
      db.commit();
    }
  });

  $("#creationModal").on('hide.bs.modal', function(){
    document.location.reload();
  });

  var state = {
    querySet: db.queryAll("characters"),
    page: 1,
    rows: 3,
    window: 5
  }

  buildTable();

  function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    var trimmedData = querySet.slice(trimStart, trimEnd)
    var pages = Math.ceil(querySet.length / rows);
    return {
        'querySet': trimmedData,
        'pages': pages,
    };
  }

  function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper');

    wrapper.innerHTML = ``;
	  // console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2));
    var maxRight = (state.page + Math.floor(state.window / 2));

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);
        if (maxLeft < 1){
        	maxLeft = 1;
        }
        maxRight = pages;
    }
    
    for (var page = maxLeft; page <= maxRight; page++) {
      if(page == state.page){
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-danger text-white mx-1">${page}</button>`;
      } else {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-primary text-white mx-1">${page}</button>`;
      }
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-primary text-white mx-1">&#171; First</button>` + wrapper.innerHTML;
    }

    if (state.page != pages && pages > 0) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-primary text-white mx-1">Last &#187;</button>`;
    }

    $('.page').on('click', function() {
        $('#table-body').empty();

        state.page = Number($(this).val());

        buildTable();
    });

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
      const character = db.queryAll("characters", { query: {ID: last_id_num} })[0];
      console.log(character)
      $("#edit-name-text").text("Name = " + character.name);
      $('[name="edit_name"]').val(character.name);
      $('[name="edit_type"][value="' + character.type + '"]').prop('checked', true);
      $('[name="edit_nature"][value="' + character.nature + '"]').prop('checked', true);
      $('[name="edit_role"][value="' + character.role + '"]').prop('checked', true);
      $('[name="edit_description"]').val(character.description);
    });

    $("#charactersEditButton").click(function() {
      $("#confirmEditModal").modal('toggle');
    });

    $("#returnEditButton").click(function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
      $("#edit").hide();
      $("#create").show();
    });

    $("#edit_character").click(function(){
      // Get all the forms elements and their values in one step
      var values = $("#editCharactersForm").serialize();

      var character_values = {};
      values = values.split("&");

      for(i=0; i<values.length; i++){
        const value = values[i].split("=");
        Object.defineProperty(character_values, value[0], {value: decodeURIComponent(value[1])});
      }
    
      console.log(character_values);

      if (db.queryAll("characters", { query: {name: character_values.edit_name} }).length != 0){
        $("#creationModal").modal('toggle');
        return false;
      } else {
        console.log("EDITING CHARACTER WITH ID " + last_id_num);
        db.update("characters", {ID: last_id_num}, function(row){
          row.name = character_values.edit_name;
          row.type = character_values.edit_type;
          row.nature = character_values.edit_nature;
          row.role = character_values.edit_role;
          row.description = character_values.edit_description;

          // the update callback function returns to the modified record
          return row;
        });
        db.commit();
        document.location.reload();
      }
    });
    
    $(".fa-trash-o").click(function(){
      id = $(this).attr("id");
      last_id_num = id.split("-")[1];
      const character = db.queryAll("characters", { query: {ID: last_id_num} })[0];
      $("#delete-name-text").text("Name = " + character.name);
      $("#confirmDeleteModal").modal('toggle');
      $("#" + id).removeClass("text-primary");
      $("#" + id).addClass("text-danger");
    });

    $("#confirmDeleteModal").on('hide.bs.modal', function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
    });

    $("#delete_character").click(function(){
      console.log("DELETING CHARACTER WITH ID " + last_id_num);
      db.deleteRows("characters", {ID: last_id_num});
      db.commit();
      document.location.reload();
    });
  }

  function buildTable() {
    var table = $('#table-body');

    var data = pagination(state.querySet, state.page, state.rows);
    var myList = data.querySet;

    for (var i = 0; i<myList.length; i++) {
        var row = `<tr>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].type}</td>
                  <td>${myList[i].nature}</td>
                  <td>${myList[i].role}</td>
                  <td>${myList[i].description}</td>
                  <td class="text-center">
                    <a href="#"><span id="${'lg_edit-' + myList[i].ID}" class="fa fa-pencil-square-o fa-3x me-1 text-primary "></span></a>
                    <a href="#"><span id="${'lg_delete-' + myList[i].ID}" class="fa fa-trash-o fa-3x ms-1 text-primary "></span></a><br>
                    <a href="behaviors.html#${myList[i].name}" id="${'lg_delete-' + myList[i].ID}" class="btn btn-outline-primary btn-block border border-3 border-primary mt-2" role="button">Behaviors</a>
                  </td>
                  `;
        table.append(row);
    }

    pageButtons(data.pages);
  }
});