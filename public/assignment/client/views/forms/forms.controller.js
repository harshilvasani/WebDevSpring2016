(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location, UserService) {

        //Event Handler's declaration
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;


        $scope.index = -1;
        var curUser = UserService.getCurrentUser();

        if(UserService.getCurrentUser() == null){
            $location.path("/home");
        }

        else{
            FormService.findAllFormsForUser(curUser._id,renderUserForms);
        }

        function renderUserForms(userAllForms) {
            $scope.forms = userAllForms;
        }

        //Event Handler's implementation
        function addForm(formName){
            if(formName != null) {
                var newForm = {"_id": null, "title": formName, "userId": null};
                FormService.createFormForUser(UserService.getCurrentUser()._id, newForm, renderAddForm);
            }
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            $scope.forms.push(newForm);
        }

        function selectForm(index){
            $scope.index = index;
            var selectedForm = $scope.forms[index];
            $scope.formName = selectedForm.title;
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id,renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderUserForms);
        }

        function updateForm(formName){
            if($scope.index != -1 && formName != null)
            {
                var selectedForm = $scope.forms[$scope.index];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id,selectedForm,renderUpdateForm);
                $scope.index = -1;
                $scope.formName = null;
            }
        }

        function renderUpdateForm (newForm){
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderUserForms);
        }
    }
})();