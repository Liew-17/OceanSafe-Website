window.onscroll = function() {scrollFunction()};

let upbutton = document.getElementById("upBtn");

var navLinks = document.querySelectorAll('.nav-link');

const cartlist = JSON.parse(sessionStorage.getItem('localcart')) || [];

function scrollFunction() {
  
  if ( document.documentElement.scrollTop > 80) {
    //nav bar
    document.getElementById("navbar").style.opacity = "90%";
    document.getElementById("navbar").style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    document.getElementById("navbar").style.borderBottom="none";
    navLinks.forEach(function(navLink) {
      navLink.style.padding = '25px 0px';
    });
    //back to Top
    upbutton.style.display = "block";
    //sucessMes(productPage)
    if(window.location.href.includes("products.html")){document.getElementById("successMes").style.top="10%";}
  
  } else {
    //nav bar
    document.getElementById("navbar").style.opacity = "100%";
    document.getElementById("navbar").style.boxShadow = "none";
    document.getElementById("navbar").style.borderBottom="1px solid rgb(230, 230, 230)";
    navLinks.forEach(function(navLink) {
      navLink.style.padding = '40px 0px';   
    });
    //back to Top
    if(window.location.href.includes("products.html")){document.getElementById("successMes").style.top="14%";}
    //sucessMes(productPage)
    upbutton.style.display = "none";
  }
  
  
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

//donation page js
if (window.location.href.includes("donation.html")) {
var checkbox=document.getElementById("termcheckbox");
var buttons = document.getElementsByClassName("btn-2");
var customAmountInput = document.getElementById("customAmount");
let currentDonation=0;

customAmountInput.addEventListener('focus', function() {
  update({ target: buttons[5] });
});

for(const button of buttons){
  button.addEventListener('click',update);
}

function update(event){
  for(const button of buttons){
    button.classList.remove('current');
  }

  event.target.classList.add('current');

  switch(event.target){
    case buttons[0]:customAmountInput.value='5';
    break;
    case buttons[1]:customAmountInput.value='10';
    break;
    case buttons[2]:customAmountInput.value='25';
    break;
    case buttons[3]:customAmountInput.value='50';
    break;
    case buttons[4]:customAmountInput.value='100';
    break;
    case buttons[5]:customAmountInput.focus();
    var temp_value=customAmountInput.value; 
    customAmountInput.value=''; 
    customAmountInput.value=temp_value //made the cursor placed at end
    break;
  }
  
  event.preventDefault();   
}
}

function updateCheckBox(x){
  checkbox.checked = x;
}

function validateD(){
  var c=document.getElementById("customAmount");
  if(c.value<1){
    c.value="";
  }
}

//shop js
function add(){
  var quantity=document.getElementById("quantity");
  q=parseInt(quantity.value);
  quantity.value =  q + 1;
  }

function minus(){
  var quantity=document.getElementById("quantity");
  q=parseInt(quantity.value);
  
  if(q>1){
    quantity.value = q - 1;
  }
}

function validate(){
  var quantity=document.getElementById("quantity");
  var q=parseInt(quantity.value);
  if(isNaN(q)||q<1){
    q=1;
  }
  quantity.value=q;
}

//products here
const productList=[
  {
    name:"Recyclable umbrella cover",
    price:23.00,
    desc:"The inner layer of super absorbent terry cloth absorbs rainwater instantly.The outer layer is made of waterproof oxford cloth, making it easy to store without water leakage.Fully open design, washable and dryable, does not hide dirt and evil practices.Reduce the use of disposable umbrella covers and protect the environment.",
    img:"Image/ImageProduct/product 1.jpg"
  },
  {
    name:"Glass food container",
    price:14.00,
    desc:"Reusable, reducing the use of disposable containers.",
    img:"Image/ImageProduct/product 2.png"
  },
  {
    name:"Original pulp paper box",
    price:10.00,
    desc:"50pcs. 100% eco-friendly for the environment.When reusable containers are not available, paper boxes can be used instead of plastic boxes.Cartons are not reusable and are recommended to be used less often. ",
    img:"Image/ImageProduct/product 3.png"
  },
  {
    name:"Eco Friendly Bottle",
    price:158,
    desc:"When finished drinking, it can be folded to about half its size. It is made of 100% BPA-free food-grade silicone and does not use any plastic. It is a product that is friendly to the human body and the Earth's environment, so you can use it with peace of mind for babies and children's drinks, and it also contributes to environmental conservation.",
    img:"Image/ImageProduct/product 4.jpg"
  },
  {
    name:"Reusable recycle eco bag",
    price:2.00,
    desc:"Eco Friendly: Replace your paper and plastic bags with these cotton reusable bagss.",
    img:"Image/ImageProduct/product 5.png"
  },
  {
    name:"Canvas bag",
    price:10.00,
    desc:"Recyclable items, this product can replace single-use plastic bags.",
    img:"Image/ImageProduct/product 6.jpg"
  },
  {
    name:"Clean our Ocean T-shirt",
    price:30.00,
    desc:"",
    img:"Image/ImageProduct/product 7.jpg"
  },
  {
    name:"Protect our oceans T-shirt",
    price:45.00,
    desc:"",
    img:"Image/ImageProduct/product 8.png"
  },
  {
    name:"Non-woven environmentally friendly bags",
    price:1.30,
    desc:"If placed outdoors, it will decompose on its own after 90 days and will not pollute the environment. ",
    img:"Image/ImageProduct/product 9.png"
  },
  {
    name:"Sea Friend T-Shirt",
    price:25.00,
    desc:"",
    img:"Image/ImageProduct/product 10.png"
  },
];



if (window.location.href.includes("products.html")){
function updateProduct() {
  var pName=document.getElementById("productName");
  var pPrice=document.getElementById("productPrice");
  var pDesc=document.getElementById("productDescription");
  var pImage=document.getElementById("productImage");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  pName.innerHTML=productList[productId].name;
  pPrice.innerHTML="RM "+productList[productId].price.toFixed(2);
  pDesc.innerHTML=productList[productId].desc;
  pImage.src=productList[productId].img;
  randomProduct(productId);
  
}

window.onload = updateProduct();


}

function addtocart(){
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  var pQuantity=document.getElementById("quantity");
  cartlist.push({ id: productId, quantity: parseInt(pQuantity.value) });
  
  //store in sessionStorage 
  sessionStorage.setItem('localcart', JSON.stringify(cartlist));
  
  var message=document.getElementById("successMes");
  message.classList.add('showing');
  setTimeout(function() {
    message.classList.remove('showing');
  }, 3000);
  
}

  function updateCart() {

    var cart=document.getElementById("shopping-items");
    var cartTitle=document.getElementById("carttitle");
    cart.innerHTML='';

    var t=0.0;
    var tax=0.0;
    var total=0.0;

    if(cartlist.length==0){
      var nothing=document.createElement("h3");
      nothing.innerHTML="Your cart is empty !"
      cart.appendChild(nothing);
      var line=document.createElement("hr");
      line.classList.add('my-4');
      cart.appendChild(line);
      cartTitle.innerHTML="Your Item";
    }
    else{
      cartTitle.innerHTML="Your Item ("+cartlist.length+")";
      
    }

    for(let i=0;i<cartlist.length;i++){
      var newRow = document.createElement("div");
      newRow.classList.add('row', 'cart-bodys');

      var col1=document.createElement("div");
      col1.classList.add('col-2','col-lg-2','preview');

      var Image=document.createElement("img");
      Image.src=productList[cartlist[i].id].img;
      col1.appendChild(Image);

      newRow.appendChild(col1);

      var n=productList[cartlist[i].id].name;
      var p=parseFloat(productList[cartlist[i].id].price);
      var q=parseFloat(cartlist[i].quantity);
      var st=p*q;
      t+=st;
      p=p.toFixed(2);
      st=st.toFixed(2);
      
      for(let j=4;j>0;j--){
        var repeatCol=document.createElement("div");
        if(j==4){
        repeatCol.classList.add('col-3','col-lg-3','cart-text');}
        else{
        repeatCol.classList.add('col','col-lg-2','cart-text');}
          
        var itemDetails=document.createElement("h6");
        switch(j){
          case 4:itemDetails.innerHTML=n;
          break;
          case 3:itemDetails.innerHTML="RM "+p;
          break;
          case 2:itemDetails.innerHTML=q;
          break;
          case 1:itemDetails.innerHTML="RM "+st;
          break;
        }

        repeatCol.appendChild(itemDetails);

        newRow.append(repeatCol);
        
      }

      var btnbox=document.createElement("div");
      btnbox.classList.add('col','col-lg-1','cart-text');
      var removebtn=document.createElement("button");
      removebtn.classList.add('removebtn');
      removebtn.innerHTML="remove";
      btnbox.appendChild(removebtn);
      newRow.append(btnbox);
      removebtn.addEventListener('click', function() {
        remove(i)
      });

      
      cart.appendChild(newRow);

      var line=document.createElement("hr");
      line.classList.add('my-4');
      cart.appendChild(line);
     
    }

    //total

    tax=t*0.05;
    total=t+tax;
    total=parseFloat(total).toFixed(2);
    tax=parseFloat(tax).toFixed(2);
    t=parseFloat(t).toFixed(2);

    document.getElementById("totalNoTax").innerHTML="RM "+t;
    document.getElementById("Tax").innerHTML="RM "+tax;
    document.getElementById("Total").innerHTML="RM "+total;
    
  }

  function remove(n){
    var cart=document.getElementById("shopping-items");
    cart.children[2*n].classList.add('removing');
  
    setTimeout(function() {
  
      cartlist.splice(n,1);
      sessionStorage.setItem('localcart', JSON.stringify(cartlist));
      updateCart();

    }, 500);
  
  }

  function removeAll(){
    var cart=document.getElementById("shopping-items");
    for(let i=0;i<cartlist.length;i++){
      cart.children[2*i].classList.add('removing');
    }

    setTimeout(function() {
  
      cartlist.length=0;
      sessionStorage.setItem('localcart', JSON.stringify(cartlist));
      updateCart();

    }, 300);
    
 
  }

if (window.location.href.includes("cart.html")){
  window.onload = updateCart();
}

if(window.location.href.includes("shoplist.html")){
  window.onload=updateList();
}

function updateList(){
  var links=document.getElementsByName("productL[]");
  var names=document.getElementsByName("productN[]");
  var prices=document.getElementsByName("productP[]");
  var Imgs=document.getElementsByName("productI[]");
  var box=document.getElementsByName("productB[]");
  var total=document.getElementById("totalitem");
  total.innerHTML=productList.length+" items";


  for(let i=0;i<productList.length;i++){
    links[i].setAttribute("href", "products.html?id=" + (i));
    names[i].innerHTML=productList[i].name;
    prices[i].innerHTML="RM "+productList[i].price.toFixed(2);
    Imgs[i].src=productList[i].img;
  }

  //delete extra boxes
  for(let j=productList.length;j<box.length;j++){
    box[j].innerHTML="";
  }

}

if(window.location.href.includes("shop.html")){
  window.onload=feature();
}

function feature(){
  var links=document.getElementsByName("productL[]");
  var names=document.getElementsByName("productN[]");
  var prices=document.getElementsByName("productP[]");
  var Imgs=document.getElementsByName("productI[]");
  const feature=[0,2,4,5];

  for(let i=0;i<names.length;i++){
    links[i].setAttribute("href", "products.html?id=" + (feature[i]));
    names[i].innerHTML=productList[feature[i]].name;
    prices[i].innerHTML="RM "+productList[feature[i]].price.toFixed(2);
    Imgs[i].src=productList[feature[i]].img;
  }

}

function randomProduct(ex){
  var links=document.getElementsByName("productL[]");
  var names=document.getElementsByName("productN[]");
  var prices=document.getElementsByName("productP[]");
  var Imgs=document.getElementsByName("productI[]");
  const randomProductslist=getrand(3,productList.length,ex);

  for(let i=0;i<names.length;i++){
    links[i].setAttribute("href", "products.html?id=" + (randomProductslist[i]));
    names[i].innerHTML=productList[randomProductslist[i]].name;
    prices[i].innerHTML="RM "+productList[randomProductslist[i]].price.toFixed(2);
    Imgs[i].src=productList[randomProductslist[i]].img;
  }

}

function getrand(amt,max,exclude){
  const result=[];
  for(let i=0;i<amt;i++){
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * max);
    } while (result.includes(randomNumber)||randomNumber==exclude);
    result.push(randomNumber);
  }
  return result;
}

//update cart number
if (!window.location.href.includes("cart.html")){
  window.onload=updateCartNum();
}

function updateCartNum(){
  var number=document.getElementById("num");
  if(cartlist.length==0){
      number.style.display="none";
  }
  else if(cartlist.length>9){
    number.innerHTML="9+";
  }
  else{
  number.style.display="";
  number.innerHTML=cartlist.length;
  }
}