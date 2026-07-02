jQuery(document).ready(function($){
    function loadProjects(page, append = false){
        var lionistic_year = $('#project_lionistic_year').val();
        var global_cause   = $('#project_global_cause').val();

        $.ajax({
            url: isplProjectsAjax.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'ispl_filter_projects',
                lionistic_year: lionistic_year,
                global_cause: global_cause,
                page: page
            },
            beforeSend: function(){
                if(!append){
                    $('#ispl-projects-grid').html('<p>Loading...</p>');
                }
            },
            success: function(response){
                if(append){
                    $('#ispl-projects-grid').append(response.html);
                } else {
                    $('#ispl-projects-grid').html(response.html);
                }

                if(page < response.max_pages){
                    $('#ispl-projects-load-more').show().data('page', page+1);
                } else {
                    $('#ispl-projects-load-more').hide();
                }
            }
        });
    }

    // Initial load
    loadProjects(1);

    // Auto filter on select change
    $('#project_lionistic_year, #project_global_cause').on('change', function(){
        loadProjects(1, false);
    });

    // Load More button
    $('#ispl-projects-load-more').on('click', function(){
        var page = $(this).data('page');
        loadProjects(page, true);
    });
});
