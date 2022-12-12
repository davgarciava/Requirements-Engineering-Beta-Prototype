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

  const characters = db.queryAll("characters");
  const characters_options = document.getElementById('character');
  if (characters.length > 0){
    for (var i = 0; i < characters.length; i++){
      characters_options.innerHTML += '<option value="' + characters[i].name + '">' + characters[i].name + '</option>';
    }
  }

  $('#createNarrativesForm').on('reset', function(){
    document.location.reload();
  });

  $('#createNarrativesForm').submit(function() {
    // Get all the forms elements and their values in one step
    var values = $(this).serialize();

    var narrative_values = {};
    values = values.split("&");

    for(i=0; i<values.length; i++){
      const value = values[i].split("=");
      Object.defineProperty(narrative_values, value[0], {value: decodeURIComponent(value[1])});
    }
    
    console.log(narrative_values);

    if (db.queryAll("narratives", { query: {chronological_order: narrative_values.chronological_order} }).length != 0){
      $("#creationModal").modal('toggle');
      return false;
    } else {
      db.insert("narratives", narrative_values);
      db.commit();
    }
  });

  $("#creationModal").on('hide.bs.modal', function(){
    document.location.reload();
  });

  var state = {
    querySet: db.queryAll("narratives"),
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
      const narrative = db.queryAll("narratives", { query: {ID: last_id_num} })[0];
      console.log(narrative)
      $("#edit-order-text").text("Chronological order = " + narrative.chronological_order);
      $('[name="edit_chronological_order"]').val(narrative.chronological_order);
      $('[name="edit_topic"]').val(narrative.topic);
      $('[name="edit_dialog"]').val(narrative.dialog);
      $('[name="edit_emotional_element"]').val(narrative.emotional_element);

      const characters = db.queryAll("characters");
      const characters_options = document.getElementById('edit_character');
      console.log(characters);
      if (characters.length > 0){
        for (var i = 0; i < characters.length; i++){
          characters_options.innerHTML += '<option value=' + characters[i].name + '>' + characters[i].name + '</option>';
        }
      }

      $('option[value="' + narrative.character + '"]').prop('selected', true);
    });

    $("#narrativesEditButton").click(function() {
      $("#confirmEditModal").modal('toggle');
    });

    $("#returnEditButton").click(function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
      $("#edit").hide();
      $("#create").show();
    });

    $("#edit_narrative").click(function(){
      // Get all the forms elements and their values in one step
      var values = $("#editNarrativesForm").serialize();

      var narrative_values = {};
      values = values.split("&");

      for(i=0; i<values.length; i++){
        const value = values[i].split("=");
        Object.defineProperty(narrative_values, value[0], {value: decodeURIComponent(value[1])});
      }
    
      console.log(narrative_values);

      if (db.queryAll("narratives", { query: {chronological_order: narrative_values.edit_chronological_order} }).length != 0){
        $("#creationModal").modal('toggle');
        return false;
      } else {
        console.log("EDITING NARRATIVE WITH ID " + last_id_num);
        db.update("narratives", {ID: last_id_num}, function(row){
          row.chronological_order = narrative_values.edit_chronological_order;
          row.topic = narrative_values.edit_topic;
          row.dialog = narrative_values.edit_dialog;
          row.emotional_element = narrative_values.edit_emotional_element;
          row.character = narrative_values.edit_character;

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
      const narrative = db.queryAll("narratives", { query: {ID: last_id_num} })[0];
      $("#delete-order-text").text("Chronological order = " + narrative.chronological_order);
      $("#confirmDeleteModal").modal('toggle');
      $("#" + id).removeClass("text-primary");
      $("#" + id).addClass("text-danger");
    });

    $("#confirmDeleteModal").on('hide.bs.modal', function(){
      $("#" + id).removeClass("text-danger");
      $("#" + id).addClass("text-primary");
    });

    $("#delete_narrative").click(function(){
      console.log("DELETING NARRATIVES WITH ID " + last_id_num);
      db.deleteRows("narratives", {ID: last_id_num});
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
                  <td>${myList[i].chronological_order}</td>
                  <td>${myList[i].topic}</td>
                  <td>${myList[i].dialog}</td>
                  <td>${myList[i].emotional_element}</td>
                  <td>${myList[i].character}</td>
                  <td class="text-center">
                    <a href="#"><span id="${'lg_edit-' + myList[i].ID}" class="fa fa-pencil-square-o fa-3x me-1 text-primary "></span></a>
                    <a href="#"><span id="${'lg_delete-' + myList[i].ID}" class="fa fa-trash-o fa-3x ms-1 text-primary "></span></a>
                  </td>
                  `;
        table.append(row);
    }

    pageButtons(data.pages);
  }
});