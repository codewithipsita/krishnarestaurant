jQuery(document).ready(function($){
    function loadImpacts(page, append = false){
        var lionistic_year = $('#lionistic_year').val();
        var global_cause   = $('#global_cause').val();

        $.ajax({
            url: isplImpactsAjax.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'ispl_filter_impacts',
                lionistic_year: lionistic_year,
                global_cause: global_cause,
                page: page
            },
            beforeSend: function(){
                if(!append){
                    $('#ispl-impacts-grid').html('<p>Loading...</p>');
                }
            },
            success: function(response){
                if(append){
                    $('#ispl-impacts-grid').append(response.html);
                } else {
                    $('#ispl-impacts-grid').html(response.html);
                }

                if(page < response.max_pages){
                    $('#ispl-load-more').show().data('page', page+1);
                } else {
                    $('#ispl-load-more').hide();
                }
            }
        });
    }

    // Initial load
    loadImpacts(1);

    // Auto filter on select change
    $('#lionistic_year, #global_cause').on('change', function(){
        loadImpacts(1, false);
    });

    // Load More button
    $('#ispl-load-more').on('click', function(){
        var page = $(this).data('page');
        loadImpacts(page, true);
    });
});
