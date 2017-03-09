define([], function () {
    'use strict';

    var menu = document.querySelector('.context-menu');
    var menuState = 0;
    var clickedTask;

    function contextListener() {
        document.addEventListener('contextmenu', function (e) {
            clickedTask = clickInsideElement(e, 'task');
            if (clickedTask) {
                e.preventDefault();
                toggleMenuOn();
                positionMenu(e);
            } else {
                clickedTask = null;
                toggleMenuOff();
            }
        });
    }

    function clickListener() {
        document.addEventListener('click', function (e) {
            var clickedLink = clickInsideElement(e, 'context-menu-link');

            if (clickedLink) {
                e.preventDefault();
                menuItemListener(clickedLink);
            } else {
                var button = e.which || e.button;
                if (button === 1) {
                    toggleMenuOff();
                }
            }
        });
    }

    function keyupListener() {
        window.onkeyup = function (e) {
            if (e.keyCode === 27) {
                toggleMenuOff();
            }
        }
    }

    function resizeListener() {
        window.onresize = function (e) {
            toggleMenuOff();
        };
    }

    function clickInsideElement(e, className) {
        var element = e.srcElement || e.target;

        if (element.classList.contains(className)) {
            return element;
        } else {
            while (element = element.parentNode) {
                if (element.classList && element.classList.contains(className)) {
                    return element;
                }
            }
        }

        return false;
    }

    function toggleMenuOn() {
        if (menuState !== 1) {
            menuState = 1;
            menu.classList.add('context-menu-active');
        }
    }

    function toggleMenuOff() {
        if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove('context-menu-active');
        }
    }

    function positionMenu(e) {
        var clickCoords = getPosition(e);
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;

        var menuWidth = menu.offsetWidth + 20;
        var menuHeight = menu.offsetHeight + 20;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + 'px';
        } else {
            menu.style.left = clickCoordsX + 'px';
        }

        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + 'px';
        } else {
            menu.style.top = clickCoordsY + 'px';
        }
    }

    function getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + 
            document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + 
            document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    function menuItemListener(link) {
        var dataId = clickedTask.getAttribute('data-id');
        var dataAction = link.getAttribute('data-action');
        console.log('Task ID = ' + dataId + ', Task action = ' + dataAction);
        toggleMenuOff();
    }

    return {
        init: function () {
            contextListener();
            clickListener();
            keyupListener();
            resizeListener();
        }
    }
});
