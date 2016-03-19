(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,FormService) {

        var vm = this;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.selectField = selectField;
        vm.editField = editField;

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

        function addField(fieldType){
            var newField = null;
            switch(fieldType){

                case "TEXT":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;

                case "TEXTAREA":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;

                case "DATE":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;

                case "OPTIONS":
                    newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]}

                    break;

                case "CHECKBOXES":
                    newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]}

                    break;

                case "RADIOS":
                    newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]}
                    break;

            }

            FieldService
                .createFieldForForm(FormService.getCurrentFormId(),newField)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function removeField(fieldId){
            FieldService
                .deleteFieldFromForm(FormService.getCurrentFormId(),fieldId)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function cloneField(field){
            FieldService
                .createFieldForForm(FormService.getCurrentFormId(),field)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function selectField(field){

            vm.updatedField = field;

            vm.label = field.label;

            if(field.options){
                var val="";
                for(var i in field.options){
                    val = val + field.options[i].label;
                    val+=":"
                    val = val + field.options[i].value;
                    val+="\n";
                }
                vm.options = val;
            }

            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function editField(){
            if(vm.updatedField.options){
                var opts = vm.options.split("\n");
                var opt = [];

                for (var i in opts){
                    var pair = opts[i].split(":");
                    var obj = {"label" :pair[0] ,"value" :pair[1]};
                    opt.push(obj);
                }

                vm.updatedField.options = opt;
            }

            if(vm.updatedField.placeholder){
                vm.updatedField.placeholder  = vm.placeholder
            }

            vm.updatedField.label = vm.label;

            FieldService
                .updateField(FormService.getCurrentFormId(),vm.updatedField._id,vm.updatedField)
                .then(
                    function(doc){
                        init();
                    }
                );


        }

    }
})();