(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location) {

        var currentUser;
        var currentUserAllForms;
        var allForms;
        var selectedForm = null;

        if($rootScope == null){
            $location.path("/home");
        }

        else{
            currentUser = $rootScope;
            allForms = FormService.forms;
            updateCurrentUserAllForms(allForms);
        }

        function updateCurrentUserAllForms(allForms){
            currentUserAllForms = [];

            for(i in allForms){
                if(allForms[i].userId == currentUser._id){
                    currentUserAllForms.push(allForms[i]);
                }
            }

            $scope.forms = currentUserAllForms;
        }

        //Event Handler's declaration
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        //Event Handler's implementation
        function addForm(formName){
            var newForm = {"_id": null, "title": formName, "userId": null};
            FormService.createFormForUser(currentUser._id,newForm,renderAddForm);
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            currentUserAllForms.push(newForm)
            $scope.forms = currentUserAllForms;
        }

        function selectForm(index){
            selectedForm = currentUserAllForms[index];
            $scope.formName = selectedForm.title;

        }

        function deleteForm(index){
            FormService.deleteFormById(currentUserAllForms[index]._id,renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            updateCurrentUserAllForms(allforms);
        }

        function updateForm(formName){

            if(selectForm != null)
            {
                selectedForm.title = formName;
                FormService.updateFormById(selectForm._id,selectedForm,renderUpdateForm);
                selectedForm = null;
                $scope.formName = null;
            }
        }

        function renderUpdateForm (newForm){
            updateCurrentUserAllForms(FormService.forms);
        }
    }
})();