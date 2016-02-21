(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location) {

        //Event Handler's declaration
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        var currentUser = null;
        var currentUserAllForms = [];
        var selectedFormIndex = -1;

        if($rootScope == null){
            $location.path("/home");
        }

        else{
            currentUser = $rootScope;
            FormService.findAllFormsForUser(currentUser._id,renderUserForms);
        }

        function renderUserForms(userAllForms) {
            $scope.forms = userAllForms;
            currentUserAllForms = userAllForms;
        }

        //Event Handler's implementation
        function addForm(formName){
            if(formName != null) {
                var newForm = {"_id": null, "title": formName, "userId": null};
                FormService.createFormForUser(currentUser._id, newForm, renderAddForm);
            }
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            currentUserAllForms.push(newForm)
            $scope.forms = currentUserAllForms;
        }

        function selectForm(index){
            selectedFormIndex = index;
            var selectedForm = currentUserAllForms[index];
            $scope.formName = selectedForm.title;
        }

        function deleteForm(index){
            FormService.deleteFormById(currentUserAllForms[index]._id,renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            FormService.findAllFormsForUser(currentUser._id,renderUserForms);
        }

        function updateForm(formName){
            if(selectedFormIndex != -1 && formName != null)
            {
                var selectedForm = currentUserAllForms[selectedFormIndex];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id,selectedForm,renderUpdateForm);
                selectedFormIndex = -1;
                $scope.formName = null;
            }
        }

        function renderUpdateForm (newForm){
            FormService.findAllFormsForUser(currentUser._id,renderUserForms);
        }
    }
})();