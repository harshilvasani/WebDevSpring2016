(function(){
    angular
        .module("divSortable", [])
        .directive("divSortable", divSortable);

    function divSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;

            $(element).sortable({

                axis: jgaAxis,
                start: function(event, ui) {
                    console.log(event);
                    //console.log(ui.item[0].children[1]);
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                  /*  var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;*/
                    scope.$apply(function () {
                        scope.updateForm(start,end);
                    });
                }
            });
        }
        return {
            link: link
        }
    }
})();