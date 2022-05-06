
function loadTable() {
<<<<<<< Updated upstream
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:7000/getPosts");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
=======
    console.log("Inside Events");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:6000/getEvents");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
                trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['EventTitle']).slice(1,-1)+'</td>';
>>>>>>> Stashed changes
                trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['Message']).slice(1,-1)+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+name+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+JSON.stringify(object_new['CreatedAt']).slice(1,-1)+'</td>';
                if(JSON.stringify(object_new["CreatedByID"]) == userid){
<<<<<<< Updated upstream
                  trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete('+JSON.stringify(object_new['PostID'])+')"><i class="bi bi-trash3"></i></button></td>';
=======
                  trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete('+JSON.stringify(object_new['EventID'])+')"><i class="bi bi-trash3"></i></button></td>';
>>>>>>> Stashed changes
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

  function showUserCreateBox() {
    Swal.fire({
<<<<<<< Updated upstream
      title: 'Create Post',
      html:
        '<input id="id" type="hidden">' +
        '<input id="cr_post" class="swal2-input" placeholder="Post Message">' ,
=======
      title: 'Create Event',
      html:
        '<input id="id" type="hidden">' +
        '<input id="cr_Title" class="swal2-input" placeholder="Title of Event">' +
        '<input id="cr_event" class="swal2-input" placeholder="Event Message">' ,
>>>>>>> Stashed changes
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }

  function userCreate() {
<<<<<<< Updated upstream
=======
    const title = document.getElementById("cr_Title").value;
>>>>>>> Stashed changes
    const post = document.getElementById("cr_post").value;
    var createdby = userid

    const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:7000/createPosts");
<<<<<<< Updated upstream
    xhttp.open("POST", "/posts");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // console.log("post " + post)
    xhttp.send(JSON.stringify({
      "Message": post, "CreatedBy": createdby
=======
    xhttp.open("POST", "/events");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // console.log("post " + post)
    xhttp.send(JSON.stringify({
      "EventTitle":title, "Message": post, "CreatedBy": createdby
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    xhttp.open("GET", "http://localhost:7000/deletePostsbyID/"+ id);
=======
    xhttp.open("GET", "http://localhost:6000/deleteEventsbyID/"+ id);
>>>>>>> Stashed changes
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
