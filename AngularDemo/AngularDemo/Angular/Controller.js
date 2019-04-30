myapp.controller('student-controller', function ($scope, studentService) {

    //Loads all Student records when page loads
    loadStudents();

    function loadStudents() {
        var StudentRecords = studentService.getAllStudents();
        StudentRecords.then(function (d) {
            $scope.Students = d.data;
        },
        function () {
            alert("Lỗi!");
        });
    }

    //save Student data 
    $scope.save = function () {
        var Student = {
            MaSV: $scope.MaSV,
            TenSV: $scope.TenSV,
            Email: $scope.Email,
            TenNhom: $scope.TenNhom,
        };
        var saverecords = studentService.save(Student);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                loadStudents();
                alert("Thêm thành công");
                $scope.resetSave();
            }
            else { alert("Thêm không thành công"); }
        },
        function () {
            alert("Lỗi!");
        });
    }

    //reset controls after save operation
    $scope.resetSave = function () {
        $scope.MaSV = '';
        $scope.TenSV = '';
        $scope.Email = '';
        $scope.TenNhom = '';
    }

    //get single record by ID
    $scope.getForUpdate = function (Student) {
        $scope.UpdateMaSV = Student.MaSV;
        $scope.UpdateTenSV = Student.TenSV;
        $scope.UpdateEmail = Student.Email;
        $scope.UpdateTenNhom = Student.TenNhom;
    }

    //get data for delete confirmation
    $scope.getForDelete = function (Student) {
        $scope.UpdateMaSV = Student.MaSV;
        $scope.UpdateTenSV = Student.TenSV;
    }

    //update Student data
    $scope.update = function () {
        var Student = {
            MaSV: $scope.UpdateMaSV,
            TenSV: $scope.UpdateTenSV,
            Email: $scope.UpdateEmail,
            TenNhom: $scope.UpdateTenNhom,
        };
        var updaterecords = studentService.update(Student);
        updaterecords.then(function (d) {
            if (d.data.success === true) {
                loadStudents();
                alert("Cập nhật thành công");
                $scope.resetUpdate();
            }
            else {
                alert("Cập nhật không thành công");
            }
        },
        function () {
            alert("Lỗi!");
        });
    }

    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.UpdateMaSV = '';
        $scope.UpdateTenSV = '';
        $scope.UpdateEmail = '';
        $scope.UpdateTenNhom = '';
    }

    //delete Student record
    $scope.delete = function (UpdateMaSV) {
        var deleterecord = studentService.delete($scope.UpdateMaSV);
        deleterecord.then(function (d) {
            if (d.data.success === true) {
                loadStudents();
                alert("Xóa thành công");
            }
            else {
                alert("Xóa không thành công");
            }
        });
    }
});
