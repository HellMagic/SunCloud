/**
 * Make dummy data
 */

//Room.createRoom({name:"三年一班", school: ObjectId("544f38ac2ac5e12132cf3951"),
//    students:[ObjectId("544f3aa4d30870e64d28f612"),ObjectId("544f3acbd30870e64d28f613"),ObjectId("544773ae77424975f037e4d2")],
//    teachers:[{subject: 'Math', teacher:ObjectId("54474447836e18267d5146b3")},{subject: 'English', teacher:ObjectId("5447512577424975f037e4d1")}]
//});


var User = mongoose.model('User');
var Room = mongoose.model('Room');

User.findOne({username: 'Jiang'},function(err, user1){
    if(err) console.error(err);
    User.findOne({username: 'Xiao'}, function(err, user2){
        if(err) console.error(err);
        User.findOne({username:"user"},function(err, user3){
            if(err) console.error(err);
            Room.createRoom({name: "Class2", students: [user1, user2], teachers:[{subject: 'English', teacher: user3}]})

        })
    })

});
