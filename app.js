function getIncidents(){
    var firebaseRef = firebase.database().ref("incidents");
    console.log(firebaseRef);
}
function getIncidents2(){
    var starCountRef = firebase.database().ref('incidents');
    console.log(starCountRef.on('',(ss)=>{console.log("00")}));
    starCountRef.on('value', (snapshot) =>{
        console.log(snapshot);
        const data = snapshot.val();
        console.log(data);
    });
}