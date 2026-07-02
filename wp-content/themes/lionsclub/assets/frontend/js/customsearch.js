

// $(function() {
//     $(".lionsearchBox").autocomplete({
//         source: function(request, response) {
//             $.ajax({
//                 url: "/search/autocomplete",
//                 dataType: "json",
//                 data: {
//                     term: request.term
//                 },
//                 success: function(data) {
//                     response($.map(data, function(item) {
//                         return { label: item.value, value: item.id };
//                     }));
//                 }
//             });
//         },
//         minLength: 3,
//         select: function(event, ui) {
//             window.location.href = '/member/' + ui.item.value;
//         }
//     });
// });
$(function() {
    $(".lionsearchBox").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "/search/autocomplete",
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function(data) {
                    response($.map(data, function(item) {
                        // Format the label with full name, position, and district
                        var label = item.full_name + " (" + item.position + ", " + item.district + ")";
                        return { label: label, value: item.id };
                    }));
                }
            });
        },
        minLength: 3,
        select: function(event, ui) {
            window.location.href = '/member/' + ui.item.value;
        }
    });
});