//Service to get data from student mvc controller 
myapp.service('studentService', function ($http) {

    //read students
    this.getAllStudents = function () {
        return $http.get('/Home/GetStudent');
    }

    //add new student
    this.save = function (Student) {
        var request = $http({
            method: 'post',
            url: '/Home/Insert',
            data: Student
        });
        return request;
    }

    //update Student records
    this.update = function (Student) {
        var updaterequest = $http({
            method: 'post',
            url: '/Home/Update',
            data: Student
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateMaSV) {
        return $http.post('/Home/Delete/' + UpdateMaSV);
    }
});
