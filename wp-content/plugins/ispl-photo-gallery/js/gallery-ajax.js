
jQuery(document).ready(function($) {
    $('.ispl-album-filters .filter-btn').on('click', function() {
        var album = $(this).data('album');

        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        $('#ispl-gallery-container').fadeTo(200, 0.3);

        $.ajax({
            url: isplGalleryAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'ispl_filter_gallery',
                album: album,
                nonce: isplGalleryAjax.nonce
            },
            success: function(response) {
                $('#ispl-gallery-container').html('<div class="gallery-sizer"></div>' + response);

                var $grid = $('#ispl-gallery-container').masonry({
                    itemSelector: '.gallery-item',
                    columnWidth: '.gallery-sizer',
                    percentPosition: true
                });

                $grid.imagesLoaded().progress(function() {
                    $grid.masonry('layout');
                });

                $('#ispl-gallery-container').fadeTo(200, 1);
            }
        });
    });
});
