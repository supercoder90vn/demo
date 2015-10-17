"user strict";

var q =$("ul.people li");//<div>.<class> <child_div>
console.log(q);
q =$("ul.people");
q.addClass("newclass").remove("people");
console.log(q);
