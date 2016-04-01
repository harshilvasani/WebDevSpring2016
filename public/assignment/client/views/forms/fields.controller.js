(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope,FieldService,FormService, $routeParams) {

        var vm = this;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.selectField = selectField;
        vm.editField = editField;
        $scope.updateForm = updateForm;

        function updateForm(start,end){

            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            FormService
                .findFormById($routeParams.formId)
                .then(
                    function (res){
                        var form = res.data;
                        form.fields = newFields;
                        FormService
                            .updateFormById(form._id,form);

                    }
                );
        }


        function init(){
            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(
                  function(doc){
                      vm.fields = doc.data;
                      $scope.fields =vm.fields;
                  }
                );
        }
        init();

        function addField(fieldType){
            var newField = null;

            console.log(fieldType);
            switch(fieldType){

                case "TEXT":
                    newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;

                case "TEXTAREA":
                    newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;

                case "DATE":
                    newField = {"label": "New Date Field", "type": "DATE"};
                    break;

                case "OPTIONS":
                    newField = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]}

                    break;

                case "CHECKBOXES":
                    newField = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]}

                    break;

                case "RADIOS":
                    newField = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]}
                    break;

            }

            if(newField != null)
            FieldService
                .createFieldForForm($routeParams.formId,newField)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function removeField(fieldId){
            FieldService
                .deleteFieldFromForm($routeParams.formId,fieldId)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function cloneField(field){
            FieldService
                .createFieldForForm($routeParams.formId,field)
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
                .updateField($routeParams.formId,vm.updatedField._id,vm.updatedField)
                .then(
                    function(doc){
                        init();
                    }
                );


        }

    }
})();