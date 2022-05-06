console.log("user id: "+ userid);
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:7000/getPosts");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = '';
        const objects = JSON.parse(this.responseText);
        // for (let object of objects) {
        console.log("Length = " , Object.keys(objects).length)
        for(var i=Object.keys(objects).length;i>0;i--){
        console.log("i = ",i)
          var object = objects[i-1];
          trHTML += '<td>'+object['Message']+'</td>';
          getId(userid);
          trHTML += '<td>'+object['CreatedAt']+'</td>';
          if(object["CreatedByID"] == userid){
            trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['PostID']+')"><i class="bi bi-trash3"></i></button></td>';
          }
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }

  loadTable();

  function getId(userid){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:2000/getUsername");
    xhttp.send(JSON.stringify({
      "UserID": userid
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };
  }

  function showUserCreateBox() {
    Swal.fire({
      title: 'Create Post',
      html:
        '<input id="id" type="hidden">' +
        '<input id="cr_post" class="swal2-input" placeholder="Post Message">' ,
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }

  function userCreate() {
    const post = document.getElementById("cr_post").value;
    var createdby = userid

    const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:7000/createPosts");
    xhttp.open("POST", "/posts");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log("post " + post)
    xhttp.send(JSON.stringify({
      "Message": post, "CreatedBy": createdby
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        // const objects = JSON.parse(this.responseText);
        // console.log("New Obj : ",objects)
        // Swal.fire(objects['message']);
        // console.log(objects['message']);
        Swal.fire(this.responseText);
        loadTable();
      }
    };
  }


  function userDelete(id) {
    console.log("Inside Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:7000/deletePostsbyID/"+ id);
    xhttp.send();
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // // xhttp.send(JSON.stringify({
    // //   "id": id
    // // }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        //const objects = JSON.parse(this.responseText);
        // Swal.fire(objects['message']);
        Swal.fire(this.responseText);
        loadTable();
      }
    };
  }
