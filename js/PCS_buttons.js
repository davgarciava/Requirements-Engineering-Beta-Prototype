$(document).ready(function(){

    $('.necessity_arises').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "about_practices.html"
                break;
            case 3:
                alert('This event was not specified because it is external to the solution system.');
                break;
        }
    });

    $('.knowing_requirement').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#knowingRequirementModal").modal('toggle');
                break;
            case 3:
                alert('This goal was not specified because the calculation of its KPI formula is external to the solution system, because it depends on a tracking performed by the game designer that is not implemented in the solution.');
                break;
        }
    });

    $('.making_design').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#makingDesignModal").modal('toggle');
                break;
            case 3:
                alert('This goal was not specified because the calculation of its KPI formula is external to the solution system, because it depends on a tracking performed by the game designer that is not implemented in the solution.');
                break;
        }
    });

    $('.developing_game').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#developingGameModal").modal('toggle');
                break;
            case 3:
                alert('This goal was not specified because the calculation of its KPI formula is external to the solution system, because it depends on a tracking performed by the game designer that is not implemented in the solution.');
                break;
        }
    });

    $('.making_game_world').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#makingGameWorldModal").modal('toggle');
                break;
            case 3:
                alert('This goal was not specified because the calculation of its KPI formula is external to the solution system, because it depends on a tracking performed by the game designer that is not implemented in the solution.');
                break;
        }
    });

    $('.target_audience').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#targetAudienceModal").modal('toggle');
                break;
        }
    });

    $('.learning_goal').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#learningGoalModal").modal('toggle');
                break;
        }
    });

    $('.goal').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#goalModal").modal('toggle');
                break;
        }
    });

    $('.functional_requirement').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#functionalRequirementModal").modal('toggle');
                break;
        }
    });

    $('.non_functional_requirement').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#nonFunctionalRequirementModal").modal('toggle');
                break;
        }
    });

    $('.character').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#characterModal").modal('toggle');
                break;
        }
    });

    $('.behavior').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#behaviorModal").modal('toggle');
                break;
        }
    });

    $('.story').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#storyModal").modal('toggle');
                break;
        }
    });

    $('.narrative').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#narrativeModal").modal('toggle');
                break;
        }
    });

    $('.game_design_document').mousedown(function(event) {
        switch (event.which) {
            case 1:
                $("#gameDesignDocumentModal").modal('toggle');
                break;
            case 3:
                
                break;
        }
    });

    $('.identifies_target_audience').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "target_audience.html"
                break;
            case 3:
                $("#targetAudienceSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.specifies_learning_goal').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "learning_goals.html"
                break;
            case 3:
                $("#learningGoalSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.defines_goal').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "goals.html"
                break;
            case 3:
                $("#goalSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.establishes_functional_requirement').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "functional_requirements.html"
                break;
            case 3:
                $("#functionalRequirementSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.establishes_non_functional_requirement').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "non_functional_requirements.html"
                break;
            case 3:
                $("#nonFunctionalRequirementSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.defines_character').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "characters.html"
                break;
            case 3:
                $("#characterBehaviorSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.writes_story').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "story.html"
                break;
            case 3:
                $("#storySpecificationModal").modal('toggle');
                break;
        }
    });

    $('.proposes_narrative').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "narratives.html"
                break;
            case 3:
                $("#narrativeSpecificationModal").modal('toggle');
                break;
        }
    });

    $('.creates_design').mousedown(function(event) {
        switch (event.which) {
            case 1:
                window.location.href = "game_design_document.html"
                break;
            case 3:
                $("#gameDesignDocumentSpecificationModal").modal('toggle');
                break;
        }
    });

});