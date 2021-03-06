(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $location, UserService) {

        var vm = this;
        //Event Handler's declaration
        vm.addForm = addForm;
        vm.selectForm = selectForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.fields = fields;

        vm.index = -1;
        var curUser;

        function init(){
            curUser = null;
            UserService
                .getCurrentUser()
                .then(
                    function (res){
                        curUser = res.data;

                       // console.log(curUser);
                        if(curUser == null){
                            $location.path("/home");
                        }

                        else{
                            FormService
                                .findAllFormsForUser(curUser._id)
                                .then(
                                    function (doc) {
                                      //  console.log(doc);
                                        vm.forms= doc.data;
                                    });
                        }
                    }
                );
        }
        init();

        //Event Handler's implementation
        function addForm(formName){
            //console.log(curUser);
           // console.log(curUser._id);
            if(formName != null) {
               // console.log("formName "+ curUser._id);
                var newForm = {"title": formName, "userId": curUser._id};
                FormService
                    .createFormForUser(curUser._id, newForm)
                    .then(
                        function (doc) {
                            vm.form.formName = null;
                            init();
                        });
            }
        }

        function selectForm(index){
            vm.index = index;

            vm.form = vm.forms[index];
            vm.form.formName = vm.forms[index].title;
        }

        function deleteForm(index){
            FormService.deleteFormById(vm.forms[index]._id);
            init();

        }

        function updateForm(formName){
            if(vm.index != -1 && formName != null)
            {
                var selectedForm = vm.forms[vm.index];
                selectedForm.title = formName;
                FormService
                    .updateFormById(selectedForm._id,selectedForm);
                init();
                vm.index = -1;
                vm.form.formName = null;
            }
        }

        function fields(clickedFormId){
            $location.path("/form/" + clickedFormId + "/fields");
        }
    }
})();