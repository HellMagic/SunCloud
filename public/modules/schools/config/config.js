'use strict';

// Configuring the Articles module
angular.module('schools').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', '所有学校管理', 'schools','item','/schools','schoolsNav',false,['root'],0);
        //Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
        //Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);
