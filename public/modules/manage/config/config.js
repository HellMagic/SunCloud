'use strict';

// Configuring the Articles module
angular.module('manage').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', '设备管理', 'manage','item','/manage','deviceManage',false,['root','admin','teacher'],4);
       // Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
        //Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);
