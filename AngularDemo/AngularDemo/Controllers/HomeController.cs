using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularDemo.Models;

namespace AngularDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetStudent()
        {
            using (AngularEntities db = new AngularEntities())
            {
                List<Student> stuList = db.Students.ToList();
                return Json(stuList, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Insert(Student student)
        {
            if (student != null)
            {
                using (AngularEntities db = new AngularEntities())
                {
                    db.Students.Add(student);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                return Json(new { success = false });
            }
        }


        [HttpPost]
        public JsonResult Update(Student updatedStudent)
        {
            using (AngularEntities db = new AngularEntities())
            {
                Student tontaiSinhVien = db.Students.Find(updatedStudent.MaSV);
                if (tontaiSinhVien == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    tontaiSinhVien.TenSV = updatedStudent.TenSV;
                    tontaiSinhVien.Email = updatedStudent.Email;
                    tontaiSinhVien.TenNhom = updatedStudent.TenNhom;
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (AngularEntities db = new AngularEntities())
            {
                Student student = db.Students.Find(id);
                if (student == null)
                {
                    return Json(new { success = false });
                }
                db.Students.Remove(student);
                db.SaveChanges();
                return Json(new { success = true });
            }

        }
    }
}