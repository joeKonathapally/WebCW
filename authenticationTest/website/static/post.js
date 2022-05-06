
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:7000/getPosts");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = '';
        const objects = JSON.parse(this.responseText);
        for(var i=Object.keys(objects).length;i>0;i--){
          const object_new = objects[i-1];
          const xtp = new XMLHttpRequest();
          xtp.open("POST", "http://localhost:2000/getUsername");
          xtp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xtp.send(JSON.stringify({
            "UserID": objects[i-1]['CreatedByID']
          }));
          xtp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                name = obj['UserName'];
                trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['Message']).slice(1,-1)+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+name+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+JSON.stringify(object_new['CreatedAt']).slice(1,-1)+'</td>';
                if(JSON.stringify(object_new["CreatedByID"]) == userid){
                  trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete('+JSON.stringify(object_new['PostID'])+')"><i class="bi bi-trash3"></i></button></td>';
                }
                else {
                  trHTML += '<td><button type="button" class="btn btn-outline-danger" hidden><i class="bi bi-trash3"></i></button></td>';
                }

                trHTML += "</tr>";
                document.getElementById("mytable").innerHTML = trHTML;
              }
          };
        }
      }
    };
  }

  loadTable();

<<<<<<< HEAD
  const sockets = io("http://localhost:3000");

  sockets.on("connect", () => {
    console.log('connected');
    sockets.emit("whoami", {UserID:2});
  });

  sockets.on("notification", (payload) => {
    if(payload.NotificationType=="Post"){
      loadTable();
    }
  });
=======

>>>>>>> master

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
    // console.log("post " + post)
    xhttp.send(JSON.stringify({
      "Message": post, "CreatedBy": createdby
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(this.responseText);
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
    // console.log("Inside Delete: ", id);
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
