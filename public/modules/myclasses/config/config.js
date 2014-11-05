'use strict';

// Configuring the Articles module
angular.module('myClasses').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', '我的班级', 'myclasses','item','/myclasses','ClassesView',false,['teacher','root','admin'],2);
        //Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
        //Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);
