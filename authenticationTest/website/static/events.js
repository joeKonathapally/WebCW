
function loadTable() {
    console.log("Inside Events");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:6050/getEvents");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
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
                trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['EventTitle']).slice(1,-1)+'</td>';
                trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['Message']).slice(1,-1)+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+name+'</td>';
                trHTML += '<td  style="font-size: 15px;">'+JSON.stringify(object_new['CreatedAt']).slice(1,-1)+'</td>';
                if(JSON.stringify(object_new["CreatedByID"]) == userid){
                  trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete('+JSON.stringify(object_new['EventID'])+')"><i class="bi bi-trash3"></i></button></td>';
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
    if(payload.NotificationType=="Event"){
      loadTable();
    }
  });

  function showUserCreateBox() {
    Swal.fire({
      title: 'Create Event',
      html:
        '<input id="id" type="hidden">' +
        '<input id="cr_Title" class="swal2-input" placeholder="Title of Event">' +
        '<input id="cr_event" class="swal2-input" placeholder="Event Message">' ,
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }

  function userCreate() {
    const title = document.getElementById("cr_Title").value;
    const post = document.getElementById("cr_event").value;
    var createdby = userid

    const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:7000/createPosts");
    xhttp.open("POST", "/events");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // console.log("post " + post)
    xhttp.send(JSON.stringify({
      "EventTitle":title, "Message": post, "CreatedBy": createdby
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
    xhttp.open("GET", "http://localhost:6050/deleteEventsbyID/"+ id);
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
