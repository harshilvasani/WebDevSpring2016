(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,FormService) {

        var vm = this;

        function init(){
            FieldService
                .getFieldsForForm(FormService.getCurrentFormId())
                .then(
                  function(doc){
                      vm.fields = doc.data;
                  }

                );
        }
        init();

    }
})();