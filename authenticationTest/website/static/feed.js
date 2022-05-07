
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8000/getFeed");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = '';
        var trHTML2 = '';
        json_data = this.responseText;
        // console.log(JSON.parse(json_data)["Feed"]);
       const objects = JSON.parse(json_data)["Feed"];
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
                if(JSON.stringify(object_new['ObjectType']).slice(1,-1) == "event" )
                {
                  trHTML2 += '<td style="font-size: 15px;">'+JSON.stringify(object_new['EventTitle']).slice(1,-1)+'</td>';
                  trHTML2 += '<td style="font-size: 17px;">'+JSON.stringify(object_new['Message']).slice(1,-1)+'</td>';
                  trHTML2 += '<td  style="font-size: 15px;">'+name+'</td>';
                  // trHTML2 += '<td  style="font-size: 15px;">'+JSON.stringify(object_new['CreatedAt']).slice(1,-1)+'</td>';
                }
                else {
                  trHTML += '<td style="font-size: 20px;">'+JSON.stringify(object_new['Message']).slice(1,-1)+'</td>';
                  // trHTML += '<td  style="font-size: 15px;">'+''+'</td>';
                  trHTML += '<td  style="font-size: 15px;">'+name+'</td>';
                  // trHTML += '<td  style="font-size: 15px;">'+JSON.stringify(object_new['CreatedAt']).slice(1,-1)+'</td>';
                }
                trHTML += "</tr>";
                trHTML2 += "</tr>";
                document.getElementById("mytable").innerHTML = trHTML;
                document.getElementById("mytable2").innerHTML = trHTML2;
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
    if(payload.NotificationType=="Feed"){
      loadTable();
    }
  });
