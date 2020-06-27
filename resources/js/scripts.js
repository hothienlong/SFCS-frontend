/*------------------------------------------------------*/
/*-----------------------Cart---------------------------*/
/*------------------------------------------------------*/
//sau khi thanh toán cần lưu vào db và chuyển vào nhà bếp
var idComga = 1;
var idComcho = 2;
var sttGlobal = 0;
var count=0;

function AddToCart(){
    alert("Count = " + count);
    count++;
}

//hàm chỉ chạy 1 lần đầu tiên để gán sự kiện
function SetupEvent() {
    var add_comga_btn = document.getElementById("add-comga-btn");
    add_comga_btn.onclick = ThemComGa;
    var add_comcho_btn = document.getElementById("add-comcho-btn");
    add_comcho_btn.onclick = ThemComCho;

}

function ThemComGa() {
    AddOneOrderToCart(idComga);
}

function ThemComCho() {
    AddOneOrderToCart(idComcho);
}

function AddOneOrderToCart(orderID) {
    sttGlobal++;
    if (orderID == idComcho)
        AddOrder(sttGlobal, "./resources/img/banhmi.jpg",
            "Cơm chó", 1, "20000VND", orderID);
    else if(orderID == idComga)
        AddOrder(sttGlobal, "./resources/img/comga.jpg",
        "Cơm gà", 1, "30000VND", orderID)
}

function AddOrder(STT, Anh, TenMonAn, Suat, Gia, ID) {
    var tBodyS = document.getElementsByTagName("tBody");
    //nếu order id đã tồn tại thì cộng vào suất -> thành tiền
    var tRowS = document.getElementsByClassName("order-in-list");
    for (var i = 0; i < tRowS.length; i++) {
        var tDataS = tRowS[i].getElementsByTagName("td");
        // var rowID = parseInt(tDataS[0].innerHTML);
        var rowID = parseInt(tRowS[i].getAttribute("orderID"));
        if (rowID == ID) {
            var newSuat = parseInt(tDataS[3].innerHTML) + Suat;
            tDataS[3].innerHTML = newSuat;
            tDataS[5].innerHTML = newSuat * parseInt(Gia) + "VND"; //

            //tính tiền
            var totalMoneyObj = document.getElementById("total-money");
            totalMoneyObj.innerHTML = parseInt(totalMoneyObj.innerHTML)
                + Suat * parseInt(Gia) + " VND";
            return;
        }
    }

    var newTR = document.createElement("tr");
    newTR.setAttribute("class", "order-in-list");
    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    td0.innerHTML = STT;

    addIMG(td1, Anh, 200, 160);
    td2.innerHTML = TenMonAn;
    td3.innerHTML = Suat;
    td4.innerHTML = Gia;
    td5.innerHTML = parseInt(Suat) * parseInt(Gia) + "VND";
    addBtnXoa(newTR, td6, "#", "Xóa");//thêm thẻ a có chức năng xóa order (newTR)
    newTR.appendChild(td0)
    newTR.appendChild(td1);
    newTR.appendChild(td2);
    newTR.appendChild(td3);
    newTR.appendChild(td4);
    newTR.appendChild(td5);
    newTR.appendChild(td6);
    newTR.setAttribute("orderID",ID);//lưu id cho mỗi hàng mà ko hiển thị lên giao diện
    tBodyS[0].appendChild(newTR);

    //tính tiền
    var totalMoneyObj = document.getElementById("total-money");
    totalMoneyObj.innerHTML = parseInt(totalMoneyObj.innerHTML)
        + Suat * parseInt(Gia) + " VND";
}


function addIMG(inout, src, width, height) {
    var theIMG = document.createElement("img");
    theIMG.src = src;
    theIMG.width = width;
    theIMG.height = height;
    inout.appendChild(theIMG);
}

function addBtnXoa(newTR, inout, href, text) {
    var theA = document.createElement("a");
    theA.href = href;
    theA.text = text;
    theA.onclick = function() //remove order
    {
        var tBody = document.getElementsByTagName("tBody");
        tBody[0].removeChild(newTR);

        //tính tiền
        var totalMoneyObj = document.getElementById("total-money");
        var thanhTien = newTR.getElementsByTagName("td")[5];
        totalMoneyObj.innerHTML = parseInt(totalMoneyObj.innerHTML) - parseInt(thanhTien.innerHTML) + " VND";
    };
 
    inout.appendChild(theA);
}


// function RemoveOrderBySTT(idOrder){
//     var tRowS = document.getElementsByClassName("order-in-list");
    
//     for(var i=0;i<tRowS.length;i++){
//         var tDataS = tRowS[i].getElementsByTagName("td");
//         var rowID = parseInt(tDataS[0].innerHTML);
//         if(idOrder == rowID){
//             tRowS[i].parentNode.removeChild(tRowS[i]);
        
//         //tính tiền
//         var totalMoneyObj = document.getElementById("total-money");
//         var thanhTien = tDataS[5];
//         totalMoneyObj.innerHTML = parseInt(totalMoneyObj.innerHTML) - parseInt(thanhTien.innerHTML) + " VND";
//         }
//     }
// }

function RemoveAllOrder(){
    tRowS = document.getElementsByClassName("order-in-list"); 
    tRowLength = tRowS.length;//length bị đổi mỗi lần xóa 1 phần tử
    
    for(var i=0;i<tRowLength;i++){
        //tính tiền
        var totalMoneyObj = document.getElementById("total-money");
        var tDataS = tRowS[0].getElementsByTagName("td");
        var thanhTien = tDataS[5];
        totalMoneyObj.innerHTML = parseInt(totalMoneyObj.innerHTML) 
                                - parseInt(thanhTien.innerHTML) + " VND";
        //xóa hàng   
        //luôn luôn xóa hàng đầu tiên
        //vì sau khi xóa sẽ dời lên đầu
        tRowS[0].parentNode.removeChild(tRowS[0]);
    }
    sttGlobal = 0;
}

function CheckOut(){
    var totalMoneyObj = document.getElementById("total-money");
    var total = parseInt(totalMoneyObj.innerHTML);
    
    alert("Bạn đã thanh toán thành công! Hết tất cả là " + total + "VND. Mời bạn mua sắm tiếp!");
    RemoveAllOrder();
}

/*------------------------------------------------------*/
/*-----------------------Home---------------------------*/
/*------------------------------------------------------*/
//tạm giữ db ảo,add food (ở manage food stock) chưa cần thêm vào menu,chỉ cập nhật vào db
//add to cart lưu order vào db giỏ hàng, để đồng bộ với cart.html



/*------------------------------------------------------*/
/*-----------------------Stock--------------------------*/
/*------------------------------------------------------*/
//thêm thức ăn lưu vào db, cập nhật tình trạng còn-hết

/*------------------------------------------------------*/
/*----------------------Cook-order----------------------*/
/*------------------------------------------------------*/
//chỉ 1 tk cho cook
function PutOneOrderToInQueue(){
    PutOrderToInQueue(2, 312, "Đồng chí X");
}

function PutOrderToInQueue(orderID, customerID, userName){
    var tBodyS = document.getElementsByTagName("tBody");

    var newTR = document.createElement("tr");
    newTR.setAttribute("class", "order-in-list");
    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    
    td0.textContent = orderID;
    td1.textContent = customerID;
    td2.textContent = userName;
    addBtnDetail(td3, "#", "Detail");
    td4.textContent = "In Queue";
    addSelectState(td5);
    newTR.appendChild(td0);
    newTR.appendChild(td1);
    newTR.appendChild(td2);
    newTR.appendChild(td3);
    newTR.appendChild(td4);
    newTR.appendChild(td5);
    tBodyS[0].appendChild(newTR);
}


function addBtnDetail(inout, href, text) {
    var theA = document.createElement("a");
    theA.href = href;
    theA.text = text;
    inout.appendChild(theA);
}

function addSelectState(inout){
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var option3 = document.createElement("option");
    option1.text = "In Queue";
    option1.onclick = function(){
        var row = inout.parentNode;
        var TD = row.getElementsByTagName("td");
        TD[4].textContent = "In Queue";
    };
    option2.text = "In Progress";
    option2.onclick = function(){
        var row = inout.parentNode;
        var TD = row.getElementsByTagName("td");
        TD[4].textContent = "In Progress";
    };
    option3.text = "Finished";
    option3.onclick = function(){
        var row = inout.parentNode;
        var TD = row.getElementsByTagName("td");
        TD[4].textContent = "Finished";
    };
    var select = document.createElement("select");
    select.name = "state";
    select.id = "state";
    select.multiple = "multiple";
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    inout.appendChild(select);
}


