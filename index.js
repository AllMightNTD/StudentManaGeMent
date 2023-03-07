class SinhVien{
    constructor(MaSV , TenSV , NgaySinh , GioiTinh , Khoa){
        this.MaSV = MaSV;
        this.TenSV = TenSV;
        this.NgaySinh = NgaySinh;
        this.GioiTinh = GioiTinh;
        this.Khoa = Khoa;
    }

    
}

class Khoa{
    constructor(MaKhoa , TenKhoa){
        this.MaKhoa = MaKhoa;
        this.TenKhoa = TenKhoa;
    }
}
let MaSV = document.getElementById("txtMaSV")
let TenSV = document.getElementById("txtTenSV")
let NgaySinh = document.getElementById("txtNgaySinh")
let GioiTinh = document.querySelectorAll('input[name="gender"]');
console.log(GioiTinh);
let TenKhoa = document.getElementById("drpKhoa")
let Makhoa = document.getElementById("drpMaKhoa")
let searchInput = document.getElementById("searchInput")
console.log(searchInput);
let table = document.getElementById('table');
// Lấy dữ liệu trong LocalStorage và render ra 
let studentList = localStorage.getItem("listStudent")
// Check dữ liệu từ localStorage , nếu có thì lấy không thì gán thành mảng rỗng 
if(studentList){
    liststudent = JSON.parse(studentList);
    console.log(liststudent);
    for(let i = 0; i < liststudent.length; i++){
        let sinhvien = liststudent[i]
        let row = document.createElement('tr')
        row.innerHTML = `
        <td><input type="checkbox" name="studentCheckbox"></td>
        <td>${sinhvien.MaSV}</td>
        <td>${sinhvien.TenSV}</td>
        <td>${sinhvien.NgaySinh}</td>
        <td>${sinhvien.GioiTinh}</td>
        <td>${sinhvien.Khoa.MaKhoa}</td>
        <td>${sinhvien.Khoa.TenKhoa}</td>
        <td>
        <button onClick = "SuaSinhVien('${sinhvien.MaSV}')">Sửa</button>
        <button onClick ="XoaSinhVien('${sinhvien.MaSV}')">Xóa</button>
       </td>
       `
       table.appendChild(row);
    }
 
}
else{
    liststudent = []
}

function Clear(){
    MaSV.readOnly = false
    MaSV.value = ""
    TenSV.value = ""
    NgaySinh.value = ""
    TenKhoa.value = ""
    Makhoa.value = ""
    for(i = 0 ; i < GioiTinh.length ; i ++){
        GioiTinh[i].checked = false;
    }
}

// Update Student
function SuaSinhVien(masv){
   let index = liststudent.findIndex( sinhvien => sinhvien.MaSV === masv);
   console.log(index);
   console.log(masv);
   if(index !== -1){
      MaSV.readOnly = true
      MaSV.value = liststudent[index].MaSV;
      TenSV.value = liststudent[index].TenSV;
      NgaySinh.value = liststudent[index].NgaySinh;
      for(i = 0 ; i < GioiTinh.length ; i ++){
        if(GioiTinh[i].value === liststudent[index].GioiTinh){
            GioiTinh[i].checked = true;
            break;
        }
      }
      TenKhoa.value = liststudent[index].Khoa.TenKhoa;
      Makhoa.value = liststudent[index].Khoa.MaKhoa;
   }
}

// Delete Student
function XoaSinhVien(masv){
    console.log(masv);
    const result = confirm("Are you sure you want to delete")
    if(result == true){
        let index = liststudent.findIndex (sinhvien => sinhvien.MaSV === masv);
        if(index !== -1){
            liststudent.splice (index, 1);
            localStorage.setItem("listStudent" , JSON.stringify(liststudent))
            table.deleteRow(index + 1);
        }  
    }
    else{
        console.log('Không thể xóa');
    }
}

// Update new Student
function CapNhatSinhVien(){
    if (MaSV.value === '' || TenSV.value === '' || TenKhoa.value === '' || Makhoa.value === '') {
        alert('Please input a value if you want to update')
      } else {
        let GioiTinhCheck;
        for(i = 0 ; i < GioiTinh.length ; i ++){
            if(GioiTinh[i].checked){
                GioiTinhCheck = GioiTinh[i].value;
            }
        }
        let KhoaStudent = new Khoa(TenKhoa.value, Makhoa.value);
        let sinhvien = new SinhVien(MaSV.value, TenSV.value, NgaySinh.value, GioiTinhCheck, KhoaStudent);
    
        // Lấy giá trị MSV hiện có 
        let index = liststudent.findIndex(sinhvien => sinhvien.MaSV === MaSV.value);
        console.log(index);
        if (index !== -1) {
          // Replace old record with new record
          liststudent.splice(index, 1, sinhvien);
    
          // Update table
          table.deleteRow(index + 1);
          table.insertAdjacentHTML('beforeend', `
            <tr>
              <td><input type="checkbox"></td>
              <td>${sinhvien.MaSV}</td>
              <td>${sinhvien.TenSV}</td>
              <td>${sinhvien.NgaySinh}</td>
              <td>${sinhvien.GioiTinh}</td>
              <td>${sinhvien.Khoa.MaKhoa}</td>
              <td>${sinhvien.Khoa.TenKhoa}</td>
              <td>
                <button onclick="SuaSinhVien('${sinhvien.MaSV}')">Sửa</button>
                <button onClick ="XoaSinhVien('${sinhvien.MaSV}')">Xóa</button>
              </td>
            </tr>
          `);
        }
        else{
            alert('Not Update Student')
        }
        Clear();
        localStorage.setItem('listStudent', JSON.stringify(liststudent));
      }
}


// Add New Student
function addNew(){
    MaSV.readOnly = false
    if(MaSV.value === '' || TenSV.value === '' || TenKhoa.value === '' || Makhoa.value === ''){
        alert('Please input a value if you want to update')
        return false
    }
    // Check tồn tại sinh viên
    const check = liststudent.some((sinhvien) => sinhvien.MaSV === MaSV.value);
    if(check === true){
        alert('This Student is already exist')
        return false
    }
    else{
        let GioiTinhCheck;
        for(i = 0 ; i < GioiTinh.length ; i ++){
            if(GioiTinh[i].checked){
                GioiTinhCheck = GioiTinh[i].value;
            }
        }
        let KhoaStudent = new Khoa(TenKhoa.value, Makhoa.value);
        let sinhvien = new SinhVien(MaSV.value, TenSV.value, NgaySinh.value, GioiTinhCheck , KhoaStudent);
        liststudent.push(sinhvien)
        // Tìm index của mảng 
        let newStudentList = liststudent.length - 1;
        console.log(newStudentList);
        localStorage.setItem("listStudent" ,JSON.stringify(liststudent));
        viewListTable(newStudentList)
        Clear();
    }
  
}
let checkOn = 0;

// Delete Many Student
function DeleteAllStudent(){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const indexes = [];

    checkboxes.forEach(function (checkbox) {
        const row = checkbox.parentElement.parentElement;
        console.log(row);
        // rowIndex : chỉ mục của hàng 
        // rowIndex : chạy từ 1 
        const index = row.rowIndex - 1;
        indexes.push(index);
        table.deleteRow(row.rowIndex);
    });

    // Sắp xếp lại chỉ mục sau khi xóa 
    indexes.sort(function (a, b) {
        return b - a;
    });

    indexes.forEach(function (index) {
        liststudent.splice(index, 1);
    });

    localStorage.setItem("listStudent", JSON.stringify(liststudent));

    alert("Xóa sinh viên thành công!");
}

function viewListTable(index) {
      let sinhVien = liststudent[index];
      console.log(liststudent[index]);
      let row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" name="studentCheckbox"></td>
        <td>${sinhVien.MaSV}</td>
        <td>${sinhVien.TenSV}</td>
        <td>${sinhVien.NgaySinh}</td>
        <td>${sinhVien.GioiTinh}</td>
        <td>${sinhVien.Khoa.MaKhoa}</td>
        <td>${sinhVien.Khoa.TenKhoa}</td>
        <td>
        <button onclick="SuaSinhVien('${sinhVien.MaSV}')">Sửa</button>
        <button onClick ="XoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
       </td>
      `;
      table.appendChild(row);
}

// Tìm Kiếm
function SearchDataStudent(){
    const searchValue = searchInput.value.trim();
    
    // // Tìm kiếm theo Mã sinh viên
    const searchByStudentCode = (student) => {
        return student.MaSV.toLowerCase().includes(searchValue.toLowerCase());
    };

    // Search by Date
    const searchNgaySinhCode = (student) => {
        return student.NgaySinh.toLowerCase().includes(searchValue.toLowerCase())
    }
    
    // Search by Name
    const searchByStudentName = (student) => {
        return student.TenSV.toLowerCase().includes(searchValue.toLowerCase());
    };
    
    // // Tìm kiếm theo Khoa
    // Search by Department
    const searchByDepartment = (student) => {
        return student.Khoa.TenKhoa.toLowerCase().includes(searchValue.toLowerCase()) || student.Khoa.MaKhoa.toLowerCase().includes(searchValue.toLowerCase());
    };

    // Kết hợp các hàm tìm kiếm và trả về kết quả
    const searchResult = liststudent.filter(student => {
        return (
          searchByStudentCode(student) ||
          searchByStudentName(student) ||
          searchNgaySinhCode(student) ||
          searchByDepartment(student)
        );
      });
    while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      
      // Tạo hàng mới cho mỗi sinh viên trong kết quả tìm kiếm
      for (let i = 0; i < searchResult.length; i++) {
        // Lấy kết quả sinh viên và tạo hàng mới
        let sinhVien = searchResult[i];
        let row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="checkbox" name="studentCheckbox"></td>
          <td>${sinhVien.MaSV}</td>
          <td>${sinhVien.TenSV}</td>
          <td>${sinhVien.NgaySinh}</td>
          <td>${sinhVien.GioiTinh}</td>
          <td>${sinhVien.Khoa.MaKhoa}</td>
          <td>${sinhVien.Khoa.TenKhoa}</td>
          <td>
            <button onclick="SuaSinhVien('${sinhVien.MaSV}')">Sửa</button>
            <button onClick="XoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
          </td>
        `;
        table.appendChild(row);
      }

}


